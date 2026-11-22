"use client";

import { useInquiry } from "@/components/InquiryProvider";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { inquiryMessage } from "@/lib/inquiry";
import { generalOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const { items, note } = useInquiry();
  const hasItems = items.length > 0;
  const tooltip = hasItems ? "Order selected products" : "Chat to order";
  const message = hasItems
    ? inquiryMessage(items, note)
    : generalOrderMessage();

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tooltip} on WhatsApp`}
      className={`group fixed right-5 z-40 transition-all duration-500 ease-premium sm:right-8 ${
        hasItems ? "bottom-24 sm:bottom-28" : "bottom-5 sm:bottom-8"
      }`}
    >
      <span
        aria-hidden="true"
        className="animate-ring absolute inset-0 rounded-full bg-sage/50"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_18px_40px_-16px_rgba(31,64,50,0.9)] transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:bg-forest-deep sm:h-16 sm:w-16">
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        {hasItems && (
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-sage px-1 text-[0.65rem] font-semibold text-forest">
            {items.length}
          </span>
        )}
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-ivory px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-forest opacity-0 shadow-lg transition-all duration-500 ease-premium group-hover:translate-x-0 group-hover:opacity-100">
        {tooltip}
      </span>
    </a>
  );
}
