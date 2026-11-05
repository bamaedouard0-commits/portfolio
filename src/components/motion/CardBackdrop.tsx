import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Ctx = CanvasRenderingContext2D;
type Painter = (ctx: Ctx, w: number, h: number, t: number) => void;

const GOLD = '212,168,67';
const BLUE = '111,143,192';

const rgba = (c: string, a: number) => `rgba(${c},${a})`;
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------- Painters : un par domaine ---------- */

// Developpement web : pluie de code
function makeWeb(): Painter {
  const glyphs = ['<', '/>', '{', '}', '()', '=>', ';', '</', '[]', '&&'];
  return (ctx, w, h, t) => {
    ctx.font = '12px "Geist Mono Variable", monospace';
    const colW = 22;
    const cols = Math.ceil(w / colW);
    for (let c = 0; c < cols; c++) {
      const speed = 18 + rand(c + 1) * 34;
      const off = rand(c + 50) * h;
      const head = (t * speed + off) % (h + 160);
      for (let k = 0; k < 7; k++) {
        const y = head - k * 16;
        if (y < -10 || y > h + 10) continue;
        const g = glyphs[Math.floor(rand(c * 7 + k + Math.floor(t * 0.6)) * glyphs.length)];
        ctx.fillStyle = rgba(k === 0 ? GOLD : BLUE, (1 - k / 7) * 0.9);
        ctx.fillText(g, c * colW, y);
      }
    }
  };
}

// Logiciel et architecture : couches isometriques
function makeSoftware(): Painter {
  return (ctx, w, h, t) => {
    const cx = w * 0.74;
    const cy = h * 0.5;
    const sw = Math.min(w, h) * 0.42;
    const sh = sw * 0.5;
    for (let i = 0; i < 4; i++) {
      const y = cy + (i - 1.5) * 26 + Math.sin(t * 1.2 + i * 0.9) * 6;
      ctx.beginPath();
      ctx.moveTo(cx - sw, y);
      ctx.lineTo(cx, y - sh);
      ctx.lineTo(cx + sw, y);
      ctx.lineTo(cx, y + sh);
      ctx.closePath();
      ctx.fillStyle = rgba(i % 2 ? BLUE : GOLD, 0.08);
      ctx.fill();
      ctx.strokeStyle = rgba(i % 2 ? BLUE : GOLD, 0.7);
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  };
}

// Bases de donnees : disques empiles qui s'allument
function makeDatabase(): Painter {
  return (ctx, w, h, t) => {
    const cx = w * 0.76;
    const rx = Math.min(w, h) * 0.3;
    const ry = rx * 0.3;
    const active = Math.floor(t * 1.4) % 4;
    for (let i = 0; i < 4; i++) {
      const y = h * 0.28 + i * (h * 0.15);
      const on = i === active;
      ctx.beginPath();
      ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = rgba(GOLD, on ? 0.3 : 0.06);
      ctx.fill();
      ctx.strokeStyle = rgba(on ? GOLD : BLUE, on ? 0.95 : 0.6);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // bord lateral
      ctx.beginPath();
      ctx.moveTo(cx - rx, y);
      ctx.lineTo(cx - rx, y + h * 0.15 - 4);
      ctx.moveTo(cx + rx, y);
      ctx.lineTo(cx + rx, y + h * 0.15 - 4);
      ctx.strokeStyle = rgba(BLUE, 0.35);
      ctx.stroke();
    }
  };
}

// Reseaux et telecoms : noeuds relies, paquets en transit
function makeNetwork(): Painter {
  const n = 13;
  return (ctx, w, h, t) => {
    const pts = Array.from({ length: n }, (_, i) => ({
      x: w * (0.3 + 0.7 * rand(i + 3)) + Math.sin(t * 0.5 + i) * 14,
      y: h * rand(i + 40) + Math.cos(t * 0.4 + i * 1.7) * 14,
    }));
    let li = 0;
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        const d = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
        if (d > 130) continue;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.strokeStyle = rgba(BLUE, 0.35);
        ctx.lineWidth = 1;
        ctx.stroke();
        const f = (t * 0.5 + li * 0.37) % 1;
        ctx.beginPath();
        ctx.arc(pts[a].x + (pts[b].x - pts[a].x) * f, pts[a].y + (pts[b].y - pts[a].y) * f, 2.2, 0, 7);
        ctx.fillStyle = rgba(GOLD, 0.95);
        ctx.fill();
        li++;
      }
    }
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, 7);
      ctx.fillStyle = rgba(BLUE, 0.9);
      ctx.fill();
    });
  };
}

