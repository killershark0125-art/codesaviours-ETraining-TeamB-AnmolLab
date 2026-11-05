
"use client";

import { useEffect, useRef } from "react";

export default function CellularBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let effect: { destroy: () => void } | null = null;
    let disposed = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    async function initialize() {
      try {
        const [THREE, CELLS] = await Promise.all([
          import("three"),
          import("vanta/dist/vanta.cells.min.js"),
        ]);

        if (disposed || !container) return;


effect = CELLS.default({
  el: container,
  THREE,

  mouseControls: true,
  touchControls: false,
  gyroControls: false,

  minHeight: 200,
  minWidth: 200,

  // Resolution and performance
  scale: 1,
  scaleMobile: 2,

  // ANMOL LAB BRAND COLOURS
  backgroundColor: 0x22285c,
  color1: 0x7d7e80,
  color2: 0xedf4fa,

  // Animation
  size: 1.7,
  speed: 0.45,
});

      } catch (error) {
        console.error(
          "Unable to initialize the WebGL background:",
          error
        );
      }
    }

    void initialize();

    return () => {
      disposed = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cellular-background"
      aria-hidden="true"
    />
  );
}
