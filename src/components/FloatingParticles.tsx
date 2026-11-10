/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: golden motes, shimmering embers, stars
    const particleCount = Math.min(38, Math.floor(window.innerWidth / 32));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.25 - Math.random() * 0.45,
      alpha: Math.random() * 0.7 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.4
          ? 'rgba(240, 213, 142,' // Champagne Gold
          : 'rgba(198, 161, 91,', // Antique Gold
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.phase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.25;

        // Wrap around viewport edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(240, 213, 142, 0.6)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
