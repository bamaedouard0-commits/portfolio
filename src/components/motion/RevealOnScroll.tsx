import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
}

export function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 60,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = { opacity: 1, duration, delay, ease: 'power3.out' };

    switch (direction) {
      case 'up':
        from.y = distance;
        to.y = 0;
        break;
      case 'left':
        from.x = distance;
        to.x = 0;
        break;
      case 'right':
        from.x = -distance;
        to.x = 0;
        break;
      case 'scale':
        from.scale = 0.85;
        to.scale = 1;
        break;
    }

    gsap.set(el, from);

    const tween = gsap.to(el, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [reduced, direction, delay, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
