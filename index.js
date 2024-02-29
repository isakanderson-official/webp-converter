const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './convert';
const outputDir = './output';
const quality = 30; // Change this to adjust output quality

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir);

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.png') {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(
        outputDir,
        `${path.basename(file, '.png')}.webp`
      );

      sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath)
        .then(() => console.log(`Converted ${file} to WEBP format.`))
        .catch((err) => console.error(`Error converting ${file}: ${err}`));
    }
  });
});
