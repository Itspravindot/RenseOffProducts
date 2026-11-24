"use client";

import { useRef } from "react";
import { brandInfo } from "@/lib/site";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";

export function MadeByRenseoff() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".made-reveal",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="made-by-renseoff"
      ref={root}
      data-bg="#F6F2EA"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[680px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sage-soft/40 blur-[90px]"
      />
      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="made-reveal flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-forest/25" />
            <p className="eyebrow">{brandInfo.madeBy.eyebrow}</p>
            <span className="h-px w-10 bg-forest/25" />
          </div>
          <h2 className="made-reveal mt-8 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em] text-forest">
            {brandInfo.madeBy.title}
          </h2>
          <p className="made-reveal section-intro mt-7">
            {brandInfo.madeBy.body}
          </p>
        </div>
      </div>
    </section>
  );
}
