import React, { useEffect, useRef, memo } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  width: number;
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  lineWidth: number;
}

interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

const PALETTE = [
  '#f0f9ff', // Whitish ice blue
  '#e0f2fe', // Soft frost blue
  '#bae6fd', // Sky 200
  '#93c5fd', // Soft blue
  '#ffffff', // Pure white
];

export const SplashCursor: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Fluid trailing points
    const trailPoints: TrailPoint[] = [];
    const ripples: WaveRipple[] = [];
    const droplets: Droplet[] = [];

    // Current cursor and trailing head with spring physics
    let targetX = -100;
    let targetY = -100;
    let headX = -100;
    let headY = -100;
    let headVx = 0;
    let headVy = 0;
    let isPointerActive = false;
    let animationFrameId: number | null = null;
    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        tick();
      }
    };

    const triggerClickRipple = (x: number, y: number) => {
      // Primary expanding liquid wave ring
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: 48,
        alpha: 0.8,
        speed: 2.8,
        lineWidth: 2,
      });

      // Secondary soft outer wave
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 75,
        alpha: 0.45,
        speed: 3.6,
        lineWidth: 1,
      });

      // Gentle radial fluid droplets
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1.2;
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 0.9,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        });
      }

      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isPointerActive) {
        headX = targetX;
        headY = targetY;
        isPointerActive = true;
      }

      startLoop();
    };

    const handlePointerDown = (e: PointerEvent) => {
      triggerClickRipple(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      isPointerActive = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    const tick = () => {
      // 1. Smooth Spring Easing for Head Position (creates fluid inertia)
      if (isPointerActive) {
        const spring = 0.35;
        const friction = 0.65;
        const dx = targetX - headX;
        const dy = targetY - headY;

        headVx = (headVx + dx * spring) * friction;
        headVy = (headVy + dy * spring) * friction;

        headX += headVx;
        headY += headVy;

        const speed = Math.hypot(headVx, headVy);

        // Add trail point smoothly
        trailPoints.push({
          x: headX,
          y: headY,
          vx: headVx * 0.15,
          vy: headVy * 0.15,
          age: 0,
          maxAge: 32, // Smooth persistent fluid stream
          width: Math.min(9, Math.max(3, speed * 0.55 + 3.5)),
        });
      }

      ctx.clearRect(0, 0, width, height);

      // 2. Render and Update Ripples (Water tension splash effect)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.speed *= 0.96;
        r.alpha -= 0.022;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#bae6fd';
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = r.lineWidth;
        ctx.shadowColor = '#e0f2fe';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render and Update Droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.95;
        d.vy *= 0.95;
        d.alpha -= 0.028;
        d.radius *= 0.98;

        if (d.alpha <= 0.01 || d.radius <= 0.3) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(0.3, d.radius), 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = Math.max(0, d.alpha);
        ctx.shadowColor = '#bae6fd';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 4. Update Trail Points
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        const p = trailPoints[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        if (p.age >= p.maxAge) {
          trailPoints.splice(i, 1);
        }
      }

      // 5. Draw Silky Smooth Flowing Liquid Ribbon in Whitish Frost Blue
      if (trailPoints.length > 2) {
        // Draw soft ambient frost glow
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < trailPoints.length; i++) {
          const pPrev = trailPoints[i - 1];
          const pCurr = trailPoints[i];

          const progress = 1 - pCurr.age / pCurr.maxAge; // 1 at head, 0 at tail
          const alpha = Math.sin((progress * Math.PI) / 2) * 0.7; // Smooth fade
          const strokeWidth = pCurr.width * progress;

          if (strokeWidth <= 0.4) continue;

          ctx.beginPath();
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);

          // Whitish ice blue trail stroke
          ctx.strokeStyle = '#bae6fd';
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.lineWidth = strokeWidth;
          ctx.shadowColor = '#e0f2fe';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }
        ctx.restore();

        // Draw inner bright white-frost silk core
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < trailPoints.length; i++) {
          const pPrev = trailPoints[i - 1];
          const pCurr = trailPoints[i];

          const progress = 1 - pCurr.age / pCurr.maxAge;
          const alpha = Math.sin((progress * Math.PI) / 2) * 0.95;
          const strokeWidth = Math.max(0.8, pCurr.width * 0.35 * progress);

          ctx.beginPath();
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);

          ctx.strokeStyle = '#ffffff';
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 6. Draw subtle, smooth cursor head glow
      if (isPointerActive) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(headX, headY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#bae6fd';
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();
      }

      // Continue running if active or animating, else sleep to conserve battery/CPU
      if (trailPoints.length > 0 || ripples.length > 0 || droplets.length > 0 || isPointerActive) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[80] select-none"
      aria-hidden="true"
    />
  );
});

SplashCursor.displayName = 'SplashCursor';
