#!/usr/bin/env python3
"""Create consistently framed transparent WebP copies of the supplied product photos.

Originals in public/products/ are never modified. Each rendered product is
cropped to its alpha bounds and centred on the same 3:4 transparent canvas,
so every bottle appears at a comparable scale throughout the site.
The corresponding `image` paths in lib/products.ts are updated automatically
for the main (500ML / 200ML) photos. Size-specific 5L photos are exported as
extra WebP files without replacing the main product photo.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public" / "products"
OUT = SOURCE / "optimized"
CONFIG = ROOT / "lib" / "products.ts"

MAPPING = {
    "dishwash": "Dishwash.png",
    "floor-cleaner": "FLoorCLeaner.png",
    "handwash": "Handwash.png",
    "liquid-detergent": "LiquidDetergent.png",
    "toilet-cleaner": "Toiletcleaner.png",
    "air-freshener-1": "AirFreshner1.png",
    "air-freshener-2": "AirFreshner2.png",
    "car-wash-shampoo": "CarWashShampoo-cutout.png",
    "glass-cleaner": "GlassCleaner-cutout.png",
}

SIZE_MAPPING = {
    "dishwash-5l": "Dishwash-5L.png",
    "floor-cleaner-5l": "FloorCleaner-5L.png",
    "handwash-5l": "HandCleaner-5L.png",
    "liquid-detergent-5l": "LiquidDetergent-5L.png",
    "toilet-cleaner-5l": "ToiletCleaner-5L.png",
}

CANVAS_W, CANVAS_H = 900, 1200
CONTENT_W, CONTENT_H = 760, 1080  # transparent breathing room around the product

OUT.mkdir(parents=True, exist_ok=True)
source = CONFIG.read_text(encoding="utf-8")


def normalize(product_id: str, filename: str, alpha_threshold: int = 0) -> None:
    path = SOURCE / filename
    if not path.exists():
        print(f"skip {product_id}: missing {filename}")
        return

    image = Image.open(path).convert("RGBA")
    alpha = image.getchannel("A")

    if alpha_threshold:
        mask = alpha.point(lambda value: 255 if value > alpha_threshold else 0)
        bbox = mask.getbbox()
        image.putalpha(
            alpha.point(lambda value: 0 if value <= alpha_threshold else value)
        )
    else:
        bbox = alpha.getbbox()

    if not bbox:
        print(f"skip {product_id}: fully transparent")
        return

    product = image.crop(bbox)
    scale = min(CONTENT_W / product.width, CONTENT_H / product.height)
    new_size = (
        max(1, round(product.width * scale)),
        max(1, round(product.height * scale)),
    )
    product = product.resize(new_size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    canvas.paste(
        product,
        ((CANVAS_W - new_size[0]) // 2, (CANVAS_H - new_size[1]) // 2),
    )

    out_path = OUT / f"{product_id}.webp"
    canvas.save(out_path, "WEBP", quality=92, method=6)
    print(
        f"{product_id}: {out_path.relative_to(ROOT)} "
        f"({new_size[0]}x{new_size[1]} content)"
    )


for product_id, filename in MAPPING.items():
    normalize(product_id, filename)

    id_index = source.find(f'id: "{product_id}"')
    image_index = source.find('image: "', id_index)
    value_start = image_index + len('image: "')
    value_end = source.find('"', value_start)
    if id_index != -1 and image_index != -1 and value_end != -1:
        source = (
            source[:image_index]
            + f'image: "/products/optimized/{product_id}.webp"'
            + source[value_end + 1:]
        )

for product_id, filename in SIZE_MAPPING.items():
    normalize(product_id, filename, alpha_threshold=8)

CONFIG.write_text(source, encoding="utf-8")
