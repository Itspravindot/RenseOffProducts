"use client";

import { useRef, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Ambient3D } from "@/components/Ambient3D";
import { ProductImage } from "@/components/ProductImage";
import { products } from "@/lib/products";
import {
  gsap,
  useIsomorphicLayoutEffect,
  useReducedMotion,
} from "@/lib/motion";

const particles = [
  { left: "8%", top: "24%", size: 3, delay: 0.2, duration: 13 },
  { left: "18%", top: "62%", size: 2, delay: 2.4, duration: 16 },
  { left: "27%", top: "38%", size: 4, delay: 1.1, duration: 15 },
  { left: "39%", top: "78%", size: 2, delay: 3.2, duration: 12 },
  { left: "52%", top: "20%", size: 3, delay: 0.8, duration: 17 },
  { left: "63%", top: "66%", size: 2, delay: 2.8, duration: 14 },
  { left: "72%", top: "32%", size: 4, delay: 1.7, duration: 16 },
  { left: "83%", top: "72%", size: 3, delay: 4.1, duration: 13 },
  { left: "91%", top: "43%", size: 2, delay: 0.5, duration: 15 },
  { left: "47%", top: "86%", size: 2, delay: 3.6, duration: 18 },
];

const imageHeights = [72, 92, 78, 100, 82, 94, 76];
const imageHeightsLarge = [148, 182, 158, 196, 166, 186, 156];
const pedestalHeights = [30, 38, 33, 42, 35, 40, 32];
const pedestalHeightsLarge = [64, 80, 70, 88, 74, 84, 68];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(".hero-eyebrow", { autoAlpha: 0, y: 18, duration: 0.9 })
        .from(
          ".hero-title-line > span",
          { yPercent: 115, duration: 1.25, stagger: 0.12 },
          "-=0.55",
        )
        .from(
          ".hero-subtext",
          { autoAlpha: 0, y: 20, duration: 0.9 },
          "-=0.8",
        )
        .from(
          ".hero-product",
          {
            autoAlpha: 0,
            y: 46,
            scale: 0.96,
            duration: 1.1,
            stagger: 0.075,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          { autoAlpha: 0, y: 14, duration: 0.8 },
          "-=0.6",
        );

      gsap.to(".hero-stage", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-copy", {
        yPercent: -24,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={root}
      data-bg="#FCFAF6"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[76px] lg:pt-[88px]"
    >
      {/* Warm editorial backdrop: soft light, botanical shadows, fine dust. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,255,255,0.95),rgba(252,250,246,0)_58%),radial-gradient(ellipse_at_10%_75%,rgba(214,228,210,0.5),transparent_45%),radial-gradient(ellipse_at_90%_70%,rgba(234,220,197,0.55),transparent_48%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[280px] rotate-[28deg] rounded-[60%_40%_70%_30%] bg-sage/20 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[240px] -rotate-[24deg] rounded-[50%_50%_30%_70%] bg-stone/30 blur-[70px]"
      />
      <Ambient3D />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-forest/25"
            style={
              {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: 0,
                animation: `drift ${particle.duration}s linear ${particle.delay}s infinite`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="container-wide relative z-10 flex flex-1 flex-col items-center justify-center pb-10 pt-10 sm:pb-14">
        <div className="hero-copy flex w-full flex-col items-center text-center">
          <p className="hero-eyebrow eyebrow flex items-center gap-4">
            <span className="h-px w-8 bg-forest/40" />
            The Renseoff Collection
            <span className="h-px w-8 bg-forest/40" />
          </p>

          <h1 className="hero-title mt-6 font-display text-[clamp(3rem,8vw,7.4rem)] font-light leading-[0.94] tracking-[-0.025em] text-forest sm:mt-8">
            <span className="hero-title-line block overflow-hidden pb-1">
              <span className="block">A Cleaner Home.</span>
            </span>
            <span className="hero-title-line block overflow-hidden pb-1">
              <span className="block italic text-forest-soft">
                A Better Everyday.
              </span>
            </span>
          </h1>

          <p className="hero-subtext mt-6 max-w-xl text-balance text-[0.9rem] leading-relaxed text-muted sm:mt-8 sm:text-base">
            Thoughtfully crafted essentials for every corner of your home.
          </p>
        </div>

        <div className="hero-stage relative mt-10 w-full max-w-[960px] sm:mt-12 lg:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[2%] -bottom-3 h-10 rounded-[50%] bg-gradient-to-r from-transparent via-forest/10 to-transparent blur-xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-[4%] bottom-0 h-[1px] bg-gradient-to-r from-transparent via-forest/20 to-transparent"
          />
          <div className="relative grid grid-cols-7 items-end gap-0 sm:gap-1 lg:gap-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="hero-product flex flex-col items-center justify-end lg:-mx-2"
                style={
                  {
                    "--img-h": `${imageHeights[index]}px`,
                    "--img-h-lg": `${imageHeightsLarge[index]}px`,
                    "--ped-h": `${pedestalHeights[index]}px`,
                    "--ped-h-lg": `${pedestalHeightsLarge[index]}px`,
                  } as CSSProperties
                }
              >
                <div className="relative w-full max-w-[156px] h-[var(--img-h)] lg:h-[var(--img-h-lg)]">
                  <ProductImage
                    src={product.image}
                    alt={`${product.name} by Renseoff`}
                    priority
                    sizes="(max-width: 640px) 13vw, (max-width: 1024px) 12vw, 11vw"
                    className="drop-shadow-[0_18px_18px_rgba(70,60,45,0.18)]"
                  />
                </div>
                <div className="relative w-full max-w-[142px]">
                  <div
                    className="animate-float-slow absolute -top-1 left-1/2 h-2 w-[86%] -translate-x-1/2 rounded-[50%] bg-[#EFE7D7] shadow-[0_2px_8px_rgba(90,78,58,0.18)]"
                    style={{ animationDelay: `${index * 0.45}s` }}
                    aria-hidden="true"
                  />
                  <div
                    className="h-[var(--ped-h)] w-full rounded-b-[8px] rounded-t-[50%] border-t border-white/70 bg-gradient-to-b from-[#F0E8D9] via-[#DED0B8] to-[#C8B79D] shadow-pedestal lg:h-[var(--ped-h-lg)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#products"
          className="hero-cta group mt-9 flex flex-col items-center gap-3 sm:mt-12"
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-editorial text-forest transition-colors duration-300 group-hover:text-forest-soft">
            Discover Our Collection
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 text-forest transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory">
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </a>
      </div>
    </section>
  );
}
