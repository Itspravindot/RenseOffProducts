"use client";

import { useRef } from "react";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";
import { brandInfo } from "@/lib/site";
import { generalOrderMessage, whatsappUrl } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    title: "Explore",
    text: "Discover the Renseoff product collection.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Choose",
    text: "Add multiple products and quantities to your inquiry.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Order",
    text: "Send one WhatsApp message with everything you chose.",
    icon: WhatsAppIcon,
  },
];

export function HowToOrder() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const bulkHref = whatsappUrl(
    "Hello Renseoff! I would like to enquire about a bulk order.",
  );

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".order-step",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="how-to-order"
      ref={root}
      data-bg="#F3F6F1"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-forest/15 to-transparent"
      />
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How to Order</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-forest">
            Your Renseoff Essentials,
            <br />
            <span className="italic text-forest-soft">Just a Message Away.</span>
          </h2>
          <p className="section-intro mt-6">
            Ordering your favourite products is simple.
          </p>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-forest/10 via-forest/25 to-forest/10 md:block"
          />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="order-step relative flex flex-col items-center text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-forest/15 bg-ivory/80 backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-forest-soft" />
                  <span className="absolute -bottom-1 rounded-full bg-[#F3F6F1] px-2 text-[0.58rem] font-semibold tracking-[0.16em] text-forest/70">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl text-forest">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href={whatsappUrl(generalOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Start Your Order on WhatsApp
            <ArrowUpRight className="h-4 w-4 opacity-70" strokeWidth={1.5} />
          </a>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs tracking-wide text-muted">
            {brandInfo.bulkNote && (
              <>
                <Sparkles className="h-3.5 w-3.5 text-forest/60" strokeWidth={1.5} />
                {brandInfo.bulkNote}{" "}
              </>
            )}
            <a
              href={bulkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest"
            >
              Enquire here
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
