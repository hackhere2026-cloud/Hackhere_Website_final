import React, { useEffect, useRef } from 'react';

export const InfinityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const horizonY = height * 0.10; // Raised Curved Horizon higher up

      // Function calculating curved horizon Y coordinate for any X
      const getHorizonY = (x: number) => {
        const normX = (x - width / 2) / (width / 2); // Range: -1 to 1
        const curveDepth = height * 0.05; // Elegant curve depth
        return horizonY + Math.pow(normX, 2) * curveDepth;
      };

      ctx.save();

      // ── 1. DRAW GLOWING CURVED HORIZON TERMINATION ARC ──
      ctx.beginPath();
      ctx.moveTo(0, getHorizonY(0));
      ctx.quadraticCurveTo(width / 2, horizonY, width, getHorizonY(width));
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow for grid lines

      // ── 2. VERTICAL PERSPECTIVE LINES ENDING AT CURVED HORIZON ──
      const vanishingX = width / 2;
      const numLines = 18;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.8;

      for (let i = -numLines; i <= numLines; i++) {
        const topX = vanishingX + i * (width / 25);
        const bottomX = vanishingX + i * (width / 7);
        const topY = getHorizonY(topX); // Terminate precisely at the curved horizon arc

        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // ── 3. MOVING CURVED HORIZONTAL GRID LINES (DOWN TO UP) ──
      offset = (offset - 0.007 + 1) % 1;
      const maxGridLines = 14;

      for (let i = 0; i < maxGridLines; i++) {
        const lineOffset = (i + offset) / maxGridLines;
        // Exponential perspective depth scaling
        const perspectiveY = horizonY + Math.pow(lineOffset, 2.0) * (height - horizonY);
        
        // Curve factor smoothly transitions as grid lines approach the curved horizon
        const currentCurveFactor = (1 - lineOffset) * (height * 0.06);

        ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 + lineOffset * 0.45})`;
        ctx.lineWidth = 1.5 + lineOffset * 2.0;

        ctx.beginPath();
        ctx.moveTo(0, perspectiveY + currentCurveFactor);
        ctx.quadraticCurveTo(width / 2, perspectiveY, width, perspectiveY + currentCurveFactor);
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};
