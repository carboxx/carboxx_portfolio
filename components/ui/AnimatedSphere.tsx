'use client';

import { useEffect, useRef } from 'react';

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // Set canvas size
    const resize = () => {
      const size = Math.min(window.innerWidth * 0.5, 500);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    // Sphere parameters
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width * 0.35;
    const numPoints = 1000;

    // Generate sphere points
    const generateSpherePoints = () => {
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        points.push({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.sin(phi) * Math.sin(theta),
          z: Math.cos(phi),
        });
      }
      return points;
    };

    const points = generateSpherePoints();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotation += 0.005;

      // Rotate and project points
      const projectedPoints = points.map((point) => {
        // Rotation around Y axis
        const rotatedX = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const rotatedZ = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
        const rotatedY = point.y;

        // Simple projection
        const scale = radius / (1 + rotatedZ * 0.5);
        const x2d = centerX + rotatedX * scale;
        const y2d = centerY + rotatedY * scale;

        return {
          x: x2d,
          y: y2d,
          z: rotatedZ,
          scale: scale,
        };
      });

      // Sort by Z (back to front)
      projectedPoints.sort((a, b) => a.z - b.z);

      // Draw points
      projectedPoints.forEach((point) => {
        const opacity = Math.max(0.2, (point.z + 1) / 2); // Min 0.2, max 1
        const size = Math.max(1, point.scale / 35);

        // Gradient color based on depth
        const blue = Math.floor(99 + (point.z + 1) * 50);
        const purple = Math.floor(102 + (point.z + 1) * 50);

        ctx.fillStyle = `rgba(${blue}, ${purple}, 241, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="opacity-30 dark:opacity-20"
        style={{ maxWidth: '500px' }}
      />
    </div>
  );
}
