// Sync project images: rename and copy referenced images to public folders
const fs = require('fs');
const path = require('path');
const storagePath = path.join(__dirname, '../server/storage.ts');
const srcDirs = [
  path.join(__dirname, '../public/projects'),
  path.join(__dirname, '../public/attached_assets'),
];
const destDirs = {
  '/projects/': path.join(__dirname, '../public/projects'),
  '/attached_assets/': path.join(__dirname, '../public/attached_assets'),
};

function getReferencedImages() {
  const content = fs.readFileSync(storagePath, 'utf8');
  const regex = /imageUrl:\s*["'](\/projects\/|\/attached_assets\/)([^"']+)/g;
  const images = [];
  let match;
  while ((match = regex.exec(content))) {
    images.push({
      folder: match[1],
      name: match[2],
      full: match[1] + match[2]
    });
  }
  return images;
}

function findActualFile(name) {
  for (const dir of srcDirs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase() === name.toLowerCase()) return path.join(dir, file);
    }
  }
  return null;
}

function syncImages() {
  const images = getReferencedImages();
  let missing = [];
  for (const img of images) {
    const destDir = destDirs[img.folder];
    const actualFile = findActualFile(img.name);
    if (actualFile) {
      const destPath = path.join(destDir, img.name);
      if (actualFile !== destPath) {
        fs.copyFileSync(actualFile, destPath);
        console.log(`Copied: ${actualFile} -> ${destPath}`);
      }
    } else {
      missing.push(img.full);
    }
  }
  if (missing.length) {
    console.log('Missing images:', missing);
  } else {
    console.log('All referenced images are present and synced.');
  }
}

syncImages();
