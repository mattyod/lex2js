const hasAccounts = true;
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

if (hasAccounts && !process.argv[2]) {
  console.log('args received', process.argv);
  throw new Error(
    'No account in call to generate JSON but this bot expects one to be specified'
  );
}

process.stdout.write(JSON.stringify(testBot));
