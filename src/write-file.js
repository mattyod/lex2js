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
  accounts: magenta,
};

function write(file, dir) {
  const {
    log,
    error,
  } = console;
  const {
    type,
    folder,
    fileName,
    code,
  } = file;

  const directory = path.join(dir, folder);

  try {
    fs.mkdirSync(directory);
    log(`📂 created folder ${directory}.`);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      error(err);
    }
  }

  const filePath = path.join(directory, `${fileName}.js`);

  fs.writeFileSync(filePath, code);

  log(`${mapping[type]}CREATED ${type}:${original} ${filePath}`);
}

module.exports = { write };
