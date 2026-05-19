const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/sequence');

async function convertImages() {
  try {
    const files = fs.readdirSync(targetDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('No PNG files found to convert.');
      return;
    }

    console.log(`Found ${pngFiles.length} PNG files. Starting conversion...`);

    let completed = 0;
    for (const file of pngFiles) {
      const inputPath = path.join(targetDir, file);
      const outputName = file.replace(/\.png$/, '.webp');
      const outputPath = path.join(targetDir, outputName);

      // Convert to WebP using sharp with quality 80 (great balance of quality and file size)
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Delete the original PNG file
      fs.unlinkSync(inputPath);

      completed++;
      if (completed % 10 === 0 || completed === pngFiles.length) {
        console.log(`Progress: ${completed}/${pngFiles.length} files converted.`);
      }
    }

    console.log('Conversion completed successfully! All original PNGs removed.');
  } catch (error) {
    console.error('Error during image conversion:', error);
    process.exit(1);
  }
}

convertImages();
