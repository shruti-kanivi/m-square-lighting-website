/*
Generates client/public/catalogue.json from docs/DIMENSION.xlsx and copies images to client/public/catalogue-images/

The Excel has a vertical structure where each model spans multiple rows with specs in columns __EMPTY (label) and __EMPTY_1 (value).

Usage:
  node scripts/generate-catalogue.js

Requires:
  npm i -D xlsx fs-extra
*/

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const XLSX = require('xlsx');

const ROOT = path.resolve(__dirname, '..');
const XLSX_PATH = path.join(ROOT, 'docs', 'DIMENSION.xlsx');
const IMAGES_SRC = path.join(ROOT, 'docs', 'images');
const PUBLIC_DIR = path.join(ROOT, 'client', 'public');
const IMAGES_DST = path.join(PUBLIC_DIR, 'catalogue-images');
const OUTPUT_JSON = path.join(PUBLIC_DIR, 'catalogue.json');

async function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    throw new Error(`Excel not found at ${XLSX_PATH}`);
  }

  const wb = XLSX.readFile(XLSX_PATH, { cellDates: false });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { raw: false, defval: '' });

  if (!rows.length) {
    await fse.ensureDir(PUBLIC_DIR);
    await fse.writeJson(OUTPUT_JSON, [], { spaces: 2 });
    console.log('No rows found. Wrote empty catalogue.json');
    return;
  }

  // Parse vertical structure: group rows by model
  const models = [];
  let currentModel = null;

  for (const row of rows) {
    const modelName = (row['Model Name'] || '').trim();
    const image = (row['Image'] || '').trim();
    const specLabel = (row['__EMPTY'] || '').trim().toUpperCase();
    const specValue = (row['__EMPTY_1'] || '').trim();

    // Start new model when Model Name is not empty
    if (modelName) {
      currentModel = {
        MODEL: modelName,
        IMAGE_NAME: image || undefined
      };
      models.push(currentModel);
    }

    // Add spec to current model
    if (currentModel && specLabel && specValue) {
      if (specLabel === 'WATTAGE' || specLabel === 'WATT') {
        currentModel.WATTAGE = specValue;
      } else if (specLabel === 'DIAMETER' || specLabel === 'DIA') {
        currentModel.DIAMETER = specValue;
      } else if (specLabel === 'HEIGHT' || specLabel === 'HT') {
        currentModel.HEIGHT = specValue;
      } else if (specLabel === 'CUTOUT' || specLabel === 'CUT OUT') {
        currentModel.CUTOUT = specValue;
      }
    }
  }

  // Filter out models with no name
  const validModels = models.filter(m => m.MODEL);

  // Ensure public dirs
  await fse.ensureDir(PUBLIC_DIR);
  await fse.ensureDir(IMAGES_DST);

  // Copy images if present
  if (fs.existsSync(IMAGES_SRC)) {
    const files = await fse.readdir(IMAGES_SRC);
    for (const file of files) {
      const src = path.join(IMAGES_SRC, file);
      const dst = path.join(IMAGES_DST, file);
      const stat = await fse.stat(src);
      if (stat.isFile()) {
        await fse.copy(src, dst);
      }
    }
    console.log(`Copied ${files.length} files to ${IMAGES_DST}`);
  } else {
    console.warn(`Images source not found: ${IMAGES_SRC}`);
  }

  // Output JSON
  await fse.writeJson(OUTPUT_JSON, validModels, { spaces: 2 });
  console.log(`Wrote ${validModels.length} models to ${OUTPUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
