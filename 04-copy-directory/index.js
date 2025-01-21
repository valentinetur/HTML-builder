const fs = require('fs/promises');
const path = require('path');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src, { withFileTypes: true });

    for (const file of files) {
      const srcPath = path.join(src, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else if (file.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error('Error \n:', err);
  }
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
