import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { IMAGE_OPTIMIZATION_CONFIG } from '../src/config/imageOptimization.js';

const ASSETS_DIR = './src/assets';
const { MAX_WIDTH, QUALITY, MIN_SIZE_BYTES } = IMAGE_OPTIMIZATION_CONFIG;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  try {
    const stats = await stat(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    if (stats.size < MIN_SIZE_BYTES) {
      console.log(`⏭️  Skipping ${filePath} (${sizeMB}MB - already small)`);
      return;
    }

    console.log(`🔄 Optimizing ${filePath} (${sizeMB}MB)...`);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { 
        fit: 'inside', 
        withoutEnlargement: true 
      });
    }

    const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

    const newStats = await stat(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(0);

    console.log(`✅ ${outputPath} (${newSizeMB}MB, saved ${savings}%)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('🚀 Starting image optimization...\n');
await processDirectory(ASSETS_DIR);
console.log('\n✨ Done! Update imports to .webp');
