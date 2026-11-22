/**
 * Finds real product photos dropped into public/products and updates the
 * `image` paths in lib/products.ts. Keeps the SVG placeholder when no match
 * is found, so the site never breaks while files are being added.
 *
 * Usage: node scripts/adopt-product-images.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = resolve(root, "public/products");
const productsFile = resolve(root, "lib/products.ts");
const rasterExt = /\.(png|jpe?g|webp|avif)$/i;

const aliases = [
  { id: "dishwash", terms: ["dishwash", "dish", "washingup"] },
  { id: "floor-cleaner", terms: ["floorcleaner", "floor"] },
  { id: "handwash", terms: ["handwash", "hand"] },
  { id: "liquid-detergent", terms: ["liquiddetergent", "detergent"] },
  { id: "toilet-cleaner", terms: ["toiletcleaner", "toilet"] },
  { id: "air-freshener-1", terms: ["airfreshener1", "airfreshner1", "airfreshenertype1", "air1", "freshener1"] },
  { id: "air-freshener-2", terms: ["airfreshener2", "airfreshner2", "airfreshenertype2", "air2", "freshener2"] },
];

const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

const files = readdirSync(imageDir)
  .filter((file) => rasterExt.test(file))
  .map((file) => ({ file, key: normalize(file.replace(rasterExt, "")) }));

let source = readFileSync(productsFile, "utf8");
const used = new Set();
const report = [];

for (const product of aliases) {
  const candidates = files.filter(
    ({ key, file }) =>
      !used.has(file) &&
      product.terms.some((term) => key.includes(normalize(term))),
  );

  // For the two air fresheners, prefer an explicit number and avoid stealing
  // a generic "air freshener" file from the other variant.
  const match =
    candidates.find(({ key }) => /\d/.test(key)) ?? candidates[0];

  if (!match) {
    report.push(`${product.id}: kept SVG placeholder (no photo found)`);
    continue;
  }

  used.add(match.file);
  const idIndex = source.indexOf(`id: "${product.id}"`);
  if (idIndex === -1) {
    report.push(`${product.id}: product entry not found in lib/products.ts`);
    continue;
  }

  const imageIndex = source.indexOf('image: "', idIndex);
  const valueStart = imageIndex + 'image: "'.length;
  const valueEnd = source.indexOf('"', valueStart);
  if (imageIndex === -1 || valueEnd === -1) {
    report.push(`${product.id}: image field not found`);
    continue;
  }

  source =
    source.slice(0, imageIndex) +
    `image: "/products/${match.file}"` +
    source.slice(valueEnd + 1);
  report.push(`${product.id}: /products/${match.file}`);
}

writeFileSync(productsFile, source, "utf8");
console.log(report.join("\n"));

const unused = files.filter(({ file }) => !used.has(file)).map(({ file }) => file);
if (unused.length) {
  console.log(`\nUnmatched files: ${unused.join(", ")}`);
}
