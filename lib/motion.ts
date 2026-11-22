"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Reveal a group of elements with a soft, staggered upward motion. */
export function revealGroup(
  scope: HTMLElement | null,
  selector: string,
  options: { start?: string; y?: number; stagger?: number } = {},
) {
  if (!scope) return () => {};

  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return () => {};

  const animation = gsap.fromTo(
    targets,
    { autoAlpha: 0, y: options.y ?? 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: options.stagger ?? 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: options.start ?? "top 78%",
        once: true,
      },
    },
  );

  return () => {
    animation.scrollTrigger?.kill();
    animation.kill();
  };
}
