"use client";

import type { ShowcaseProduct } from "@/lib/products";

export function VariantSelector({
  product,
  activeId,
  onChange,
  compact = false,
}: {
  product: ShowcaseProduct;
  activeId: string;
  onChange: (id: string) => void;
  compact?: boolean;
}) {
  if (!product.variants?.length) return null;

  const shortName = (name: string) => name.replace(/^Air freshener\s+/i, "");

  if (compact) {
    return (
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            aria-label={`View ${variant.name}`}
            aria-pressed={activeId === variant.id}
            onClick={() => onChange(variant.id)}
            className={`rounded-full border px-2.5 py-1 text-[0.6rem] transition-colors duration-300 ${
              activeId === variant.id
                ? "border-forest bg-forest text-ivory"
                : "border-forest/15 text-muted hover:border-forest/40 hover:text-forest"
            }`}
          >
            {shortName(variant.name)}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="eyebrow mb-3">Choose your variant</p>
      <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            aria-label={`View ${variant.name}`}
            aria-pressed={activeId === variant.id}
            onClick={() => onChange(variant.id)}
            className={`rounded-full border px-4 py-2 text-[0.68rem] tracking-wide transition-all duration-400 ease-premium ${
              activeId === variant.id
                ? "border-forest bg-forest/5 text-forest"
                : "border-forest/15 text-muted hover:border-forest/40 hover:text-forest"
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
}
