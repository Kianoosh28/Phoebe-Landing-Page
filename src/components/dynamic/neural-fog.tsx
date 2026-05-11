"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
};

const PARTICLE_COUNT = 70;
const MAX_LINK_DIST = 150;
const MOUSE_RADIUS = 140;
const MOUSE_FORCE = 0.55;
const DRIFT_SPEED = 0.18;

export function NeuralFog() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Skip particles on touch devices and reduced-motion preference.
    if (reduceMotion || isCoarsePointer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const vx = (Math.random() - 0.5) * DRIFT_SPEED;
      const vy = (Math.random() - 0.5) * DRIFT_SPEED;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
      };
    });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    let rafId = 0;
    let lastT = performance.now();

    const draw = (t: number) => {
      const dt = Math.min(32, t - lastT) / 16; // normalize to ~60fps
      lastT = t;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Repulsion from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.5) {
          const d = Math.sqrt(d2);
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Light damping + small drift toward base velocity (so they don't stall)
        p.vx = p.vx * 0.94 + p.baseVx * 0.03;
        p.vy = p.vy * 0.94 + p.baseVy * 0.03;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap around viewport
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Particle dot
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const lx = p.x - q.x;
          const ly = p.y - q.y;
          const ld2 = lx * lx + ly * ly;
          if (ld2 < MAX_LINK_DIST * MAX_LINK_DIST) {
            const ld = Math.sqrt(ld2);
            const alpha = (1 - ld / MAX_LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Subtle cursor halo
      if (mouse.x > -500) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_RADIUS
        );
        grad.addColorStop(0, "rgba(0, 240, 255, 0.08)");
        grad.addColorStop(1, "rgba(0, 240, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
