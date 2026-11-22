/**
 * Generates the editable SVG placeholder product renders.
 * These are deliberately abstract studio-style placeholders — not intended to
 * imitate the final Renseoff packaging. Replace /public/products/*.svg with
 * approved transparent product photography when it is available.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/products");
mkdirSync(outDir, { recursive: true });

const wrap = ({ accent, accentSoft, bottle, decor, caption }) => `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="700" viewBox="0 0 520 700" fill="none" role="img" aria-label="Renseoff ${caption} placeholder product render">
  <defs>
    <linearGradient id="body" x1="195" y1="0" x2="325" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="0.28" stop-color="#FDFBF7"/>
      <stop offset="0.68" stop-color="${accentSoft}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.72"/>
    </linearGradient>
    <linearGradient id="cap" x1="230" y1="0" x2="295" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4B554C"/>
      <stop offset="0.45" stop-color="#7D887C"/>
      <stop offset="1" stop-color="#3C473D"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="label" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#FFFDF9"/>
      <stop offset="1" stop-color="#F3EEE5"/>
    </linearGradient>
    <filter id="shadow" x="-60%" y="-200%" width="220%" height="500%">
      <feGaussianBlur stdDeviation="11"/>
    </filter>
    <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#4A4337" flood-opacity="0.16"/>
    </filter>
  </defs>
  <g opacity="0.55">${decor}</g>
  <ellipse cx="260" cy="645" rx="128" ry="15" fill="#5B5142" opacity="0.20" filter="url(#shadow)"/>
  <g filter="url(#softShadow)">${bottle}</g>
</svg>
`;

const label = (x, y, w, h, name, accent) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="url(#label)" stroke="${accent}" stroke-opacity="0.22"/>
    <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="4" stroke="${accent}" stroke-opacity="0.28"/>
    <text x="${x + w / 2}" y="${y + h * 0.36}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" letter-spacing="3.4" fill="#1F4032">RENSEOFF</text>
    <line x1="${x + w * 0.28}" y1="${y + h * 0.45}" x2="${x + w * 0.72}" y2="${y + h * 0.45}" stroke="${accent}" stroke-opacity="0.45"/>
    <text x="${x + w / 2}" y="${y + h * 0.57}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" letter-spacing="2.1" fill="#555C52">${name}</text>
    <text x="${x + w / 2}" y="${y + h * 0.72}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="6.5" letter-spacing="1.8" fill="#8B8F85">HOME ESSENTIALS</text>`;

const gloss = (x, y, w, h, rx) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="url(#gloss)" opacity="0.62"/>`;

const citrus = `
  <circle cx="128" cy="360" r="58" fill="#F4D98D" opacity="0.35"/>
  <path d="M128 302a58 58 0 0 1 0 116z" fill="#F7E3B2" opacity="0.55"/>
  <path d="M128 360l41-41M128 360l-41 41M128 360l41 41M128 360l-41-41" stroke="#D8B765" stroke-width="2.5" opacity="0.6"/>
  <circle cx="395" cy="500" r="42" fill="#F4D98D" opacity="0.3"/>`;

const botanical = `
  <path d="M112 550c40-95 70-150 105-205M130 470c-36-18-52-46-49-78 33 6 54 32 58 65M155 420c-4-40 12-72 42-88 6 37-10 69-37 86" stroke="#8C7CAF" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
  <path d="M400 250c-12 72-15 125-9 190M392 320c30-18 58-16 78 3-26 22-55 22-79-3" stroke="#8C7CAF" stroke-width="4" stroke-linecap="round" opacity="0.45"/>`;

const bubbles = `
  <circle cx="120" cy="300" r="17" stroke="#D8A8AA" stroke-width="2" opacity="0.7"/>
  <circle cx="151" cy="250" r="10" stroke="#D8A8AA" stroke-width="2" opacity="0.6"/>
  <circle cx="107" cy="232" r="6" stroke="#D8A8AA" stroke-width="2" opacity="0.6"/>
  <circle cx="400" cy="390" r="23" stroke="#D8A8AA" stroke-width="2" opacity="0.55"/>
  <circle cx="427" cy="330" r="12" stroke="#D8A8AA" stroke-width="2" opacity="0.5"/>
  <circle cx="390" cy="470" r="9" stroke="#D8A8AA" stroke-width="2" opacity="0.5"/>`;

const droplets = `
  <path d="M116 280c0 0-21 27-21 42a21 21 0 0 0 42 0c0-15-21-42-21-42z" fill="#A8C9E2" opacity="0.55"/>
  <path d="M402 230c0 0-16 21-16 33a16 16 0 0 0 32 0c0-12-16-33-16-33z" fill="#A8C9E2" opacity="0.5"/>
  <path d="M425 470c0 0-19 25-19 38a19 19 0 0 0 38 0c0-13-19-38-19-38z" fill="#A8C9E2" opacity="0.45"/>
  <path d="M112 500c-30 34-38 67-26 101M410 540c22 30 28 60 17 88" stroke="#A8C9E2" stroke-width="3" opacity="0.4"/>`;

const fresh = `
  <path d="M120 300c-14 68-8 128 18 180M120 350c-35-8-54-31-55-64 34 5 55 29 55 64M132 420c33-13 54-39 57-74-32 8-54 34-57 74" stroke="#89A68E" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
  <circle cx="410" cy="300" r="9" fill="#A8C6AC" opacity="0.6"/>
  <circle cx="428" cy="340" r="5" fill="#A8C6AC" opacity="0.5"/>`;

const petals = `
  <g opacity="0.8">
    <ellipse cx="112" cy="300" rx="18" ry="40" fill="#D9C4A4" opacity="0.45" transform="rotate(-28 112 300)"/>
    <ellipse cx="146" cy="340" rx="18" ry="40" fill="#E5D3B8" opacity="0.45" transform="rotate(22 146 340)"/>
    <ellipse cx="405" cy="470" rx="16" ry="36" fill="#D9C4A4" opacity="0.4" transform="rotate(32 405 470)"/>
  </g>
  <path d="M96 420c34-20 62-20 88 2M405 250c-22 34-24 64-6 94" stroke="#B69A76" stroke-width="3" opacity="0.45"/>`;

const amber = `
  <path d="M110 520c38-10 64-34 76-72M118 480c-30-14-43-40-36-70 30 12 45 38 44 70" stroke="#B87F6C" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
  <ellipse cx="404" cy="280" rx="17" ry="40" fill="#D8A99A" opacity="0.4" transform="rotate(28 404 280)"/>
  <ellipse cx="424" cy="330" rx="14" ry="32" fill="#E3B7A8" opacity="0.4" transform="rotate(-20 424 330)"/>
  <circle cx="122" cy="240" r="6" fill="#B87F6C" opacity="0.5"/>`;

const products = [
  {
    file: "dishwash.svg",
    caption: "Dishwash Liquid",
    accent: "#C79A3C",
    accentSoft: "#F7E9C9",
    decor: citrus,
    bottle: `
      <rect x="238" y="176" width="44" height="42" rx="9" fill="url(#cap)"/>
      <rect x="246" y="212" width="28" height="18" rx="4" fill="#E5D9C2"/>
      <path d="M212 258c0-22 14-32 32-36h32c18 4 32 14 32 36l7 344c0 12-8 20-20 20H225c-12 0-20-8-20-20z" fill="url(#body)" stroke="#D8C9AC" stroke-opacity="0.7"/>
      <path d="M204 470h112l3 130c0 12-8 22-20 22H221c-12 0-20-10-20-22z" fill="#F2D792" opacity="0.55"/>
      ${gloss(222, 250, 13, 340, 6)}
      ${label(214, 372, 92, 148, "DISHWASH", "#C79A3C")}`,
  },
  {
    file: "floor-cleaner.svg",
    caption: "Floor Cleaner",
    accent: "#8C7CAF",
    accentSoft: "#EDE7F6",
    decor: botanical,
    bottle: `
      <rect x="237" y="188" width="46" height="62" rx="9" fill="url(#cap)"/>
      <rect x="245" y="244" width="30" height="20" rx="4" fill="#DED5E9"/>
      <path d="M322 300h26c20 0 32 14 32 34v62c0 20-12 34-32 34h-26" stroke="#CDBFDF" stroke-width="17" stroke-linecap="round" fill="none"/>
      <rect x="194" y="258" width="132" height="358" rx="24" fill="url(#body)" stroke="#CFC3DE" stroke-opacity="0.75"/>
      <path d="M206 470h108l2 128c0 12-9 18-20 18H224c-11 0-20-6-20-18z" fill="#C6B6DC" opacity="0.5"/>
      ${gloss(210, 272, 14, 320, 7)}
      ${label(211, 360, 98, 152, "FLOOR CLEANER", "#8C7CAF")}`,
  },
  {
    file: "handwash.svg",
    caption: "Handwash",
    accent: "#C98F91",
    accentSoft: "#F8E6E4",
    decor: bubbles,
    bottle: `
      <path d="M250 164h42v16h-42z" fill="url(#cap)"/>
      <path d="M250 164h-34c-6 0-10 4-10 10v8h44z" fill="#5C665B"/>
      <rect x="250" y="178" width="42" height="34" rx="6" fill="url(#cap)"/>
      <rect x="245" y="206" width="52" height="24" rx="6" fill="#EADCD9"/>
      <path d="M205 280c0-30 20-48 48-52h14c28 4 48 22 48 52v304c0 14-10 24-24 24H229c-14 0-24-10-24-24z" fill="url(#body)" stroke="#E0C6C4" stroke-opacity="0.8"/>
      <path d="M210 480h100l2 100c0 14-9 24-23 24H231c-14 0-23-10-23-24z" fill="#EFC3C0" opacity="0.5"/>
      ${gloss(220, 268, 14, 330, 7)}
      ${label(214, 370, 92, 150, "HANDWASH", "#C98F91")}`,
  },
  {
    file: "liquid-detergent.svg",
    caption: "Liquid Detergent",
    accent: "#7FA6C3",
    accentSoft: "#E5EFF7",
    decor: droplets,
    bottle: `
      <rect x="244" y="196" width="36" height="50" rx="8" fill="url(#cap)"/>
      <rect x="236" y="240" width="52" height="18" rx="5" fill="#DCE8F0"/>
      <path d="M332 292h24c18 0 28 12 28 30v62c0 18-10 30-28 30h-24" stroke="#C6DCEC" stroke-width="16" stroke-linecap="round" fill="none"/>
      <path d="M184 288c0-22 16-34 38-38h76c22 4 38 16 38 38v322c0 14-10 24-24 24H208c-14 0-24-10-24-24z" fill="url(#body)" stroke="#BFD4E4" stroke-opacity="0.8"/>
      <path d="M188 480h144l2 126c0 14-9 24-23 24H211c-14 0-23-10-23-24z" fill="#BBD9EE" opacity="0.5"/>
      ${gloss(202, 284, 16, 330, 8)}
      ${label(204, 368, 112, 152, "LIQUID DETERGENT", "#7FA6C3")}`,
  },
  {
    file: "toilet-cleaner.svg",
    caption: "Toilet Cleaner",
    accent: "#89A68E",
    accentSoft: "#E8F0E8",
    decor: fresh,
    bottle: `
      <rect x="234" y="158" width="52" height="34" rx="8" fill="url(#cap)"/>
      <rect x="244" y="188" width="32" height="82" rx="8" fill="#DFE8DE"/>
      <path d="M214 268c0-14 10-22 24-22h44c14 0 24 8 24 22v344c0 14-10 22-24 22h-44c-14 0-24-8-24-22z" fill="url(#body)" stroke="#C7D8C8" stroke-opacity="0.8"/>
      <path d="M218 482h84l2 128c0 12-8 22-22 22h-44c-14 0-22-10-22-22z" fill="#C3DAC5" opacity="0.55"/>
      ${gloss(226, 262, 13, 340, 6)}
      ${label(215, 366, 90, 154, "TOILET CLEANER", "#89A68E")}`,
  },
  {
    file: "air-freshener-1.svg",
    caption: "Air Freshener Type 1",
    accent: "#B69A76",
    accentSoft: "#F1E9DB",
    decor: petals,
    bottle: `
      <path d="M248 148h26v-18h30v26l-8 20h-48z" fill="url(#cap)"/>
      <rect x="240" y="176" width="60" height="26" rx="7" fill="#6B7367"/>
      <path d="M226 202c0-12 10-20 22-20h26c12 0 22 8 22 20v398c0 16-10 26-26 26h-18c-16 0-26-10-26-26z" fill="url(#body)" stroke="#D8C8AE" stroke-opacity="0.8"/>
      <path d="M228 200h68v34h-68z" fill="#C8B295" opacity="0.55"/>
      ${gloss(238, 216, 12, 370, 6)}
      ${label(218, 360, 84, 164, "AIR FRESHENER I", "#B69A76")}`,
  },
  {
    file: "air-freshener-2.svg",
    caption: "Air Freshener Type 2",
    accent: "#B87F6C",
    accentSoft: "#F5E3DA",
    decor: amber,
    bottle: `
      <rect x="244" y="150" width="34" height="30" rx="7" fill="url(#cap)"/>
      <rect x="238" y="176" width="46" height="34" rx="8" fill="#6A5B52"/>
      <path d="M220 222c0-18 12-28 28-30h24c16 2 28 12 28 30v376c0 16-10 26-26 26h-28c-16 0-26-10-26-26z" fill="url(#body)" stroke="#E0BFB1" stroke-opacity="0.8"/>
      <path d="M222 222h76v30h-76z" fill="#D8A99A" opacity="0.5"/>
      ${gloss(232, 238, 12, 370, 6)}
      ${label(220, 362, 80, 162, "AIR FRESHENER II", "#B87F6C")}`,
  },
];

for (const product of products) {
  const svg = wrap(product);
  writeFileSync(resolve(outDir, product.file), svg, "utf8");
  console.log(`created public/products/${product.file}`);
}
