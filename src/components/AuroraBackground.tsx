"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const orbs = [
        { x: canvas.width * 0.3, y: canvas.height * 0.3, radius: 300, color: "rgba(45, 212, 191, 0.08)" },
        { x: canvas.width * 0.7, y: canvas.height * 0.4, radius: 350, color: "rgba(45, 212, 191, 0.06)" },
        { x: canvas.width * 0.5, y: canvas.height * 0.7, radius: 280, color: "rgba(45, 212, 191, 0.05)" },
      ];

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time + i * 2) * 50;
        const offsetY = Math.cos(time * 0.7 + i * 2) * 30;
        
        const gradient = ctx.createRadialGradient(
          orb.x + offsetX,
          orb.y + offsetY,
          0,
          orb.x + offsetX,
          orb.y + offsetY,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}