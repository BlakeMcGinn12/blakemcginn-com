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
      opacity: 0.06,          // Slightly more visible
    };

    let dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const initDots = () => {
      // Get parent container dimensions
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Set canvas internal size to match display size (no DPR scaling for simpler math)
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
      // Get mouse position relative to canvas
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const animate = () => {
      if (!canvas.parentElement) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        ctx.fillStyle = `rgba(51, 65, 85, ${config.opacity})`; // slate-700 for better visibility
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
      className="block w-full h-full"
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
