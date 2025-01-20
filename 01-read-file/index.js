const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readSteam = fs.createReadStream(filePath, 'utf-8');

readSteam.pipe(process.stdout);
