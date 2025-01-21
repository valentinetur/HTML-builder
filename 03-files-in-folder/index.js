const fs = require('fs/promises');
const path = require('path');

async function findFiles() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        const stats = await fs.stat(filePath);
        const fileName = path.parse(filePath).name;
        const fileExt = path.parse(filePath).ext.slice(1);
        const fileSize = stats.size / 1024;
        console.log(`${fileName} - ${fileExt} - ${fileSize.toFixed(3)}Kb`);
      }
    }
  } catch (err) {
    console.log('error: ', err);
  }
}
findFiles();
