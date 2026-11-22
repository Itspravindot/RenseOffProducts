"use client";

import { useRef } from "react";
import { brandInfo } from "@/lib/site";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";

export function Story() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".story-reveal",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="our-story"
      ref={root}
      data-bg="#F6F2EA"
      className="relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sage-soft/50 blur-[90px]"
      />
      <div className="container-wide relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="story-reveal eyebrow">About Us</p>
          <h2 className="story-reveal mt-7 font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-forest">
            {brandInfo.aboutHeading}
          </h2>
          <p className="story-reveal mt-7 text-sm leading-[1.9] text-muted sm:text-base">
            {brandInfo.about}
          </p>
          <p className="story-reveal mt-5 font-display text-lg italic text-forest-soft sm:text-xl">
            {brandInfo.tagline}
          </p>
        </div>

        <div className="story-reveal mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="rounded-[28px] border border-forest/10 bg-white/45 p-8 backdrop-blur-sm sm:p-10">
            <p className="eyebrow">{brandInfo.whyHeading}</p>
            <p className="mt-5 text-sm leading-[1.9] text-muted">
              {brandInfo.why}
            </p>
            <p className="mt-5 font-display text-lg italic text-forest/80">
              {brandInfo.whyTagline}
            </p>
          </article>
          <article className="rounded-[28px] border border-forest/10 bg-white/45 p-8 backdrop-blur-sm sm:p-10">
            <p className="eyebrow">{brandInfo.missionHeading}</p>
            <p className="mt-5 text-sm leading-[1.9] text-muted">
              {brandInfo.mission}
            </p>
          </article>
        </div>

        <div className="story-reveal mx-auto mt-12 flex max-w-5xl flex-col items-center gap-2 text-center">
          <span className="h-px w-16 bg-forest/25" />
          <p className="font-display text-lg text-forest">
            {brandInfo.founder.name}
          </p>
          <p className="text-[0.65rem] uppercase tracking-editorial text-muted">
            {brandInfo.founder.role}
          </p>
        </div>
      </div>
    </section>
  );
}
