"use client";

import { useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { OrderControls } from "@/components/OrderControls";
import { ProductImage } from "@/components/ProductImage";
import { ProductModel } from "@/components/ProductModel";
import { VariantSelector } from "@/components/VariantSelector";
import {
  productImageForSize,
  resolveVariant,
  type Product,
  type ShowcaseProduct,
} from "@/lib/products";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";

function Decor({ product }: { product: Product }) {
  const color = product.theme.accent;

  switch (product.decor) {
    case "citrus":
      return (
        <>
          <span className="decor-orb absolute left-[8%] top-[16%] h-24 w-24 rounded-full border border-current opacity-20 sm:h-32 sm:w-32" style={{ color }} />
          <span className="decor-orb absolute right-[12%] top-[28%] h-16 w-16 rounded-full opacity-50 blur-[1px] sm:h-20 sm:w-20" style={{ background: color }} />
        </>
      );
    case "botanical":
      return (
        <>
          <span className="decor-orb absolute -left-2 bottom-[20%] h-40 w-20 rotate-[28deg] rounded-[80%_20%_70%_30%] opacity-40 sm:h-52" style={{ background: color }} />
          <span className="decor-orb absolute right-[6%] top-[14%] h-32 w-16 -rotate-[22deg] rounded-[60%_40%_70%_30%] opacity-30 sm:h-40" style={{ background: color }} />
        </>
      );
    case "bubbles":
      return (
        <>
          {[70, 42, 26, 18].map((size, index) => (
            <span
              key={size}
              className="decor-orb absolute rounded-full border opacity-60"
              style={{
                width: size,
                height: size,
                borderColor: color,
                left: `${12 + index * 18}%`,
                top: `${18 + (index % 2) * 22}%`,
                animationDelay: `${index * 0.6}s`,
              }}
            />
          ))}
        </>
      );
    case "droplets":
      return (
        <>
          <span className="decor-orb absolute left-[10%] top-[22%] h-16 w-10 rotate-12 rounded-[60%_60%_60%_0] opacity-40" style={{ background: color }} />
          <span className="decor-orb absolute right-[14%] bottom-[26%] h-20 w-12 -rotate-[18deg] rounded-[60%_60%_0_60] opacity-35" style={{ background: color }} />
        </>
      );
    case "fresh":
      return (
        <>
          <span className="decor-orb absolute left-[8%] bottom-[24%] h-36 w-16 rotate-[24deg] rounded-[70%_30%_60%_40%] opacity-35" style={{ background: color }} />
          <span className="decor-orb absolute right-[10%] top-[20%] h-24 w-24 rounded-full border opacity-40" style={{ borderColor: color }} />
        </>
      );
    case "petals":
      return (
        <>
          <span className="decor-orb absolute left-[12%] top-[18%] h-28 w-14 rotate-[38deg] rounded-[80%_20%_70%_30%] opacity-40" style={{ background: color }} />
          <span className="decor-orb absolute right-[12%] bottom-[22%] h-24 w-12 -rotate-[28deg] rounded-[70%_30%_60%_40%] opacity-35" style={{ background: color }} />
        </>
      );
    case "amber":
      return (
        <>
          <span className="decor-orb absolute left-[10%] top-[24%] h-28 w-28 rounded-full opacity-25 blur-2xl" style={{ background: color }} />
          <span className="decor-orb absolute right-[8%] bottom-[18%] h-32 w-16 rotate-[32deg] rounded-[80%_20%_60%_40%] opacity-40" style={{ background: color }} />
        </>
      );
  }
}

export function ProductSection({
  product,
  index,
}: {
  product: ShowcaseProduct;
  index: number;
}) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeVariantId, setActiveVariantId] = useState(
    product.variants?.[0]?.id ?? "",
  );
  const activeProduct = resolveVariant(product, activeVariantId);
  const [selectedSize, setSelectedSize] = useState(
    activeProduct.sizes[0] ?? "",
  );
  const displayProduct: Product = {
    ...activeProduct,
    image: productImageForSize(activeProduct, selectedSize),
  };
  const showIngredients = Boolean(activeProduct.ingredients?.length);
  const detailItems = showIngredients
    ? activeProduct.ingredients ?? []
    : activeProduct.benefits;

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;

    // Keep the bottle still on mobile — the parallax float is desktop-only.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      timeline
        .fromTo(
          ".product-float",
          {
            yPercent: isDesktop ? 15 : 0,
            scale: isDesktop ? 0.9 : 1,
            rotation: isDesktop ? -5 : 0,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          },
          0,
        )
        .fromTo(
          ".decor-orb",
          { yPercent: 12 },
          { yPercent: -18, duration: 2, ease: "none" },
          0,
        );

      const textAnimation = gsap.fromTo(
        ".reveal-item",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 68%",
            once: true,
          },
        },
      );

      return () => textAnimation.kill();
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id={index === 0 ? "products" : undefined}
      ref={root}
      data-bg={activeProduct.theme.bg}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.72),transparent_62%)]"
      />

      <div className="container-wide relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-16 lg:gap-y-8 xl:gap-x-24">
        {/* Name + intro — first on mobile, top-right on desktop */}
        <div className="max-w-xl text-center lg:col-start-2 lg:row-start-1 lg:mx-auto">
          <p className="reveal-item eyebrow flex items-center justify-center gap-4 lg:justify-start">
            <span className="font-sans text-[0.7rem] tracking-normal text-forest/70">
              {activeProduct.number}
            </span>
            <span className="h-px w-8 bg-forest/30" />
            {activeProduct.category}
          </p>

          <h2 className="reveal-item mt-6 font-display text-[clamp(2.9rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] text-forest">
            {activeProduct.name}
          </h2>

          <p className="reveal-item mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] italic font-light text-forest-soft">
            {activeProduct.tagline}
          </p>

          <p className="reveal-item mt-6 text-sm leading-[1.9] text-muted sm:text-[0.95rem]">
            {activeProduct.description}
          </p>
        </div>

        {/* Product stage — image sits between the intro and the options on mobile */}
        <div className="relative flex h-[380px] items-center justify-center sm:h-[500px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-[640px] xl:h-[700px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[70px]"
            style={{ background: activeProduct.theme.glow, opacity: 0.85 }}
          />
          <Decor product={activeProduct} />

          <div className="product-float relative z-10 h-full w-full max-w-[440px] will-change-transform">
            <ProductImage
              src={displayProduct.image}
              alt={`${activeProduct.name} by Renseoff`}
              priority={index === 0}
              sizes="(max-width: 1024px) 70vw, 34vw"
              className="drop-shadow-[0_45px_35px_rgba(60,52,40,0.22)]"
            />
          </div>

          <ProductModel url={activeProduct.model} />

          <div
            aria-hidden="true"
            className="absolute bottom-[6%] left-1/2 h-4 w-[58%] -translate-x-1/2 rounded-[50%] bg-forest/10 blur-xl"
          />
        </div>

        {/* Variant, sizes, ingredients and ordering */}
        <div className="max-w-xl text-center lg:col-start-2 lg:row-start-2 lg:mx-auto">
          {activeProduct.fragrance && (
            <p className="reveal-item flex items-start justify-center gap-2 text-xs text-muted lg:justify-start">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-soft" strokeWidth={1.7} />
              <span>
                <span className="font-semibold text-forest/80">Variant:</span>{" "}
                {activeProduct.fragrance}
              </span>
            </p>
          )}

          <div className="reveal-item">
            <VariantSelector
              product={product}
              activeId={activeVariantId}
              onChange={setActiveVariantId}
            />
          </div>

          <div className="reveal-item">
            <OrderControls
              product={displayProduct}
              onSizeChange={setSelectedSize}
            >
              {(showIngredients || detailItems.length > 0) && (
                <div className="mt-8 text-left">
                  {showIngredients && (
                    <p className="font-display text-lg italic font-light text-forest">
                      Key Ingredients
                    </p>
                  )}
                  {detailItems.length > 0 && (
                    <div
                      className={`grid gap-3 sm:grid-cols-2 ${
                        showIngredients ? "mt-3" : ""
                      }`}
                    >
                      {detailItems.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white/40 px-4 py-3 backdrop-blur-sm"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-soft"
                            strokeWidth={2}
                          />
                          <span className="text-[0.72rem] leading-relaxed text-ink/75">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </OrderControls>
          </div>
        </div>
      </div>
    </section>
  );
}
