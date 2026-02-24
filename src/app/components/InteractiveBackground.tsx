"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [debug, setDebug] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState(false);

  const addDebug = (msg: string) => {
    console.log(`[InteractiveBG] ${msg}`);
    setDebug(prev => [...prev.slice(-4), msg]);
  };

  useEffect(() => {
    addDebug("Effect starting...");
    
    const canvas = canvasRef.current;
    if (!canvas) {
      addDebug("ERROR: Canvas ref is null");
      return;
    }
    addDebug(`Canvas found: ${canvas.tagName}`);

    const parent = canvas.parentElement;
    if (!parent) {
      addDebug("ERROR: No parent element");
      return;
    }
    addDebug(`Parent found: ${parent.tagName}, size: ${parent.offsetWidth}x${parent.offsetHeight}`);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      addDebug("ERROR: Could not get 2D context");
      return;
    }
    addDebug("2D context obtained");

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let frameCount = 0;

    const config = {
      dotSize: 2,
      dotSpacing: 40,
      mouseRadius: 60,
      moveStrength: 10,
      easing: 0.03,
      opacity: 0.06,  // Back to subtle
    };

    let dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const initDots = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      
      addDebug(`Init: ${width}x${height}`);
      
      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
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
      
      addDebug(`Created ${dots.length} dots (${cols}x${rows})`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      if (frameCount % 60 === 0) {
        addDebug(`Mouse: ${Math.round(mouseX)}, ${Math.round(mouseY)}`);
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      addDebug("Mouse left");
    };

    const animate = () => {
      frameCount++;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let movedCount = 0;

      dots.forEach((dot) => {
        // Distance from mouse to dot's origin
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
          movedCount++;
        }
        
        // Smooth easing
        dot.x += (targetX - dot.x) * config.easing;
        dot.y += (targetY - dot.y) * config.easing;

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, config.dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${config.opacity})`;
        ctx.fill();
      });
      
      if (frameCount === 60) {
        addDebug(`First frame complete, ${movedCount} dots moved`);
        setIsWorking(true);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    addDebug("Initializing...");
    initDots();
    animate();
    addDebug("Animation started");

    // Event listeners
    window.addEventListener("resize", () => {
      addDebug("Window resized");
      initDots();
    });
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    addDebug("Event listeners attached");

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", initDots);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      addDebug("Cleanup complete");
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto',
          border: isWorking ? 'none' : '2px solid red', // Red border if not working
        }}
      />
      {/* Debug overlay - remove in production */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100,
        background: 'rgba(0,0,0,0.8)',
        color: '#0f0',
        padding: '10px',
        fontSize: '11px',
        fontFamily: 'monospace',
        maxWidth: '300px',
        borderRadius: '4px',
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
          Interactive BG Debug
        </div>
        {debug.map((msg, i) => (
          <div key={i} style={{ marginBottom: '2px' }}>{msg}</div>
        ))}
        <div style={{ marginTop: '5px', color: isWorking ? '#0f0' : '#f00' }}>
          Status: {isWorking ? '✓ Working' : '✗ Not working'}
        </div>
      </div>
    </>
  );
}
