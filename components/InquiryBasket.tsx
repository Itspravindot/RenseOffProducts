"use client";

import { useEffect } from "react";
import {
  ArrowUpRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useInquiry } from "@/components/InquiryProvider";
import { ProductImage } from "@/components/ProductImage";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { inquiryMessage } from "@/lib/inquiry";
import { whatsappUrl } from "@/lib/whatsapp";

export function InquiryBasket() {
  const { items, note, setNote, remove, setQuantity, clear, isOpen, open, close } =
    useInquiry();

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const message = inquiryMessage(items, note);
  const href = whatsappUrl(message);

  useEffect(() => {
    if (items.length === 0 && isOpen) close();
  }, [items.length, isOpen, close]);

  useEffect(() => {
    if (!isOpen || items.length === 0) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, items.length, close]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-forest/10 bg-ivory/95 backdrop-blur-xl">
        <div className="container-wide flex items-center justify-between gap-3 py-3 sm:gap-6">
          <button
            type="button"
            onClick={open}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1 text-[0.6rem] font-semibold text-forest">
                {items.length}
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-editorial text-forest">
                Your inquiry
              </span>
              <span className="block truncate text-[0.7rem] text-muted">
                {items.length} {items.length === 1 ? "product" : "products"} ·
                {" "}
                {totalUnits} {totalUnits === 1 ? "unit" : "units"}
              </span>
            </span>
          </button>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 px-5 py-3 sm:px-7"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
            <ArrowUpRight className="h-4 w-4 opacity-70" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Your inquiry"
        >
          <button
            type="button"
            aria-label="Close inquiry"
            onClick={close}
            className="absolute inset-0 h-full w-full bg-forest/30 backdrop-blur-sm"
          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-forest/10 px-6 py-6">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2 className="mt-2 font-display text-3xl font-light text-forest">
                  Inquiry list
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Add as many products as you like — we&apos;ll send them together.
                </p>
              </div>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Close inquiry"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest/5"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-forest/10 bg-white/50 p-3"
                  >
                    {item.image && (
                      <div className="h-20 w-16 shrink-0">
                        <ProductImage
                          src={item.image}
                          alt=""
                          sizes="64px"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-lg leading-tight text-forest">
                            {item.name}
                          </p>
                          {item.variant &&
                            !item.name
                              .toLowerCase()
                              .includes(item.variant.toLowerCase()) && (
                              <p className="mt-0.5 text-[0.7rem] text-muted">
                                {item.variant}
                              </p>
                            )}
                          {item.size && (
                            <p className="mt-0.5 text-[0.7rem] text-muted">
                              {item.size}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label={`Remove ${item.name} from inquiry`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-forest/5 hover:text-forest"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
                        </button>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-forest/15 px-2.5 py-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          disabled={item.quantity === 1}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.8} />
                        </button>
                        <span className="min-w-4 text-center text-xs tabular-nums text-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <label
                  htmlFor="inquiry-note"
                  className="eyebrow block"
                >
                  Anything else? (optional)
                </label>
                <textarea
                  id="inquiry-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Tell us what you need..."
                  className="mt-3 w-full resize-none rounded-2xl border border-forest/15 bg-white/60 px-4 py-3 text-sm text-forest outline-none transition-colors placeholder:text-muted focus:border-forest"
                />
              </div>

              <button
                type="button"
                onClick={clear}
                className="mt-6 text-xs text-muted underline decoration-forest/30 underline-offset-4 transition-colors hover:text-forest"
              >
                Clear inquiry
              </button>
            </div>

            <div className="border-t border-forest/10 bg-ivory px-6 py-5">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
                <ArrowUpRight className="h-4 w-4 opacity-70" strokeWidth={1.5} />
              </a>
              <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-muted">
                WhatsApp opens with your full inquiry ready to send — just tap
                send.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
