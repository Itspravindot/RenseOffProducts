"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/motion";

const DustCanvas = dynamic(() => import("@/components/three/DustCanvas"), {
  ssr: false,
  loading: () => null,
});

/** Desktop-only, reduced-motion-aware decorative WebGL dust layer. */
export function Ambient3D() {
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setSupported(false);
      return;
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setSupported(desktop.matches);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reducedMotion]);

  if (!supported) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <DustCanvas />
    </div>
  );
}
