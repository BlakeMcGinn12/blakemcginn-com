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

    // Configuration - VERY SUBTLE
    const config = {
      dotSize: 2,
      dotSpacing: 40,
      mouseRadius: 80,        // Smaller radius
      moveStrength: 8,        // Much less displacement
      easing: 0.02,           // Slower, smoother
      opacity: 0.04,          // 50% more transparent (was 0.08)
    };

    let dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const initDots = () => {
      // Set canvas to actual pixel size
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale context for retina displays
      ctx.scale(dpr, dpr);
      
      // Reset scale for calculations
      const width = rect.width;
      const height = rect.height;
      
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
      // Get mouse position relative to canvas
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      dots.forEach((dot) => {
        // Calculate distance from mouse to dot's ORIGIN position
        const dx = mouseX - dot.originX;
        const dy = mouseY - dot.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate target position (where dot wants to be)
        let targetX = dot.originX;
        let targetY = dot.originY;
        
        // If mouse is close, push dot away from mouse
        if (distance < config.mouseRadius && distance > 0) {
          // Push away from mouse (not toward)
          const pushFactor = (1 - distance / config.mouseRadius);
          const force = pushFactor * config.moveStrength;
          
          // Calculate angle from mouse to dot
          const angle = Math.atan2(dy, dx);
          
          // Push in opposite direction (away from mouse)
          targetX = dot.originX - Math.cos(angle) * force;
          targetY = dot.originY - Math.sin(angle) * force;
        }
        
        // Smooth easing - always move toward target
        dot.x += (targetX - dot.x) * config.easing;
        dot.y += (targetY - dot.y) * config.easing;

        // Draw dot
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
        width: '100%',
        height: '100%',
      }}
    />
  );
}
