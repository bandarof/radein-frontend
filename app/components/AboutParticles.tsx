'use client';

import { useEffect, useRef } from 'react';

export default function AboutParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    const PARTICLE_COUNT = Math.max(40, Math.floor((window.innerWidth * window.innerHeight) / 80000));

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const colors = ['rgba(255,255,255,0.95)', 'rgba(200,230,255,0.95)', 'rgba(180,210,255,0.9)'];

    function initParticles() {
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const size = rand(0.6, 2.6);
        particles.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          vx: rand(-0.06, 0.06),
          vy: rand(-0.02, 0.02),
          baseSize: size,
          size,
          flickerSpeed: rand(0.8, 2.4),
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      particlesRef.current = particles;
    }

    initParticles();

    function step(t: number) {
      const particles = particlesRef.current;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // subtle backdrop darken for contrast
      // ctx.fillStyle = 'rgba(0,0,0,0.0)';
      // ctx.fillRect(0,0,w,h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // movement
        p.x += p.vx * (1 + Math.sin((t / 1000) * 0.2));
        p.y += p.vy * (1 + Math.cos((t / 1200) * 0.18));

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // flicker
        const flicker = 0.5 + 0.5 * Math.sin(p.phase + t / (200 * p.flickerSpeed));
        const alpha = 0.35 + flicker * 0.75; // 0.35 - 1.1

        const size = p.baseSize * (0.6 + flicker * 1.2);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, alpha);
        // draw soft circle
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        g.addColorStop(0, p.color.replace(/rgba\(([^)]+)\)/, (m, g1) => {
          // ensure filled color has slightly stronger alpha
          const parts = g1.split(',').map(s => s.trim());
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${Math.min(1, alpha)})`;
        }));
        g.addColorStop(0.3, p.color.replace(/rgba\(([^)]+)\)/, (m, g1) => {
          const parts = g1.split(',').map(s => s.trim());
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${Math.min(0.45, alpha * 0.6)})`;
        }));
        g.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // tiny core
        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, alpha * 1.3);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.arc(p.x, p.y, Math.max(0.3, size * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    function onResize() {
      resize();
      initParticles();
    }

    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="about-canvas fixed inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden="true" />
  );
}
