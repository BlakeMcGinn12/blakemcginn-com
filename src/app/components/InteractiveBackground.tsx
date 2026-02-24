"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const config = {
      dotSize: 2,
      dotSpacing: 40,
      mouseRadius: 60,
      moveStrength: 10,
      easing: 0.03,
      opacity: 0.06,
    };

    let dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const initDots = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      const cols = Math.ceil(width / config.dotSpacing) + 1;
      const rows = Math.ceil(height / config.dotSpacing) + 1;
      
      dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * config.dotSpacing;
          const y = j * config.dotSpacing;
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = mouseX - dot.originX;
        const dy = mouseY - dot.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.originX;
        let targetY = dot.originY;
        
        if (distance < config.mouseRadius && distance > 0) {
          const pushFactor = 1 - (distance / config.mouseRadius);
          const force = pushFactor * config.moveStrength;
          const angle = Math.atan2(dy, dx);
          
          targetX = dot.originX - Math.cos(angle) * force;
          targetY = dot.originY - Math.sin(angle) * force;
        }
        
        dot.x += (targetX - dot.x) * config.easing;
        dot.y += (targetY - dot.y) * config.easing;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, config.dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${config.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    initDots();
    animate();

    window.addEventListener("resize", initDots);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", initDots);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
