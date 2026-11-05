import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MarqueeProps {
  text: string;
  repeat?: number;
  separator?: string;
  className?: string;
}

export function Marquee({
  text,
  repeat = 6,
  separator = '  —  ',
  className = '',
}: MarqueeProps) {
  const reduced = useReducedMotion();

  const content = Array.from({ length: repeat }, () => text).join(separator);

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className={`marquee__track ${reduced ? '' : 'marquee__track--animate'}`}>
        <span className="marquee__text">{content}{separator}</span>
        <span className="marquee__text">{content}{separator}</span>
      </div>
    </div>
  );
}
