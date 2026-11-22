import Image from "next/image";

/**
 * Renders SVG artwork unoptimised and real product photography through
 * next/image. Swap the `src` in lib/products.ts and everything updates.
 */
export function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 16vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const isVector = src.toLowerCase().endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      width={520}
      height={700}
      sizes={sizes}
      unoptimized={isVector}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={`h-full w-full object-contain ${className}`}
    />
  );
}
