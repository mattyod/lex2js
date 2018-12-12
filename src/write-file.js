const fs = require('fs');
const path = require('path');
const {
  yellow,
  magenta,
  cyan,
  original,
  lightYellow,
} = require('./lib/colours');

const mapping = {
  slot: yellow,
  slotType: lightYellow,
  intent: cyan,
  bot: magenta,
};

function write(file, dir) {
  const { log } = console;
  const {
    type,
    folder,
    fileName,
    code,
  } = file;

  const filePath = path.join(dir, folder, `${fileName}.js`);

  fs.writeFileSync(filePath, code);

  log(`${mapping[type]}CREATED ${type}:${original} ${filePath}`);
}

module.exports = {
  write,
};
