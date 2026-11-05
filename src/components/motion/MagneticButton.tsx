import { useRef, useCallback, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button';
  strength?: number;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className = '',
  as: Tag = 'button',
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [reduced, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 400);
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      className={`magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
