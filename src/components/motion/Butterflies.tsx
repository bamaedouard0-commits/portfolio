import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  heading: number;
  turn: number;
  phase: number;
  size: number;
  tone: number;
}

function drawWing(ctx: CanvasRenderingContext2D, side: 1 | -1, flap: number, s: number, tone: number) {
  ctx.save();
  ctx.scale(side * flap, 1);
  // aile haute
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.1);
  ctx.bezierCurveTo(s * 0.5, -s * 1.2, s * 1.3, -s * 1.0, s * 1.05, -s * 0.2);
  ctx.bezierCurveTo(s * 0.9, s * 0.1, s * 0.4, s * 0.1, 0, 0);
  ctx.fillStyle = `hsla(${tone}, 70%, 58%, 0.85)`;
  ctx.fill();
  ctx.strokeStyle = 'rgba(12,18,34,0.55)';
  ctx.lineWidth = 1;
  ctx.stroke();
  // aile basse
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s * 0.7, s * 0.05, s * 0.9, s * 0.8, s * 0.35, s * 0.85);
  ctx.bezierCurveTo(s * 0.1, s * 0.8, 0, s * 0.4, 0, 0);
  ctx.fillStyle = `hsla(${tone}, 75%, 48%, 0.85)`;
  ctx.fill();
  ctx.stroke();
  // tache
  ctx.beginPath();
  ctx.arc(s * 0.62, -s * 0.42, s * 0.12, 0, 7);
  ctx.fillStyle = 'rgba(12,18,34,0.55)';
  ctx.fill();
  ctx.restore();
}

export function Butterflies() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 3 : 6;
    const tones = [42, 38, 205, 48, 32, 215];
    const flock: Butterfly[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      heading: Math.random() * Math.PI * 2,
      turn: 0,
      phase: Math.random() * 10,
      size: 9 + Math.random() * 7,
      tone: tones[i % tones.length],
    }));

    let lastY = window.scrollY;
    let boost = 0;
    let push = 0;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      boost = Math.min(boost + Math.abs(dy) * 0.04, 6);
      push = Math.max(-1500, Math.min(1500, push + dy * 4));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      boost *= Math.pow(0.1, dt);
      push *= Math.pow(0.05, dt);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const b of flock) {
        // trajectoire sinueuse : le cap change doucement et au hasard
        b.turn += (Math.random() - 0.5) * 6 * dt;
        b.turn *= Math.pow(0.4, dt);
        b.heading += b.turn * dt * 3;
        const speed = 45 + boost * 55;
        b.vx = Math.cos(b.heading) * speed;
        b.vy = Math.sin(b.heading) * speed - push * 0.05;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // ils reviennent par l'autre bord
        const m = 60;
        if (b.x < -m) b.x = w + m;
        if (b.x > w + m) b.x = -m;
        if (b.y < -m) b.y = h + m;
        if (b.y > h + m) b.y = -m;

        const flapRate = 9 + boost * 2.2;
        const flap = 0.2 + 0.8 * Math.abs(Math.sin(now / 1000 * flapRate + b.phase));
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 6;
        drawWing(ctx, 1, flap, b.size, b.tone);
        drawWing(ctx, -1, flap, b.size, b.tone);
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(0, b.size * 0.1, b.size * 0.09, b.size * 0.55, 0, 0, 7);
        ctx.fillStyle = '#0c1222';
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={ref} className="butterflies" aria-hidden="true" />;
}
