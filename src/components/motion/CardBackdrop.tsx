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

/* ---------- Painters des services ---------- */

// Applications web : fenetre de navigateur qui se construit
function makeSvcWeb(): Painter {
  return (ctx, w, h, t) => {
    const bw = Math.min(w * 0.52, 230);
    const bh = Math.min(h * 0.72, 150);
    const x = w - bw - 22;
    const y = (h - bh) / 2;
    ctx.strokeStyle = rgba(BLUE, 0.7);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x, y, bw, bh);
    ctx.beginPath();
    ctx.moveTo(x, y + 16);
    ctx.lineTo(x + bw, y + 16);
    ctx.stroke();
    [0, 1, 2].forEach((i) => {
      ctx.beginPath();
      ctx.arc(x + 9 + i * 10, y + 8, 2.4, 0, 7);
      ctx.fillStyle = rgba(i === 0 ? GOLD : BLUE, 0.9);
      ctx.fill();
    });
    const blocks = [
      [8, 26, bw - 16, 18], [8, 52, (bw - 24) / 2, bh - 66], [16 + (bw - 24) / 2, 52, (bw - 24) / 2, 22], [16 + (bw - 24) / 2, 82, (bw - 24) / 2, bh - 96],
    ];
    const cycle = (t * 0.6) % (blocks.length + 2);
    blocks.forEach(([bx, by, bw2, bh2], i) => {
      const a = Math.max(0, Math.min(1, cycle - i));
      if (a <= 0) return;
      ctx.fillStyle = rgba(i % 2 ? BLUE : GOLD, 0.18 * a);
      ctx.fillRect(x + bx, y + by, bw2, bh2);
      ctx.strokeStyle = rgba(i % 2 ? BLUE : GOLD, 0.7 * a);
      ctx.strokeRect(x + bx, y + by, bw2, bh2);
    });
    // curseur
    const cx = x + 20 + ((Math.sin(t * 0.8) + 1) / 2) * (bw - 50);
    const cy = y + 24 + ((Math.cos(t * 0.6) + 1) / 2) * (bh - 40);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 9, cy + 4);
    ctx.lineTo(cx + 4, cy + 9);
    ctx.closePath();
    ctx.fillStyle = rgba(GOLD, 1);
    ctx.fill();
  };
}

// Logiciels de gestion : tableau de bord qui respire
function makeSvcManagement(): Painter {
  return (ctx, w, h, t) => {
    const bars = 7;
    const x0 = w * 0.42;
    const span = w - x0 - 22;
    const base = h - 24;
    const maxH = h * 0.6;
    const pts: [number, number][] = [];
    for (let i = 0; i < bars; i++) {
      const bw = span / bars - 6;
      const v = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.7 + i * 0.9 + rand(i) * 3));
      const bh = maxH * v;
      const x = x0 + i * (span / bars);
      ctx.fillStyle = rgba(i === bars - 1 ? GOLD : BLUE, i === bars - 1 ? 0.55 : 0.3);
      ctx.fillRect(x, base - bh, bw, bh);
      ctx.strokeStyle = rgba(i === bars - 1 ? GOLD : BLUE, 0.85);
      ctx.strokeRect(x, base - bh, bw, bh);
      pts.push([x + bw / 2, base - bh - 8 - Math.sin(t + i) * 6]);
    }
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.strokeStyle = rgba(GOLD, 0.95);
    ctx.lineWidth = 1.6;
    ctx.stroke();
    pts.forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, 7);
      ctx.fillStyle = rgba(GOLD, 1);
      ctx.fill();
    });
  };
}

// Reseaux : ondes qui rayonnent depuis une antenne
function makeSvcNetwork(): Painter {
  return (ctx, w, h, t) => {
    const cx = w * 0.78;
    const cy = h * 0.62;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - h * 0.32);
    ctx.strokeStyle = rgba(BLUE, 0.9);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy - h * 0.32, 4, 0, 7);
    ctx.fillStyle = rgba(GOLD, 1);
    ctx.fill();
    for (let k = 0; k < 4; k++) {
      const p = ((t * 0.5 + k / 4) % 1);
      const r = 10 + p * Math.min(w, h) * 0.55;
      ctx.beginPath();
      ctx.arc(cx, cy - h * 0.32, r, -Math.PI * 0.85, -Math.PI * 0.15);
      ctx.strokeStyle = rgba(GOLD, (1 - p) * 0.8);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - h * 0.32, r, Math.PI * 0.15, Math.PI * 0.85);
      ctx.strokeStyle = rgba(BLUE, (1 - p) * 0.6);
      ctx.stroke();
    }
  };
}

