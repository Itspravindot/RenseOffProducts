import Image from "next/image";

/**
 * The supplied Renseoff wordmark is the single source of truth for the brand
 * mark. It is used in the sticky navigation and in the footer.
 */
export function BrandMark({
  light = false,
  compact = false,
  priority = false,
}: {
  light?: boolean;
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <a
      href="#home"
      className="group relative inline-flex items-center"
      aria-label="Renseoff — back to top"
    >
      <span
        className={`relative block transition-transform duration-700 ease-premium group-hover:scale-[1.03] ${
          light ? "drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]" : ""
        }`}
      >
        <Image
          src="/brand/renseoff-logo.svg"
          alt="Renseoff"
          width={647}
          height={140}
          unoptimized
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={`${compact ? "h-7" : "h-8 sm:h-9"} w-auto object-contain`}
        />
      </span>
    </a>
  );
}
