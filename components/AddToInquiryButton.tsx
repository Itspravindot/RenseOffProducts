"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { useInquiry } from "@/components/InquiryProvider";
import type { Product } from "@/lib/products";

export function AddToInquiryButton({
  product,
  size,
  quantity = 1,
  variant = "full",
}: {
  product: Product;
  size?: string;
  quantity?: number;
  variant?: "full" | "compact";
}) {
  const { add } = useInquiry();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = () => {
    add({
      productId: product.id,
      name: product.name,
      variant: product.fragrance,
      size,
      image: product.image,
      quantity,
    });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Add ${product.name} to inquiry`}
        title={`Add ${product.name} to inquiry`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-forest transition-all duration-500 ease-premium hover:border-forest hover:bg-forest hover:text-ivory"
      >
        {added ? (
          <Check className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Plus className="h-4 w-4" strokeWidth={1.8} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn-secondary w-full sm:w-auto"
    >
      {added ? (
        <Check className="h-4 w-4" strokeWidth={2} />
      ) : (
        <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
      )}
      {added ? "Added to inquiry" : "Add to inquiry"}
    </button>
  );
}
