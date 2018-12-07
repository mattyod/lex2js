const util = require('util');
const camelcase = require('camelcase');
const prepareCode = require('./lib/prepare-code');
const compareName = require('./lib/compare-name');

function createBotFile(resource) {
  const {
    intents,
    slotTypes = [],
  } = resource;

  const sortedIntents = intents.sort(compareName);
  const sortedSlotTypes = slotTypes.sort(compareName);

  const intentNames = sortedIntents
    .map(({ name }) => name);
  const slotTypeNames = sortedSlotTypes
    .map(({ name }) => `${name}SlotType`);

  const intentRequires = sortedIntents
    .map(({ name }) => `const ${name} = require('./intents/${name}.js');`);
  const slotTypeRequires = sortedSlotTypes
    .map(({ name }) => `const ${name}SlotType = require('./slot-types/${name}.js');`);

  const requires = [
    ...intentRequires,
    ...slotTypeRequires,
  ];

  const botWithReferences = {
    ...resource,
    intents: ['INTENTS_PLACEHOLDER'],
    slotTypes: ['SLOT_TYPES_PLACEHOLDER'],
  };

  const botName = camelcase(resource.name);

  const code = util
    .inspect(botWithReferences, false, null)
    .replace('\'INTENTS_PLACEHOLDER\'', intentNames.join(','))
    .replace('\'SLOT_TYPES_PLACEHOLDER\'', slotTypeNames.join(','));

  const template = `
    ${requires.join('\n')}

    const ${botName} = {
      metadata: {
        schemaVersion: '1.0',
        importType: 'LEX',
        importFormat: 'JSON',
      },
      resource: ${code},
    };

    process.stdout.write(JSON.stringify(${botName}));
  `;

  const { output } = prepareCode(template);

  return {
    type: 'bot',
    fileName: resource.name,
    folder: '',
    code: output,
  };
}

module.exports = createBotFile;
