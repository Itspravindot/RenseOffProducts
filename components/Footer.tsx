import { Instagram, Mail } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { showcaseProducts } from "@/lib/products";
import { brandInfo, navLinks, siteConfig } from "@/lib/site";
import { generalOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  const orderHref = whatsappUrl(generalOrderMessage());

  return (
    <footer
      id="contact"
      data-bg="#1F4032"
      className="relative overflow-hidden bg-forest text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-ivory/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 h-[520px] w-[520px] rounded-full border border-ivory/10"
      />

      <div className="container-wide relative py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-12">
          <div className="max-w-sm">
            <BrandMark light />
            <p className="mt-7 text-sm leading-[1.9] text-ivory/65">
              {siteConfig.description} A considered collection of everyday home
              essentials, presented with care.
            </p>
            <p className="mt-4 font-display text-lg italic text-ivory/80">
              {brandInfo.tagline}
            </p>
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ivory px-6 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-forest transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:bg-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Order on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-[0.66rem] font-semibold uppercase tracking-editorial text-ivory/60">
              Explore
            </h3>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/75 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.66rem] font-semibold uppercase tracking-editorial text-ivory/60">
              Products
            </h3>
            <ul className="mt-6 space-y-3.5">
              {showcaseProducts.map((product) => (
                <li key={product.id}>
                  <a
                    href={`#products`}
                    className="text-sm text-ivory/75 transition-colors duration-300 hover:text-ivory"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.66rem] font-semibold uppercase tracking-editorial text-ivory/60">
              Contact
            </h3>
            <div className="mt-6 space-y-3.5 text-sm text-ivory/75">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ivory"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                {siteConfig.email}
              </a>
              <a
                href={orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ivory"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp · {siteConfig.whatsappDisplay}
              </a>
              <p className="pt-1 text-xs text-ivory/60">
                {brandInfo.founder.name} · {brandInfo.founder.role}
              </p>
              <div className="flex gap-3 pt-3">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-forest"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center border-t border-ivory/15 pt-10 text-center">
          <p className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light leading-tight text-ivory">
            Renseoff. <span className="italic text-ivory/75">A Cleaner Home.</span> A Better Everyday.
          </p>
          <p className="mt-6 text-[0.68rem] tracking-wide text-ivory/60">
            © {new Date().getFullYear()} Renseoff. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
