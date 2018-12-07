const createFile = require('./create-file');
const createBotFile = require('./create-bot-file');
const createIntentFile = require('./create-intent-file');
const writeFile = require('./write-file');

function parseIntent(intent) {
  const intentFile = createIntentFile(intent);

  const slotFiles = intent.slots
    .map(slot => createFile(slot, 'slot'));

  return slotFiles
    .concat(intentFile);
}

function parse(params) {
  const {
    sourceBotPath,
    distFolderPath,
  } = params;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { resource } = require(sourceBotPath);

  const {
    intents,
    slotTypes = [],
  } = resource;

  const intentAndSlotFiles = intents
    .map(parseIntent)
    .reduce((arr, file) => arr.concat(file), []);

  const slotTypeFiles = slotTypes
    .map(slotType => createFile(slotType, 'slotType'));

  [
    ...intentAndSlotFiles,
    ...slotTypeFiles,
    createBotFile(resource),
  ].map(file => writeFile.write(file, distFolderPath));
}

module.exports = parse;