// Securite : bouclier balaye par un scanner
function makeSvcSecurity(): Painter {
  return (ctx, w, h, t) => {
    const cx = w * 0.78;
    const cy = h * 0.5;
    const s = Math.min(h * 0.4, w * 0.2);
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.bezierCurveTo(cx + s * 0.9, cy - s * 0.85, cx + s * 0.95, cy - s * 0.3, cx + s * 0.85, cy + s * 0.15);
      ctx.bezierCurveTo(cx + s * 0.7, cy + s * 0.7, cx + s * 0.25, cy + s * 0.9, cx, cy + s * 1.05);
      ctx.bezierCurveTo(cx - s * 0.25, cy + s * 0.9, cx - s * 0.7, cy + s * 0.7, cx - s * 0.85, cy + s * 0.15);
      ctx.bezierCurveTo(cx - s * 0.95, cy - s * 0.3, cx - s * 0.9, cy - s * 0.85, cx, cy - s);
      ctx.closePath();
    };
    path();
    ctx.fillStyle = rgba(BLUE, 0.1);
    ctx.fill();
    ctx.strokeStyle = rgba(BLUE, 0.9);
    ctx.lineWidth = 1.6;
    ctx.stroke();
    // ligne de scan clippee dans le bouclier
    ctx.save();
    path();
    ctx.clip();
    const sy = cy - s + ((t * 0.6) % 1) * (s * 2.1);
    const g = ctx.createLinearGradient(0, sy - 18, 0, sy + 2);
    g.addColorStop(0, rgba(GOLD, 0));
    g.addColorStop(1, rgba(GOLD, 0.55));
    ctx.fillStyle = g;
    ctx.fillRect(cx - s, sy - 18, s * 2, 20);
    ctx.fillStyle = rgba(GOLD, 0.95);
    ctx.fillRect(cx - s, sy, s * 2, 1.6);
    ctx.restore();
    // coche
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.32, cy + s * 0.02);
    ctx.lineTo(cx - s * 0.07, cy + s * 0.28);
    ctx.lineTo(cx + s * 0.36, cy - s * 0.22);
    ctx.strokeStyle = rgba(GOLD, 0.5 + 0.5 * Math.abs(Math.sin(t * 1.5)));
    ctx.lineWidth = 3;
    ctx.stroke();
  };
}

// Bases de donnees : table dont les lignes s'allument
function makeSvcDatabase(): Painter {
  return (ctx, w, h, t) => {
    const cols = 4;
    const rows = 6;
    const tw = Math.min(w * 0.55, 240);
    const x0 = w - tw - 22;
    const rh = Math.min((h - 40) / rows, 26);
    const y0 = (h - rh * rows) / 2;
    const active = Math.floor(t * 1.6) % rows;
    for (let r = 0; r < rows; r++) {
      const on = r === active;
      ctx.fillStyle = rgba(on ? GOLD : BLUE, on ? 0.28 : r === 0 ? 0.18 : 0.06);
      ctx.fillRect(x0, y0 + r * rh, tw, rh - 2);
      for (let c = 0; c < cols; c++) {
        const cw = tw / cols;
        ctx.fillStyle = rgba(on ? GOLD : BLUE, on ? 0.95 : 0.55);
        ctx.fillRect(x0 + c * cw + 6, y0 + r * rh + rh / 2 - 2, cw * (0.35 + rand(r * 4 + c) * 0.4), 3);
      }
    }
    ctx.strokeStyle = rgba(BLUE, 0.7);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x0, y0, tw, rh * rows - 2);
  };
}

// Maintenance : deux engrenages qui s'entrainent
function makeSvcMaintenance(): Painter {
  const gear = (ctx: Ctx, cx: number, cy: number, r: number, teeth: number, rot: number, col: string) => {
    ctx.beginPath();
    for (let i = 0; i < teeth * 2; i++) {
      const a = rot + (i * Math.PI) / teeth;
      const rr = i % 2 ? r : r * 1.18;
      const a2 = a + Math.PI / teeth / 2;
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      ctx.lineTo(cx + Math.cos(a2) * rr, cy + Math.sin(a2) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = rgba(col, 0.12);
    ctx.fill();
    ctx.strokeStyle = rgba(col, 0.9);
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.35, 0, 7);
    ctx.stroke();
  };
  return (ctx, w, h, t) => {
    const r1 = Math.min(h * 0.26, 44);
    const r2 = r1 * 0.7;
    const cx1 = w * 0.68;
    const cy1 = h * 0.45;
    const cx2 = cx1 + (r1 + r2) * 1.12;
    const cy2 = cy1 + r1 * 0.55;
    gear(ctx, cx1, cy1, r1, 10, t * 0.5, GOLD);
    gear(ctx, cx2, cy2, r2, 7, -t * 0.5 * (10 / 7) + 0.25, BLUE);
  };
}

// Formation : marches qui montent, un point les gravit
function makeSvcTraining(): Painter {
  return (ctx, w, h, t) => {
    const steps = 5;
    const x0 = w * 0.46;
    const sw = (w - x0 - 22) / steps;
    const base = h - 24;
    const tops: [number, number][] = [];
    for (let i = 0; i < steps; i++) {
      const sh = (h * 0.55 * (i + 1)) / steps;
      ctx.fillStyle = rgba(BLUE, 0.12 + i * 0.03);
      ctx.fillRect(x0 + i * sw, base - sh, sw - 4, sh);
      ctx.strokeStyle = rgba(BLUE, 0.8);
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x0 + i * sw, base - sh, sw - 4, sh);
      tops.push([x0 + i * sw + (sw - 4) / 2, base - sh - 7]);
    }
    const p = (t * 0.45) % (steps - 0.01);
    const i = Math.floor(p);
    const f = p - i;
    const a = tops[i];
    const b = tops[Math.min(i + 1, steps - 1)];
    const px = a[0] + (b[0] - a[0]) * f;
    const py = a[1] + (b[1] - a[1]) * f - Math.sin(f * Math.PI) * 14;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, 7);
    ctx.fillStyle = rgba(GOLD, 1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py, 9 + Math.sin(t * 4) * 1.5, 0, 7);
    ctx.strokeStyle = rgba(GOLD, 0.4);
    ctx.stroke();
  };
}

const factories: Record<string, () => Painter> = {
  'svc-web-apps': makeSvcWeb,
  'svc-management-software': makeSvcManagement,
  'svc-network': makeSvcNetwork,
  'svc-security': makeSvcSecurity,
  'svc-database': makeSvcDatabase,
  'svc-maintenance': makeSvcMaintenance,
  'svc-training': makeSvcTraining,
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
