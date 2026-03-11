"use client";

import { useEffect, useRef } from "react";

const LANDSCAPE_TOP = 0.50;

function drawSun(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const cx = w * 0.82;
  const cy = h * 0.10;
  const r = Math.min(w, h) * 0.04;

  ctx.fillStyle = "rgba(36, 30, 32, 0.08)";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawMountains(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const top = h * LANDSCAPE_TOP;

  // Far mountains - lighter shade, taller peaks
  const farBottom = top + h * 0.30;
  ctx.fillStyle = "rgba(36, 30, 32, 0.12)";
  ctx.beginPath();
  ctx.moveTo(0, top + h * 0.20);
  ctx.lineTo(w * 0.08, top + h * 0.12);
  ctx.lineTo(w * 0.15, top + h * 0.14);
  ctx.lineTo(w * 0.25, top + h * 0.08);
  ctx.lineTo(w * 0.35, top + h * 0.11);
  ctx.lineTo(w * 0.42, top + h * 0.06);
  ctx.lineTo(w * 0.52, top + h * 0.10);
  ctx.lineTo(w * 0.58, top + h * 0.07);
  ctx.lineTo(w * 0.68, top + h * 0.11);
  ctx.lineTo(w * 0.78, top + h * 0.05);
  ctx.lineTo(w * 0.88, top + h * 0.09);
  ctx.lineTo(w * 0.95, top + h * 0.13);
  ctx.lineTo(w, top + h * 0.18);
  ctx.lineTo(w, farBottom);
  ctx.lineTo(0, farBottom);
  ctx.closePath();
  ctx.fill();

  // Near mountains - darker shade, distinctly shorter
  const nearBottom = top + h * 0.30;
  ctx.fillStyle = "rgba(36, 30, 32, 0.20)";
  ctx.beginPath();
  ctx.moveTo(-10, top + h * 0.24);
  ctx.lineTo(w * 0.05, top + h * 0.21);
  ctx.lineTo(w * 0.12, top + h * 0.19);
  ctx.lineTo(w * 0.20, top + h * 0.21);
  ctx.lineTo(w * 0.30, top + h * 0.18);
  ctx.lineTo(w * 0.40, top + h * 0.20);
  ctx.lineTo(w * 0.50, top + h * 0.17);
  ctx.lineTo(w * 0.60, top + h * 0.20);
  ctx.lineTo(w * 0.70, top + h * 0.18);
  ctx.lineTo(w * 0.80, top + h * 0.20);
  ctx.lineTo(w * 0.90, top + h * 0.18);
  ctx.lineTo(w + 10, top + h * 0.22);
  ctx.lineTo(w + 10, nearBottom);
  ctx.lineTo(-10, nearBottom);
  ctx.closePath();
  ctx.fill();
}

function drawFloodwater(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
) {
  const top = h * LANDSCAPE_TOP;
  const waterTop = top + h * 0.30;

  // Water body
  ctx.fillStyle = "rgba(36, 30, 32, 0.14)";
  ctx.fillRect(0, waterTop, w, h - waterTop);

  // Wave lines — sine motion (each row bobs up/down over time)
  ctx.lineWidth = 1.2;
  const waveRegion = h - waterTop;
  for (let row = 0; row < 12; row++) {
    const baseY = waterTop + 6 + row * ((waveRegion - 6) / 11);
    const bob = Math.sin(time * 1.2 + row * 0.9) * (3 + row * 0.4);
    const y = baseY + bob;
    const rowOpacity = 0.10 + row * 0.01;
    ctx.strokeStyle = `rgba(36, 30, 32, ${rowOpacity})`;
    ctx.beginPath();
    for (let x = -20; x < w + 20; x += 3) {
      const wave = Math.sin((x / (50 - row * 1.5)) + time * 0.8 + row * 0.7) * (2 + row * 0.5);
      const py = y + wave;
      if (x === -20) ctx.moveTo(x, py);
      else ctx.lineTo(x, py);
    }
    ctx.stroke();
  }

  // Ripple circles
  ctx.strokeStyle = "rgba(36, 30, 32, 0.18)";
  ctx.lineWidth = 1;
  const ripples = [
    { x: 0.2, y: 0.50 },
    { x: 0.5, y: 0.60 },
    { x: 0.75, y: 0.45 },
    { x: 0.35, y: 0.72 },
    { x: 0.65, y: 0.80 },
    { x: 0.15, y: 0.65 },
  ];
  for (const ripple of ripples) {
    const rx = ripple.x * w;
    const ry = waterTop + ripple.y * waveRegion;
    const phase = (time * 0.5 + ripple.x * 10) % 3;
    for (let ring = 0; ring < 3; ring++) {
      const r = (phase + ring) * 8;
      const alpha = Math.max(0, 0.20 - r * 0.006);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.ellipse(rx, ry, r * 1.8, r * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

export default function WoodblockScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    function frame(time: number) {
      last = time;
      const t = time / 1000;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      drawSun(ctx, w, h);
      drawMountains(ctx, w, h);
      drawFloodwater(ctx, w, h, t);

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
