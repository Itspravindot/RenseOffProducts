"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { navLinks, siteConfig } from "@/lib/site";
import { generalOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const orderHref = whatsappUrl(generalOrderMessage());

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium ${
        scrolled || open
          ? "border-b border-forest/10 bg-ivory/85 backdrop-blur-xl shadow-[0_10px_34px_-28px_rgba(31,64,50,0.7)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-wide flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <BrandMark priority />

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink/70 transition-colors duration-300 hover:text-forest"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-forest transition-all duration-500 ease-premium group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:bg-forest-deep"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Order on WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors duration-300 hover:bg-forest/5 lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.6} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`overflow-hidden border-t border-forest/10 bg-ivory/95 backdrop-blur-xl transition-[max-height,opacity] duration-700 ease-premium lg:hidden ${
          open ? "max-h-[540px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-wide flex flex-col py-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-forest/10 py-4 font-display text-2xl text-forest transition-colors duration-300 hover:text-forest-soft"
            >
              {link.label}
              <span className="text-[0.6rem] font-sans tracking-editorial text-muted">
                0{index + 1}
              </span>
            </a>
          ))}
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-7 w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <p className="mt-5 text-xs tracking-wide text-muted">
            {siteConfig.name} · {siteConfig.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
