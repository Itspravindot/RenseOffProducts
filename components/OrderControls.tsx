"use client";

import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { AddToInquiryButton } from "@/components/AddToInquiryButton";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import type { Product } from "@/lib/products";
import { orderMessage, whatsappUrl } from "@/lib/whatsapp";

export function OrderControls({
  product,
  label = "Order on WhatsApp",
  onSizeChange,
}: {
  product: Product;
  label?: string;
  onSizeChange?: (size: string) => void;
}) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const href = whatsappUrl(
    orderMessage({
      product: product.name,
      variant: product.fragrance,
      size,
      quantity,
    }),
  );

  return (
    <div className="mt-9">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Available sizes</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                setSize(option);
                onSizeChange?.(option);
              }}
                aria-pressed={size === option}
                className={`rounded-full border px-4 py-2 text-[0.68rem] tracking-wide transition-all duration-400 ease-premium ${
                  size === option
                    ? "border-forest bg-forest/5 text-forest"
                    : "border-forest/15 text-muted hover:border-forest/40 hover:text-forest"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Quantity</p>
          <div className="inline-flex items-center gap-4 rounded-full border border-forest/15 px-3 py-1.5">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 disabled:opacity-30"
              disabled={quantity === 1}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
            <span className="min-w-4 text-center text-sm tabular-nums text-forest">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(99, value + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {label}
          <ArrowUpRight className="h-4 w-4 opacity-70" strokeWidth={1.5} />
        </a>
        <AddToInquiryButton
          product={product}
          size={size}
          quantity={quantity}
        />
      </div>
    </div>
  );
}
