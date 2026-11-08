// Generate the print QR code (SVG + PNG) with the Q shield in the centre.
// Usage: npm run qr -- https://<project>.vercel.app/qr   (see docs/decisions/0006)
import { mkdir, readFile, writeFile } from "node:fs/promises";

import QRCode from "qrcode";
import sharp from "sharp";

const OUTPUT_DIR = "brand/qr";
const SHIELD_PATH = "src/assets/brand/quadrada-shield.png";
const QUIET_ZONE_MODULES = 4;
const MODULE_SIZE = 10;
const LOGO_WIDTH_RATIO = 0.22;
const PNG_SIZE = 2000;
const DARK = "#1c1917";

function buildSvg(modules, shieldBase64, shieldAspect) {
  const count = modules.size;
  const size = (count + QUIET_ZONE_MODULES * 2) * MODULE_SIZE;
  const offset = QUIET_ZONE_MODULES * MODULE_SIZE;

  let path = "";
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (modules.get(row, col)) {
        path += `M${offset + col * MODULE_SIZE} ${offset + row * MODULE_SIZE}h${MODULE_SIZE}v${MODULE_SIZE}h-${MODULE_SIZE}z`;
      }
    }
  }

  const logoWidth = size * LOGO_WIDTH_RATIO;
  const logoHeight = logoWidth / shieldAspect;
  const padding = MODULE_SIZE;
  const plateWidth = logoWidth + padding * 2;
  const plateHeight = logoHeight + padding * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges">
  <rect width="${size}" height="${size}" fill="#ffffff"/>
  <path d="${path}" fill="${DARK}"/>
  <rect x="${(size - plateWidth) / 2}" y="${(size - plateHeight) / 2}" width="${plateWidth}" height="${plateHeight}" rx="${MODULE_SIZE}" fill="#ffffff"/>
  <image href="data:image/png;base64,${shieldBase64}" x="${(size - logoWidth) / 2}" y="${(size - logoHeight) / 2}" width="${logoWidth}" height="${logoHeight}"/>
</svg>
`;
}

async function main() {
  const url = process.argv[2];
  if (!url || !URL.canParse(url)) {
    throw new Error(`expected the QR target URL as first argument, got ${JSON.stringify(url)}`);
  }

  // Level H tolerates ~30% damage, which the centre logo needs.
  const { modules } = QRCode.create(url, { errorCorrectionLevel: "H" });
  const shield = await readFile(SHIELD_PATH);
  const { width, height } = await sharp(shield).metadata();
  const svg = buildSvg(modules, shield.toString("base64"), width / height);

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(`${OUTPUT_DIR}/quadrada-qr.svg`, svg);
  await sharp(Buffer.from(svg), { density: 600 })
    .resize(PNG_SIZE, PNG_SIZE)
    .png()
    .toFile(`${OUTPUT_DIR}/quadrada-qr.png`);
  await writeFile(
    `${OUTPUT_DIR}/README.md`,
    `QR code target: ${url}\n\nRegenerate: npm run qr -- ${url}\n`,
  );
  console.log(`QR code for ${url} written to ${OUTPUT_DIR}/`);
}

await main();
