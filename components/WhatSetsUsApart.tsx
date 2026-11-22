"use client";

import { useRef } from "react";
import Image from "next/image";
import { Droplets, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";

const features = [
  {
    title: "Natural Ingredients",
    Icon: Leaf,
  },
  {
    title: "No Harsh Chemicals",
    Icon: ShieldCheck,
  },
  {
    title: "Plant-Based",
    Icon: Sprout,
  },
  {
    title: "Liquid Products",
    Icon: Droplets,
  },
];

export function WhatSetsUsApart() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".apart-reveal",
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
      id="what-sets-us-apart"
      ref={root}
      data-bg="#F6F2EA"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[760px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sage-soft/45 blur-[90px]"
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="apart-reveal eyebrow">The Renseoff Difference</p>
          <h2 className="apart-reveal mt-6 font-display text-[clamp(2.6rem,5.8vw,4.8rem)] font-light leading-[1.04] tracking-[-0.02em] text-forest">
            What Sets Us Apart
          </h2>
          <p className="apart-reveal section-intro mt-6">
            Natural ingredients. No harsh chemicals. Plant-based liquid products
            made for everyday care.
          </p>
        </div>

        <div className="apart-reveal relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[32px] border border-forest/10 shadow-[0_30px_70px_-45px_rgba(31,64,50,0.65)]">
          <div className="relative aspect-[2/3] sm:aspect-[40/19]">
            <Image
              src="/images/product-family-mobile.webp"
              alt="The complete Renseoff range — all 5L cans, 500ML bottles and 200ML air fresheners together"
              fill
              sizes="(max-width: 639px) 90vw, 1px"
              className="object-cover sm:hidden"
            />
            <Image
              src="/images/product-family.webp"
              alt="The complete Renseoff range — 200ML air fresheners, 500ML bottles and 5L cans together"
              fill
              sizes="(max-width: 639px) 1px, 1024px"
              className="hidden object-cover sm:block"
            />
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {features.map(({ title, Icon }) => (
            <article
              key={title}
              className="apart-reveal flex flex-col items-center rounded-[26px] border border-forest/10 bg-white/45 px-4 py-8 text-center backdrop-blur-sm transition-all duration-700 ease-premium hover:-translate-y-1.5 hover:border-forest/20 hover:bg-white/75 hover:shadow-card sm:py-10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest-soft">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <h3 className="mt-5 font-display text-lg leading-tight text-forest sm:text-xl">
                {title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
