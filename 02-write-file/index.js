const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'test.txt');
fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
  stdout.write('Write your text here: \n');
});

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'exit') {
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('\nGood Bye!\n'));
