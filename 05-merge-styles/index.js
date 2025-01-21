const fs = require('fs/promises');
const path = require('path');

async function buildCssBundle() {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    let allStyles = '';

    for (const file of files) {
      const filePath = path.join(stylesDir, file.name);

      if (file.isFile() && path.extname(file.name) === '.css') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        allStyles += fileContent + '\n';
      }
    }

    await fs.writeFile(outputFile, allStyles);
  } catch (err) {
    console.error('Error: ', err);
  }
}

buildCssBundle();
