
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type Cell = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  phase: number;
  rotation: number;
};

export default function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !host || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let lastFrame = 0;
    let running = false;

    let particles: Particle[] = [];
    let cells: Cell[] = [];

    const pointer = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    function resize() {
      const bounds = host!.getBoundingClientRect();

      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 650;
      const count = mobile ? 24 : Math.min(54, Math.floor(width / 17));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.009,
        radius: Math.random() * 1.7 + 0.5,
      }));

      cells = Array.from(
        { length: mobile ? 3 : 5 },
        (_, index) => ({
          x: 0.17 + (index % 3) * 0.32 + Math.random() * 0.08,
          y: 0.18 + Math.floor(index / 3) * 0.53 + Math.random() * 0.12,
          rx: 48 + Math.random() * (mobile ? 40 : 75),
          ry: 65 + Math.random() * (mobile ? 45 : 90),
          phase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI,
        })
      );

      draw(0);
    }

    function drawCell(
      cell: Cell,
      time: number,
      offsetX: number,
      offsetY: number
    ) {
      const cx = cell.x * width + offsetX;
      const cy = cell.y * height + offsetY;

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(cell.rotation);

      // The outer contours are intentionally irregular,
      // like organic cellular membranes under microscopy.

      for (let ring = 0; ring < 3; ring++) {
        const scale = 1 + ring * 0.21;
        const points = 76;

        ctx!.beginPath();

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;

          const distortion =
            1 +
            0.045 * Math.sin(angle * 3 + time * 0.0003 + cell.phase) +
            0.025 * Math.cos(angle * 5 - time * 0.00022);

          const x = Math.cos(angle) * cell.rx * distortion * scale;
          const y = Math.sin(angle) * cell.ry * distortion * scale;

          if (i === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }

        ctx!.closePath();
        ctx!.strokeStyle = `rgba(237,244,250,${0.12 - ring * 0.025})`;
        ctx!.lineWidth = ring === 0 ? 1.1 : 0.75;
        ctx!.stroke();
      }

      // A restrained inner cellular structure.
      ctx!.beginPath();
      ctx!.ellipse(
        cell.rx * 0.12,
        -cell.ry * 0.08,
        9,
        12,
        0.3,
        0,
        Math.PI * 2
      );
      ctx!.fillStyle = "rgba(237,244,250,0.13)";
      ctx!.fill();

      ctx!.restore();
    }

    function draw(time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      const offsetX = (pointer.x - 0.5) * -10;
      const offsetY = (pointer.y - 0.5) * -8;

      // Cellular structures
      cells.forEach((cell) => {
        drawCell(cell, time, offsetX, offsetY);
      });

      // Connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            const opacity = (1 - distance / 105) * 0.3;

            ctx.strokeStyle = `rgba(237,244,250,${opacity})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.x + offsetX, a.y + offsetY);
            ctx.lineTo(b.x + offsetX, b.y + offsetY);
            ctx.stroke();
          }
        }
      }

      // Individual particles
      particles.forEach((particle) => {
        ctx.beginPath();

        ctx.arc(
          particle.x + offsetX,
          particle.y + offsetY,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(237,244,250,0.72)";
        ctx.fill();
      });

      // A few larger, gently illuminated points
      particles.forEach((particle, index) => {
        if (index % 9 !== 0) return;

        ctx.beginPath();
        ctx.arc(
          particle.x + offsetX,
          particle.y + offsetY,
          3.5,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(201,206,228,0.2)";
        ctx.fill();
      });
    }

    function animate(time: number) {
      if (!running || document.hidden) return;

      const fps = width < 650 ? 20 : 28;
      const interval = 1000 / fps;

      frameId = requestAnimationFrame(animate);

      if (time - lastFrame < interval) return;

      const delta = Math.min(time - (lastFrame || time), 40);
      lastFrame = time;

      particles.forEach((particle) => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        // Keep particles inside the canvas.
        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;
      });

      cells.forEach((cell) => {
        cell.rotation += delta * 0.000012;
      });

      draw(time);
    }

    function start() {
      if (running || document.hidden || reducedMotion.matches) return;

      running = true;
      lastFrame = 0;
      frameId = requestAnimationFrame(animate);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    function handlePointer(event: PointerEvent) {
      const bounds = host!.getBoundingClientRect();

      pointer.targetX = Math.max(
        0,
        Math.min(1, (event.clientX - bounds.left) / bounds.width)
      );

      pointer.targetY = Math.max(
        0,
        Math.min(1, (event.clientY - bounds.top) / bounds.height)
      );
    }

    function handleVisibility() {
      if (document.hidden) {
        stop();
        return;
      }

      if (reducedMotion.matches) {
        draw(performance.now());
      } else {
        start();
      }
    }

    function handleMotionPreference() {
      stop();

      if (reducedMotion.matches) {
        draw(performance.now());
      } else {
        start();
      }
    }

    resize();

    host.addEventListener("pointermove", handlePointer, {
      passive: true,
    });

    host.addEventListener("pointerleave", () => {
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    });

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    if (!reducedMotion.matches) start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      host.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-field"
      aria-hidden="true"
    />
  );
}
