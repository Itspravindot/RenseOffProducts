"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AddToInquiryButton } from "@/components/AddToInquiryButton";
import { ProductImage } from "@/components/ProductImage";
import { VariantSelector } from "@/components/VariantSelector";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  productImageForSize,
  resolveVariant,
  showcaseProducts,
  type ShowcaseProduct,
} from "@/lib/products";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";
import { orderMessage, whatsappUrl } from "@/lib/whatsapp";

function CollectionCard({ product }: { product: ShowcaseProduct }) {
  const [activeVariantId, setActiveVariantId] = useState(
    product.variants?.[0]?.id ?? "",
  );
  const activeProduct = resolveVariant(product, activeVariantId);
  const [selectedSize, setSelectedSize] = useState(
    activeProduct.sizes[0] ?? "",
  );
  const displayProduct = {
    ...activeProduct,
    image: productImageForSize(activeProduct, selectedSize),
  };
  const href = whatsappUrl(
    orderMessage({
      product: activeProduct.name,
      variant: activeProduct.fragrance,
      size: selectedSize,
    }),
  );

  return (
    <article
      className="collection-card group flex min-w-[160px] snap-center flex-col rounded-[26px] border border-forest/10 bg-white/45 p-4 backdrop-blur-sm transition-all duration-700 ease-premium hover:-translate-y-2 hover:border-forest/20 hover:bg-white/75 hover:shadow-card sm:min-w-[200px] lg:min-w-[236px] xl:min-w-[260px]"
    >
      <div
        className="relative flex h-40 items-end justify-center overflow-hidden rounded-[18px] lg:h-44 lg:h-52"
        style={{
          background: `radial-gradient(circle at 50% 70%, ${activeProduct.theme.glow} 0%, rgba(255,255,255,0) 70%)`,
        }}
      >
        <span className="absolute bottom-3 h-2 w-3/4 rounded-[50%] bg-forest/10 blur-md" />
        <div className="relative h-[88%] w-full transition-transform duration-700 ease-premium group-hover:-translate-y-1.5 group-hover:scale-[1.03]">
          <ProductImage
            src={displayProduct.image}
            alt={`${activeProduct.name} by Renseoff`}
            sizes="(max-width: 768px) 160px, 16vw"
          />
        </div>
        <span className="absolute left-3 top-3 font-display text-sm text-forest/70">
          {activeProduct.number}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center text-center">
        <h3 className="font-display text-lg leading-tight text-forest lg:text-xl">
          {activeProduct.name}
        </h3>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {activeProduct.sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-label={`Select ${size} size`}
              aria-pressed={selectedSize === size}
              onClick={() => setSelectedSize(size)}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] transition-colors duration-300 ${
                selectedSize === size
                  ? "border-forest bg-forest/5 text-forest"
                  : "border-forest/15 text-muted hover:border-forest/40 hover:text-forest"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <VariantSelector
          product={product}
          activeId={activeVariantId}
          onChange={setActiveVariantId}
          compact
        />

        <div className="mt-5 flex items-center gap-2">
          <AddToInquiryButton
            product={displayProduct}
            size={selectedSize}
            variant="compact"
          />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${activeProduct.name} on WhatsApp`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-forest transition-all duration-500 ease-premium hover:border-forest hover:bg-forest hover:text-ivory"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Collection() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const start = track.scrollLeft;
    const target = Math.max(
      0,
      Math.min(max, start + direction * track.clientWidth * 0.85),
    );
    if (target === start) return;

    if (reducedMotion) {
      track.scrollLeft = target;
      return;
    }

    track.scrollTo({ left: target, behavior: "smooth" });
    // Some browsers/settings ignore smooth scrolling — make sure we still land.
    window.setTimeout(() => {
      if (Math.abs(track.scrollLeft - target) > 2) track.scrollLeft = target;
    }, 700);
  };

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".collection-card",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="collection"
      ref={root}
      data-bg="#FBF8F2"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-6 font-display text-[clamp(2.8rem,6vw,5rem)] font-light leading-none tracking-[-0.02em] text-forest">
            Our Complete Range
          </h2>
          <p className="section-intro mt-6">
            Everything you need for a cleaner, fresher everyday.
          </p>
          <p className="mt-3 text-xs text-muted">
            Swipe or use the arrows to explore the range. Tap + on any product
            to build one combined inquiry.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            ref={trackRef}
            className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-10 no-scrollbar sm:-mx-10 sm:gap-4 sm:px-10 lg:-mx-16 lg:gap-5 lg:px-16 xl:-mx-20 xl:px-20"
          >
            {showcaseProducts.map((product) => (
              <CollectionCard key={product.id} product={product} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            aria-label="Scroll to previous products"
            className="absolute -left-1 top-[45%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/15 bg-ivory/90 text-forest shadow-[0_10px_30px_-18px_rgba(31,64,50,0.9)] backdrop-blur-sm transition-all duration-500 ease-premium hover:border-forest hover:bg-forest hover:text-ivory sm:flex lg:-left-5"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            aria-label="Scroll to more products"
            className="absolute -right-1 top-[45%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/15 bg-ivory/90 text-forest shadow-[0_10px_30px_-18px_rgba(31,64,50,0.9)] backdrop-blur-sm transition-all duration-500 ease-premium hover:border-forest hover:bg-forest hover:text-ivory sm:flex lg:-right-5"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <p className="flex items-center gap-2 text-xs tracking-wide text-muted">
            Prefer to ask about everything at once?{" "}
            <a
              href={whatsappUrl(
                orderMessage({ product: "the complete Renseoff collection" }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Message us{" "}
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
