const anotherIntent = require('./intents/anotherIntent.js');
const testIntent = require('./intents/testIntent.js');
const exampleSlotTypeSlotType = require('./slot-types/exampleSlotType.js');

const testBot = {
  metadata: {
    schemaVersion: '1.0',
    importType: 'LEX',
    importFormat: 'JSON',
  },
  resource: {
    name: 'testBot',
    version: '1',
    intents: [
      anotherIntent,
      testIntent,
    ],
    slotTypes: [
      exampleSlotTypeSlotType,
    ],
  },
};

process.stdout.write(JSON.stringify(testBot));
