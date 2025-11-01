/*
Extract embedded images from DIMENSION.xlsx and generate proper catalogue.json
This script extracts images that are actually embedded in the Excel file

Usage:
  node scripts/extract-excel-images.js

Requires:
  npm i -D xlsx fs-extra jszip
*/

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const XLSX = require('xlsx');
const JSZip = require('jszip');

const ROOT = path.resolve(__dirname, '..');
const XLSX_PATH = path.join(ROOT, 'docs', 'DIMENSION.xlsx');
const PUBLIC_DIR = path.join(ROOT, 'client', 'public');
const IMAGES_DST = path.join(PUBLIC_DIR, 'catalogue-images');
const OUTPUT_JSON = path.join(PUBLIC_DIR, 'catalogue.json');

async function extractImagesFromExcel() {
  console.log('Reading Excel file...');
  const arrayBuffer = fs.readFileSync(XLSX_PATH);
  
  // Extract images using JSZip
  console.log('Extracting embedded images...');
  const zip = await JSZip.loadAsync(arrayBuffer);
  const imageFiles = [];
  const mediaFolder = zip.folder('xl/media');
  
  if (mediaFolder) {
    const imagePromises = [];
    let imageIndex = 1;
    
    mediaFolder.forEach((relativePath, file) => {
      if (file && !file.dir) {
        imagePromises.push(
          file.async('base64').then(base64 => {
            const ext = relativePath.split('.').pop().toLowerCase();
            let mimeType = 'image/png';
            if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
            else if (ext === 'gif') mimeType = 'image/gif';
            else if (ext === 'svg') mimeType = 'image/svg+xml';
            
            const filename = `product_${imageIndex}.${ext}`;
            imageIndex++;
            
            return {
              filename,
              base64,
              mimeType,
              originalPath: relativePath
            };
          })
        );
      }
    });
    
    const extractedImages = await Promise.all(imagePromises);
    imageFiles.push(...extractedImages);
    console.log(`Found ${imageFiles.length} embedded images`);
  } else {
    console.log('No embedded images found in Excel file');
  }
  
  return imageFiles;
}

async function saveImagesToFiles(images) {
  await fse.ensureDir(IMAGES_DST);
  
  // Clear existing images first
  const existingFiles = await fse.readdir(IMAGES_DST);
  for (const file of existingFiles) {
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      await fse.remove(path.join(IMAGES_DST, file));
    }
  }
  
  // Save extracted images
  for (const image of images) {
    const imagePath = path.join(IMAGES_DST, image.filename);
    const buffer = Buffer.from(image.base64, 'base64');
    await fse.writeFile(imagePath, buffer);
    console.log(`Saved: ${image.filename}`);
  }
}

async function parseExcelData() {
  console.log('Parsing Excel data...');
  const wb = XLSX.readFile(XLSX_PATH, { cellDates: false });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { raw: false, defval: '' });

  if (!rows.length) {
    return [];
  }

  // Parse vertical structure: group rows by model
  const models = [];
  let currentModel = null;

  for (const row of rows) {
    const modelName = (row['Model Name'] || '').trim();
    const specLabel = (row['__EMPTY'] || '').trim().toUpperCase();
    const specValue = (row['__EMPTY_1'] || '').trim();

    // Start new model when Model Name is not empty
    if (modelName) {
      currentModel = {
        MODEL: modelName
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
  return models.filter(m => m.MODEL);
}

async function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    throw new Error(`Excel not found at ${XLSX_PATH}`);
  }

  try {
    // Extract images from Excel
    const extractedImages = await extractImagesFromExcel();
    
    // Save images to files
    if (extractedImages.length > 0) {
      await saveImagesToFiles(extractedImages);
    }
    
    // Parse Excel data
    const models = await parseExcelData();
    console.log(`Found ${models.length} product models`);
    
    // Map images to models
    const modelsWithImages = models.map((model, index) => {
      let imageName = null;
      
      // Map images sequentially to models
      if (extractedImages.length > 0) {
        const imageIndex = index % extractedImages.length;
        imageName = extractedImages[imageIndex].filename;
      }
      
      return {
        ...model,
        IMAGE_NAME: imageName
      };
    });

    // Ensure public dir
    await fse.ensureDir(PUBLIC_DIR);

    // Output JSON
    await fse.writeJson(OUTPUT_JSON, modelsWithImages, { spaces: 2 });
    console.log(`Generated catalogue.json with ${modelsWithImages.length} models`);
    
    // Summary
    const modelsWithImageCount = modelsWithImages.filter(m => m.IMAGE_NAME).length;
    console.log(`Models with images: ${modelsWithImageCount}/${modelsWithImages.length}`);
    
    if (extractedImages.length > 0) {
      console.log('\nExtracted images:');
      extractedImages.forEach((img, idx) => {
        console.log(`${idx + 1}. ${img.filename} (from ${img.originalPath})`);
      });
    }
    
    if (modelsWithImageCount > 0) {
      console.log('\nSample models with images:');
      modelsWithImages.filter(m => m.IMAGE_NAME).slice(0, 5).forEach(model => {
        console.log(`- ${model.MODEL}: ${model.IMAGE_NAME}`);
      });
    }
    
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw error;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
