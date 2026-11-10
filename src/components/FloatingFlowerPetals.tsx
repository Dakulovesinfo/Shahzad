/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export interface PetalInstance {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  flip: number;
  vFlip: number;
  swaySpeed: number;
  swayDist: number;
  swayOffset: number;
  opacity: number;
  decay: number;
  colorType: 'maroon' | 'ruby' | 'gold' | 'pink' | 'white';
}

interface FloatingFlowerPetalsProps {
  burstTrigger?: number; // increments when a burst should happen
  burstOrigin?: { x: number; y: number };
}

export const FloatingFlowerPetals: React.FC<FloatingFlowerPetalsProps> = ({
  burstTrigger = 0,
  burstOrigin,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<PetalInstance[]>([]);
  const lastBurstRef = useRef(burstTrigger);

  // Helper to create an organic petal
  const createPetal = (
    x: number,
    y: number,
    isBurst = false
  ): PetalInstance => {
    const colorTypes: ('maroon' | 'ruby' | 'gold' | 'pink' | 'white')[] = [
      'maroon',
      'ruby',
      'ruby',
      'maroon',
      'gold',
      'pink',
    ];
    const colorType = colorTypes[Math.floor(Math.random() * colorTypes.length)];

    let vx: number;
    let vy: number;
    let size: number;
    let opacity: number;
    let decay: number;

    if (isBurst) {
      // Explosive radial velocity, then settles into floating
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed - 4; // Bias upwards
      size = Math.random() * 14 + 10;
      opacity = 1.0;
      decay = 0.003 + Math.random() * 0.003;
    } else {
      // Gentle ambient drift
      vx = (Math.random() - 0.5) * 1.2;
      vy = Math.random() * 1.4 + 0.8;
      size = Math.random() * 12 + 8;
      opacity = Math.random() * 0.6 + 0.3;
      decay = 0;
    }

    return {
      x,
      y,
      size,
      vx,
      vy,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 3,
      flip: Math.random() * Math.PI,
      vFlip: Math.random() * 0.06 + 0.02,
      swaySpeed: Math.random() * 0.03 + 0.015,
      swayDist: Math.random() * 30 + 15,
      swayOffset: Math.random() * 100,
      opacity,
      decay,
      colorType,
    };
  };

  // Trigger floral burst
  const spawnBurst = (originX: number, originY: number) => {
    const burstCount = 65;
    const newPetals: PetalInstance[] = [];
    for (let i = 0; i < burstCount; i++) {
      newPetals.push(createPetal(originX, originY, true));
    }
    petalsRef.current = [...petalsRef.current, ...newPetals];
  };

  useEffect(() => {
    if (burstTrigger > lastBurstRef.current) {
      lastBurstRef.current = burstTrigger;
      const originX = burstOrigin ? burstOrigin.x : window.innerWidth / 2;
      const originY = burstOrigin ? burstOrigin.y : window.innerHeight / 2;
      spawnBurst(originX, originY);
    }
  }, [burstTrigger, burstOrigin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial ambient petals pool
    const ambientCount = 20;
    for (let i = 0; i < ambientCount; i++) {
      petalsRef.current.push(
        createPetal(Math.random() * width, Math.random() * height, false)
      );
    }

    let animationFrameId: number;
    let time = 0;

    const drawOrganicPetal = (
      ctx: CanvasRenderingContext2D,
      p: PetalInstance
    ) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      // 3D flip effect by scaling Y axis
      ctx.scale(1, Math.cos(p.flip));

      ctx.beginPath();
      // Natural organic rose petal curve
      const r = p.size;
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.9, -r * 0.8, r * 1.2, r * 0.4, 0, r);
      ctx.bezierCurveTo(-r * 1.2, r * 0.4, -r * 0.9, -r * 0.8, 0, -r);
      ctx.closePath();

      // Petal coloring gradient
      const grad = ctx.createRadialGradient(0, -r * 0.3, 2, 0, 0, r * 1.1);
      if (p.colorType === 'ruby') {
        grad.addColorStop(0, `rgba(225, 45, 75, ${p.opacity})`);
        grad.addColorStop(0.7, `rgba(165, 20, 50, ${p.opacity})`);
        grad.addColorStop(1, `rgba(90, 23, 39, ${p.opacity})`);
      } else if (p.colorType === 'maroon') {
        grad.addColorStop(0, `rgba(180, 35, 60, ${p.opacity})`);
        grad.addColorStop(0.6, `rgba(110, 18, 35, ${p.opacity})`);
        grad.addColorStop(1, `rgba(49, 11, 24, ${p.opacity})`);
      } else if (p.colorType === 'gold') {
        grad.addColorStop(0, `rgba(255, 240, 190, ${p.opacity})`);
        grad.addColorStop(0.6, `rgba(240, 213, 142, ${p.opacity})`);
        grad.addColorStop(1, `rgba(198, 161, 91, ${p.opacity})`);
      } else if (p.colorType === 'pink') {
        grad.addColorStop(0, `rgba(255, 200, 215, ${p.opacity})`);
        grad.addColorStop(0.7, `rgba(230, 110, 140, ${p.opacity})`);
        grad.addColorStop(1, `rgba(180, 50, 80, ${p.opacity})`);
      } else {
        grad.addColorStop(0, `rgba(255, 250, 245, ${p.opacity})`);
        grad.addColorStop(0.7, `rgba(245, 220, 225, ${p.opacity})`);
        grad.addColorStop(1, `rgba(220, 170, 180, ${p.opacity})`);
      }

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fill();

      // Subtle petal central vein
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.85);
      ctx.quadraticCurveTo(r * 0.1, 0, 0, r * 0.85);
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.25})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const activePetals: PetalInstance[] = [];

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];

        // Update kinematics
        if (p.decay > 0) {
          // Burst physics: decelerate explosion and convert into gentle fall
          p.vx *= 0.94;
          p.vy = p.vy * 0.94 + 0.12; // Gravity
          p.opacity -= p.decay;
        } else {
          // Ambient swaying drift
          p.vx = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.8;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.flip += p.vFlip;

        // Draw petal
        if (p.opacity > 0.05) {
          drawOrganicPetal(ctx, p);
        }

        // Keep active or wrap ambient
        if (p.decay > 0) {
          if (p.opacity > 0.05 && p.y < height + 50 && p.x > -50 && p.x < width + 50) {
            activePetals.push(p);
          }
        } else {
          // Wrap ambient petals around edges
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          activePetals.push(p);
        }
      }

      petalsRef.current = activePetals;
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
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
