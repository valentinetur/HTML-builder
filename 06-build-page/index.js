const fs = require('fs/promises');
const path = require('path');

async function buildPage() {
  try {
    const projectDist = path.join(__dirname, 'project-dist');
    await fs.mkdir(projectDist, { recursive: true });
    const componentsDir = path.join(__dirname, 'components');
    const components = await fs.readdir(componentsDir, { withFileTypes: true });
    let template = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );

    for (const component of components) {
      if (component.isFile() && path.extname(component.name) === '.html') {
        const componentName = path.parse(component.name).name;
        const componentContent = await fs.readFile(
          path.join(componentsDir, component.name),
          'utf-8',
        );
        template = template.replaceAll(
          `{{${componentName}}}`,
          componentContent,
        );
      }
    }

    await fs.writeFile(path.join(projectDist, 'index.html'), template);
  } catch (err) {
    console.log('error: ', err);
  }
}

async function buildCssBundle() {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const outputFile = path.join(__dirname, 'project-dist', 'style.css');
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

buildPage();
buildCssBundle();
copyDir(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets')
);
