export type InquiryItem = {
  id: string;
  productId: string;
  name: string;
  variant?: string;
  size?: string;
  image?: string;
  quantity: number;
};

/** Build one WhatsApp message containing every product in the inquiry. */
export function inquiryMessage(items: InquiryItem[], note = ""): string {
  const lines = [
    "Hello Renseoff! I would like to enquire about the following products:",
    "",
  ];

  items.forEach((item, index) => {
    const details = [item.name];
    if (
      item.variant &&
      !item.name.toLowerCase().includes(item.variant.toLowerCase())
    ) {
      details.push(`(${item.variant} variant)`);
    }
    if (item.size) details.push(`in ${item.size}`);
    if (item.quantity > 1) details.push(`(quantity ${item.quantity})`);
    lines.push(`${index + 1}. ${details.join(" ")}`);
  });

  lines.push("");
  if (note.trim()) lines.push(`Additional note: ${note.trim()}`, "");
  lines.push("Please share availability and ordering details. Thank you!");

  return lines.join("\n");
}
