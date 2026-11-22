"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="faq"
      ref={root}
      data-bg="#F5F2EB"
      className="py-28 sm:py-36"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Good to Know</p>
          <h2 className="mt-6 font-display text-[clamp(2.8rem,6vw,5rem)] font-light leading-none tracking-[-0.02em] text-forest">
            Frequently Asked Questions
          </h2>
          <p className="section-intro mt-6">
            Everything you need to know about Renseoff.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="faq-item border-b border-forest/12"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-display text-xl leading-snug transition-colors duration-300 sm:text-2xl ${
                      isOpen ? "text-forest" : "text-forest/80 group-hover:text-forest"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-premium ${
                      isOpen
                        ? "rotate-45 border-forest bg-forest text-ivory"
                        : "border-forest/20 text-forest group-hover:border-forest"
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-premium ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-sm leading-[1.9] text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
