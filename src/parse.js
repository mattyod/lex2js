const createFile = require('./create-file');
const createBotFile = require('./create-bot-file');
const createIntentFile = require('./create-intent-file');
const writeFile = require('./write-file');

function parse(params) {
  const {
    sourceBotPath,
    distFolderPath,
    accounts,
  } = params;

  const configFiles = [];

  if (accounts) {
    const accountsFile = {
      ...accounts,
      name: 'accounts',
    };

    configFiles.push(createFile(accountsFile, 'accounts'));
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { resource } = require(sourceBotPath);

  const {
    intents,
    slotTypes = [],
  } = resource;

  const intentFiles = intents
    .map(intent => createIntentFile(intent, params));

  const slotFiles = intents
    .map(intent => intent.slots.map(slot => createFile(slot, 'slot')))
    .reduce((arr, file) => arr.concat(file), []);

  const slotTypeFiles = slotTypes
    .map(slotType => createFile(slotType, 'slotType'));

  [
    ...configFiles,
    ...intentFiles,
    ...slotFiles,
    ...slotTypeFiles,
    createBotFile(resource, Boolean(accounts)),
  ].map(file => writeFile.write(file, distFolderPath));
}

module.exports = parse;
