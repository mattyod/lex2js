const test = require('tape');
const sinon = require('sinon');
const fs = require('fs');
const parse = require('./parse');
const writeFile = require('./write-file');

const getFile = name => fs
  .readFileSync(`${__dirname}/../fixtures/parse/${name}.js`)
  .toString();

test(__filename, (t) => {
  t.plan(5);

  const distFolderPath = '/foo';

  const params = {
    sourceBotPath: `${__dirname}/../fixtures/test-bot-input.js`,
    distFolderPath,
  };

  const testIntent = getFile('testIntent');
  const anotherIntent = getFile('anotherIntent');
  const exampleSlotTypeSlotType = getFile('exampleSlotTypeSlotType');
  const testBot = getFile('testBot');
  const testSlot = getFile('testSlot');

  sinon.stub(writeFile, 'write');

  parse(params);

  const expected = [
    [
      {
        type: 'intent',
        fileName: 'testIntent',
        folder: 'intents',
        code: testIntent,
      },
      distFolderPath,
    ],
    [
      {
        type: 'slot',
        fileName: 'testSlot',
        folder: 'slots',
        code: testSlot,
      },
      distFolderPath,
    ],
    [
      {
        type: 'intent',
        fileName: 'anotherIntent',
        folder: 'intents',
        code: anotherIntent,
      },
      distFolderPath,
    ],
    [
      {
        type: 'slotType',
        fileName: 'exampleSlotTypeSlotType',
        folder: 'slot-types',
        code: exampleSlotTypeSlotType,
      },
      distFolderPath,
    ],
    [
      {
        type: 'bot',
        fileName: 'testBot',
        folder: '',
        code: testBot,
      },
      distFolderPath,
    ],
  ];

  t.deepEqual(writeFile.write.args[0], expected[0],
    'it breaks the bot into the expected parts');
  t.deepEqual(writeFile.write.args[1], expected[1],
    'it breaks the bot into the expected parts');
  t.deepEqual(writeFile.write.args[2], expected[2],
    'it breaks the bot into the expected parts');
  t.deepEqual(writeFile.write.args[3], expected[3],
    'it breaks the bot into the expected parts');
  t.deepEqual(writeFile.write.args[4], expected[4],
    'it breaks the bot into the expected parts');

  sinon.restore();
});

test(__filename, (t) => {
  t.plan(1);

  const params = {
    sourceBotPath: `${__dirname}/../fixtures/test-bot-input-without-slot-types.js`,
    distFolderPath: '/bar',
  };

  sinon.stub(writeFile, 'write');

  parse(params);

  t.equal(writeFile.write.args.length, 4,
    'it does not assume that slotTypes exist');

  sinon.restore();
});
