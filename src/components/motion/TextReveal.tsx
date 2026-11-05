import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  triggerStart?: string;
}

export function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  splitBy = 'words',
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  y = 60,
  triggerStart = 'top 85%',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const el = containerRef.current;
    const text = children;

    // Split text into spans
    let units: string[];
    if (splitBy === 'chars') {
      units = text.split('');
    } else if (splitBy === 'words') {
      units = text.split(' ');
    } else {
      units = [text];
    }

    el.innerHTML = '';
    const wrapperDiv = document.createElement('span');
    wrapperDiv.style.display = 'inline';

    units.forEach((unit, i) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = unit;
      inner.className = 'text-reveal__unit';

      wrapper.appendChild(inner);
      wrapperDiv.appendChild(wrapper);

      if (splitBy === 'words' && i < units.length - 1) {
        const space = document.createTextNode(' ');
        wrapperDiv.appendChild(space);
      }
    });

    el.appendChild(wrapperDiv);

    const targets = el.querySelectorAll('.text-reveal__unit');

    gsap.set(targets, { y, opacity: 0, rotateX: splitBy === 'chars' ? 40 : 0 });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [reduced, children, splitBy, stagger, duration, delay, y, triggerStart]);

  return (
    <Tag ref={containerRef as never} className={className}>
      {children}
    </Tag>
  );
}
