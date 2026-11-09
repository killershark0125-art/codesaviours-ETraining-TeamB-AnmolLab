"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };

export default function CellularBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    // Data Saver or reduced motion: keep the CSS gradient only.
    if (nav.connection?.saveData) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lite =
      window.innerWidth < 700 ||
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let effect: VantaEffect | null = null;
    let disposed = false;
    let starting = false;

    async function start() {
      if (effect || starting || disposed || !container) return;
      starting = true;

      try {
        const [THREE, CELLS] = await Promise.all([
          import("three"),
          import("vanta/dist/vanta.cells.min.js"),
        ]);

        if (disposed || effect || !container) return;

        effect = CELLS.default({
          el: container,
          THREE,

          mouseControls: finePointer,
          touchControls: false,
          gyroControls: false,

          minHeight: 200,
          minWidth: 200,

          // Higher scale = lower render resolution (cheaper on weak GPUs)
          scale: lite ? 2 : 1,
          scaleMobile: 2,

          // Anmol Lab brand colours
          backgroundColor: 0x22285c,
          color1: 0x7d7e80,
          color2: 0xedf4fa,

          size: 1.7,
          speed: lite ? 0.35 : 0.45,
        });
      } catch (error) {
        console.error("Unable to initialize the WebGL background:", error);
      } finally {
        starting = false;
      }
    }

    function stop() {
      effect?.destroy();
      effect = null;
    }

    // Only render while the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void start();
      else stop();
    });
    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      stop();
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