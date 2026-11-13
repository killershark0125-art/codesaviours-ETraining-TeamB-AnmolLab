"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  return (
    <Suspense fallback={null}>
      <RouteScrollResetContent />
    </Suspense>
  );
}

function RouteScrollResetContent() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Do not interfere with the initial page load.
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    // Preserve navigation to a specific section.
    if (window.location.hash) return;

    // Start each newly visited page at the top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}