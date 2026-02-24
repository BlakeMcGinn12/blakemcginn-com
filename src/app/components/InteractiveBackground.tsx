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

    // Configuration - SUBTLE & SMOOTH
    const config = {
      dotSize: 2,
      dotSpacing: 40,
      mouseRadius: 120,
      moveStrength: 15,
      returnSpeed: 0.05,
      opacity: 0.08,
    };

    // Calculate grid
    let cols: number;
    let rows: number;
    let dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const initDots = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      cols = Math.ceil(canvas.width / config.dotSpacing) + 1;
      rows = Math.ceil(canvas.height / config.dotSpacing) + 1;
      
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
        // Calculate distance from mouse
        const dx = mouseX - dot.originX;
        const dy = mouseY - dot.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate target position
        let targetX = dot.originX;
        let targetY = dot.originY;
        
        // Move dot away from mouse if within radius
        if (distance < config.mouseRadius && distance > 0) {
          const force = (1 - distance / config.mouseRadius) * config.moveStrength;
          const angle = Math.atan2(dy, dx);
          targetX = dot.originX - Math.cos(angle) * force;
          targetY = dot.originY - Math.sin(angle) * force;
        }
        
        // Smooth easing toward target (same speed for move and return)
        dot.x += (targetX - dot.x) * config.returnSpeed;
        dot.y += (targetY - dot.y) * config.returnSpeed;

        // Draw dot - subtle
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, config.dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${config.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    initDots();
    animate();

    // Event listeners
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
      className="absolute inset-0 pointer-events-auto"
      style={{ 
        zIndex: 0,
        opacity: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
