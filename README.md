# Renseoff — Luxury Minimalist Product Showcase

An immersive, scroll-driven Next.js showcase for Renseoff home essentials. Visitors move from a cinematic hero with seven bottles through nine product stories, the complete collection, WhatsApp ordering, reviews, FAQ and a premium footer. The two air fresheners are grouped into one selectable product with a Candy / Gucci Flora switch and a fixed 200ML size. Three additional 5L-only products (White Phenyl, Car Wash Shampoo and Glass Cleaner) were added with their supplied photography and image-derived copy. Shoppers can also add multiple products to a persistent inquiry list, adjust quantities, leave a note, and send one pre-filled WhatsApp message containing everything they selected.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build: `npm run build && npm run start`.

## Configure the business details

Everything editable lives in two files:

- `lib/site.ts` — WhatsApp number, email, social links, navigation, FAQ copy, and the brand story/about content.
- `lib/products.ts` — the seven hero products, three additional 5L-only products, and `showcaseProducts`, which groups the two air fresheners into one selectable variant product. Copy, sizes, benefits, images and theme colours all live here. Core products offer 500ML and 5L with size-specific photography; air fresheners offer 200ML; the additional products offer 5L only.

WhatsApp number options:

1. Edit `whatsappNumber` in `lib/site.ts`, or
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, country code included).

The configured number is **+91 93214 41464** (`919321441464` in `wa.me` links). Every single-product order link uses the same `whatsappUrl()` / `orderMessage()` helpers in `lib/whatsapp.ts`, so product name, size and quantity are automatically included in the pre-filled message.

For multi-product inquiries, `lib/inquiry.ts` builds one message with every selected product, variant, quantity and optional note. `components/InquiryProvider.tsx` stores the inquiry in `localStorage`, `components/AddToInquiryButton.tsx` adds products from the product stories and collection cards, and `components/InquiryBasket.tsx` provides the review drawer and final WhatsApp CTA. The floating WhatsApp button also sends the combined inquiry whenever items are in the list.

## Product imagery

The seven supplied product photos are in `public/products/` as transparent PNGs (originals are never modified). `scripts/normalize_product_images.py` crops each photo to its subject and creates consistently framed transparent WebP files in `public/products/optimized/`, which is what the site displays.

If new photos are supplied:

1. Replace the files in `public/products/` (keep the same filenames listed in the script's `MAPPING`).
2. Run `python3 scripts/normalize_product_images.py`.

`scripts/adopt-product-images.mjs` can map newly named files into `lib/products.ts` automatically. `ProductImage` optimises raster files with `next/image`; the SVG files in `public/products/*.svg` remain as a fallback reference.

## Brand logo

The supplied wordmark is stored at `public/brand/renseoff-logo.svg` and is used by `components/BrandMark.tsx` in the sticky navigation and footer. A cropped, square version is at `app/icon.svg` for the browser tab icon. Replace those files if a new logo is supplied.

## Future GLB models

When approved 3D files are available, add `model: "/models/name.glb"` to a product in `lib/products.ts`. `ProductSection` will then mount the lazy-loaded React Three Fiber stage (`components/ProductModel.tsx` → `components/three/ModelCanvas.tsx`) instead of the flat image. Until then the site uses transparent product images with layered lighting and shadows — it never pretends a flat image is a 3D model.

`components/Ambient3D.tsx` adds a very light WebGL dust layer on desktop only. It is disabled for reduced-motion users and is purely decorative.

## Content sources

Product descriptions, ingredient lists, sizes and customer reviews come from the information supplied by Renseoff. The product photography in `public/products/` is the supplied packaging photography. Update `lib/products.ts` and `components/Reviews.tsx` when new approved details are provided.

## Structure

```
app/                    App Router entry, fonts, global styles
components/             Navbar, Hero, ProductSection, Collection, FAQ, etc.
components/three/       Lazy-loaded React Three Fiber scenes
lib/                    Product data, site config, WhatsApp helpers, motion
public/products/        Supplied product photography
scripts/                Regenerates optimised product images
```

## Checks before launch

```bash
npm run typecheck
npm run build
```

Then verify in the browser: all anchor navigation, every WhatsApp button (correct number and pre-filled message), mobile hamburger menu, collection carousel, FAQ accordion, scroll animations and reduced-motion behaviour.