// Systemes : baie de serveurs avec LEDs
function makeSystem(): Painter {
  return (ctx, w, h, t) => {
    const rw = Math.min(w * 0.5, 190);
    const x0 = w - rw - 20;
    const rows = 6;
    const rh = Math.min((h - 40) / rows, 30);
    for (let r = 0; r < rows; r++) {
      const y = 20 + r * (rh + 4);
      ctx.strokeStyle = rgba(BLUE, 0.6);
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x0, y, rw, rh);
      ctx.fillStyle = rgba(BLUE, 0.07);
      ctx.fillRect(x0, y, rw, rh);
      for (let l = 0; l < 5; l++) {
        const on = Math.sin(t * (1.5 + rand(r * 5 + l) * 2) + r * 3.1 + l * 1.3) > 0.35;
        ctx.beginPath();
        ctx.arc(x0 + 12 + l * 12, y + rh / 2, 2.6, 0, 7);
        ctx.fillStyle = on ? rgba(GOLD, 1) : rgba(BLUE, 0.3);
        ctx.fill();
      }
      ctx.fillStyle = rgba(BLUE, 0.4);
      ctx.fillRect(x0 + rw - 60, y + rh / 2 - 1.5, 48, 3);
    }
  };
}

// Cybersecurite : radar
function makeSecurity(): Painter {
  return (ctx, w, h, t) => {
    const cx = w * 0.76;
    const cy = h * 0.5;
    const R = Math.min(h * 0.46, w * 0.34);
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * i) / 3, 0, 7);
      ctx.strokeStyle = rgba(BLUE, 0.4);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R);
    ctx.lineTo(cx, cy + R);
    ctx.stroke();
    const ang = (t * 1.4) % (Math.PI * 2);
    for (let k = 0; k < 26; k++) {
      const a = ang - k * 0.035;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.strokeStyle = rgba(GOLD, (1 - k / 26) * 0.5);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    for (let b = 0; b < 4; b++) {
      const ba = rand(b + 9) * Math.PI * 2;
      const br = R * (0.3 + rand(b + 20) * 0.65);
      let diff = (ang - ba) % (Math.PI * 2);
      if (diff < 0) diff += Math.PI * 2;
      const a = Math.max(0, 1 - diff / 3);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(ba) * br, cy + Math.sin(ba) * br, 3.5, 0, 7);
      ctx.fillStyle = rgba(GOLD, a);
      ctx.fill();
    }
  };
}

// IA : reseau de neurones
function makeAi(): Painter {
  const layers = [3, 5, 5, 3];
  return (ctx, w, h, t) => {
    const x0 = w * 0.38;
    const span = w * 0.58;
    const pos = layers.map((count, li) =>
      Array.from({ length: count }, (_, i) => ({
        x: x0 + (span * li) / (layers.length - 1),
        y: h * 0.14 + ((h * 0.72) * (i + 0.5)) / count,
      }))
    );
    for (let l = 0; l < pos.length - 1; l++) {
      pos[l].forEach((a) =>
        pos[l + 1].forEach((b) => {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(BLUE, 0.22);
          ctx.lineWidth = 1;
          ctx.stroke();
        })
      );
    }
    pos.forEach((layer, l) =>
      layer.forEach((p, i) => {
        const pulse = Math.max(0, Math.sin(t * 2.2 - l * 1.1 + i * 0.7));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + pulse * 2.5, 0, 7);
        ctx.fillStyle = rgba(pulse > 0.5 ? GOLD : BLUE, 0.4 + pulse * 0.6);
        ctx.fill();
      })
    );
  };
}

// 3D et motion : cube filaire qui tourne
function makeThreeD(): Painter {
  const v = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ];
  const e = [
    [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  return (ctx, w, h, t) => {
    const cx = w * 0.76;
    const cy = h * 0.5;
    const s = Math.min(h, w) * 0.24;
    const ay = t * 0.7;
    const ax = t * 0.45;
    const pr = v.map(([x, y, z]) => {
      const x1 = x * Math.cos(ay) + z * Math.sin(ay);
      const z1 = -x * Math.sin(ay) + z * Math.cos(ay);
      const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
      const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
      const k = 3.2 / (3.2 + z2);
      return { x: cx + x1 * s * k, y: cy + y1 * s * k };
    });
    ctx.strokeStyle = rgba(GOLD, 0.85);
    ctx.lineWidth = 1.4;
    e.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(pr[a].x, pr[a].y);
      ctx.lineTo(pr[b].x, pr[b].y);
      ctx.stroke();
    });
    pr.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, 7);
      ctx.fillStyle = rgba(BLUE, 1);
      ctx.fill();
    });
  };
}

const factories: Record<string, () => Painter> = {
  web: makeWeb,
  software: makeSoftware,
  database: makeDatabase,
  network: makeNetwork,
  system: makeSystem,
  security: makeSecurity,
  ai: makeAi,
  '3d': makeThreeD,
};

/* ---------- Composant ---------- */

export function CardBackdrop({ kind }: { kind: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const make = factories[kind];
    if (!canvas || !make) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paint = make();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };

    const frame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      paint(ctx, w, h, reduced ? 2 : (now - t0) / 1000);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(performance.now());
    });
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    if (reduced) frame(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [kind, reduced]);

  return <canvas ref={ref} className="card-backdrop" aria-hidden="true" />;
}
