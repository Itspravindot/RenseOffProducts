import { siteConfig } from "@/lib/site";

/** Build a WhatsApp click-to-chat URL with a pre-filled enquiry message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function orderMessage({
  product,
  variant,
  size,
  quantity = 1,
}: {
  product: string;
  variant?: string;
  size?: string;
  quantity?: number;
}): string {
  const parts = [`Hello Renseoff! I would like to enquire about ${product}`];

  if (variant && !product.toLowerCase().includes(variant.toLowerCase())) {
    parts.push(`in ${variant} variant`);
  }
  if (size) parts.push(`(${size})`);
  if (quantity > 1) parts.push(`(quantity ${quantity})`);

  return `${parts.join(" ")}. Please share availability and ordering details. Thank you!`;
}

export function generalOrderMessage(): string {
  return "Hello Renseoff! I would like to know more about your products and place an order. Please share the available range and details. Thank you!";
}
