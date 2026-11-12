
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Don't interfere with the initial page load.
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    // Preserve navigation to a specific section.
    if (window.location.hash) return;

    // Start every newly visited page at its hero.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
