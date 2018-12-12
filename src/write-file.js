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

const messages = {
  exists: directory => `📂 folder ${directory} already exists.`,
  created: directory => `📂 created folder ${directory}.`,
};

const errorHandler = (error, directory) => {
  const { log } = console;

  if (error) {
    if (error.code === 'EEXIST') {
      log(messages.exists(directory));
    } else {
      log(error);
    }
  } else {
    log(messages.created(directory));
  }
};

function write(file, dir) {
  const { log } = console;
  const {
    type,
    folder,
    fileName,
    code,
  } = file;

  const directory = path.join(dir, folder);
  const error = fs.mkdirSync(directory);

  errorHandler(error, directory);

  const filePath = path.join(dir, folder, `${fileName}.js`);

  fs.writeFileSync(filePath, code);

  log(`${mapping[type]}CREATED ${type}:${original} ${filePath}`);
}

module.exports = {
  write,
  errorHandler,
  messages,
};
