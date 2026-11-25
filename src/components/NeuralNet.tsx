import { useEffect, useRef, type RefObject } from "react";

interface Neuron {
  bx: number;
  by: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  ph: number;
  act: number;
  hover: number;
  fired: number;
  out: Edge[];
  inn: Edge[];
}

interface Edge {
  a: Neuron;
  b: Neuron;
  w: number;
  heat: number;
}

interface Pulse {
  e: Edge;
  t: number;
  wave: number;
  warm: boolean;
}

const REACH = 170; // cursor influence radius (px)
const WAVE_MS = 1800; // time between forward passes
const SPEED = 160; // pulse speed (px/s)
const MAX_PULSES = 90;

/**
 * Decorative feed-forward network drawn behind the hero: drifting neurons,
 * signal pulses travelling layer to layer, and a gentle pull toward the cursor.
 * The canvas spans from the top of the page to just below `anchor`.
 */
export default function NeuralNet({ anchor }: { anchor: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let layers: Neuron[][] = [];
    let nodes: Neuron[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let rgb = "59, 91, 219";
    let rgb2 = "240, 140, 0";
    let bg = "#f6f7fa";
    const pointer = { x: -1e4, y: -1e4, on: false };
    const mouse = { x: -1e4, y: -1e4 };
    let raf = 0;
    let last = 0;
    let lastWave = 0;
    let wave = 0;
    let onScreen = true;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb = cs.getPropertyValue("--net-rgb").trim() || rgb;
      rgb2 = cs.getPropertyValue("--net-rgb-2").trim() || rgb2;
      bg = cs.getPropertyValue("--bg").trim() || bg;
    };

    const link = (a: Neuron, b: Neuron) => {
      const e: Edge = { a, b, w: Math.random() * 2 - 1, heat: 0 };
      edges.push(e);
      a.out.push(e);
      b.inn.push(e);
    };

    const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

    const place = (t: number) => {
      for (const n of nodes) {
        const wx = n.bx + Math.sin(t * 0.00035 + n.ph) * 12;
        const wy = n.by + Math.cos(t * 0.0003 + n.ph * 1.3) * 14;
        const dx = mouse.x - wx;
        const dy = mouse.y - wy;
        const k = Math.max(0, 1 - Math.hypot(dx, dy) / REACH);
        n.ox += (dx * k * 0.28 - n.ox) * 0.12;
        n.oy += (dy * k * 0.28 - n.oy) * 0.12;
        n.hover += (k - n.hover) * 0.15;
        n.x = wx + n.ox;
        n.y = wy + n.oy;
      }
    };

    const build = () => {
      const sizes = W < 700 ? [3, 4, 4, 2] : [3, 5, 6, 6, 4, 2];
      const mx = Math.max(24, W * 0.05);
      const top = 80;
      const bottom = H - 60;
      layers = sizes.map((count, li) => {
        const x = mx + (li * (W - 2 * mx)) / (sizes.length - 1);
        const gap = (bottom - top) / (count + 1);
        return Array.from({ length: count }, (_, k) => ({
          bx: x + (Math.random() - 0.5) * 30,
          by: top + gap * (k + 1) + (Math.random() - 0.5) * gap * 0.4,
          x: 0,
          y: 0,
          ox: 0,
          oy: 0,
          ph: Math.random() * Math.PI * 2,
          act: 0,
          hover: 0,
          fired: -1,
          out: [],
          inn: [],
        }));
      });
      nodes = layers.flat();
      edges = [];
      pulses = [];
      // Sparse links between neighbouring layers; every neuron keeps at least one in and out.
      for (let i = 0; i < layers.length - 1; i++) {
        const A = layers[i];
        const B = layers[i + 1];
        for (const a of A) for (const b of B) if (Math.random() < 0.38) link(a, b);
        for (const a of A) if (!a.out.length) link(a, pick(B));
        for (const b of B) if (!b.inn.length) link(pick(A), b);
      }
      place(0);
    };

    const fire = (n: Neuron, id: number, warm: boolean) => {
      if (n.fired === id) return;
      n.fired = id;
      n.act = 1;
      if (!n.out.length) return;
      const best = n.out.reduce((m, e) => (Math.abs(e.w) > Math.abs(m.w) ? e : m));
      for (const e of n.out) {
        if (pulses.length >= MAX_PULSES) break;
        if (e === best || Math.random() < 0.1 + 0.35 * Math.abs(e.w)) {
          pulses.push({ e, t: 0, wave: id, warm });
        }
      }
    };

    const step = (dt: number) => {
      const arrived: Pulse[] = [];
      for (const p of pulses) {
        const len = Math.hypot(p.e.b.x - p.e.a.x, p.e.b.y - p.e.a.y) || 1;
        p.t += (SPEED * dt) / len;
        if (p.t >= 1) arrived.push(p);
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of arrived) {
        p.e.heat = 1;
        fire(p.e.b, p.wave, p.warm);
      }
      const fade = Math.exp(-dt * 2.2);
      for (const n of nodes) n.act *= fade;
      for (const e of edges) e.heat *= fade;
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 1;
      for (const e of edges) {
        const hv = Math.max(e.a.hover, e.b.hover);
        const alpha = 0.08 + 0.1 * Math.abs(e.w) + 0.3 * e.heat + 0.35 * hv;
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.b.x, e.b.y);
        ctx.stroke();
      }

      for (const p of pulses) {
        const x = p.e.a.x + (p.e.b.x - p.e.a.x) * p.t;
        const y = p.e.a.y + (p.e.b.y - p.e.a.y) * p.t;
        const c = p.warm ? rgb2 : rgb;
        ctx.fillStyle = `rgba(${c}, 0.18)`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${c}, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1.2;
      for (const n of nodes) {
        const glow = Math.max(n.act, n.hover);
        ctx.fillStyle = bg;
        ctx.strokeStyle = `rgba(${rgb}, ${0.35 + 0.55 * glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.6 + 1.6 * glow, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    };

    const frame = (ts: number) => {
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
      last = ts;
      if (ts - lastWave > WAVE_MS) {
        lastWave = ts;
        wave += 1;
        const warm = wave % 4 === 0;
        for (const n of layers[0] ?? []) if (Math.random() < 0.6) fire(n, wave, warm);
      }
      mouse.x = pointer.on ? pointer.x : -1e4;
      mouse.y = pointer.on ? pointer.y + window.scrollY : -1e4;
      place(ts);
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || still || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const hero = anchor.current;
      const w = document.documentElement.clientWidth;
      const h = Math.round(hero ? hero.getBoundingClientRect().bottom + window.scrollY + 40 : 620);
      if (w === W && h === H) return;
      W = w;
      H = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      build();
      draw();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    if (anchor.current) ro.observe(anchor.current);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      readColors();
      if (!raf) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [anchor]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="net-canvas pointer-events-none absolute left-0 top-0 -z-10"
    />
  );
}
