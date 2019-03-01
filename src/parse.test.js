const test = require('tape');
const sinon = require('sinon');
const fs = require('fs');
const parse = require('./parse');
const writeFile = require('./write-file');

const getFile = name => fs
  .readFileSync(`${__dirname}/../fixtures/parse/${name}.js`)
  .toString();

test(__filename, (t) => {
  t.plan(6);

  const distFolderPath = '/foo';

  const params = {
    sourceBotPath: `${__dirname}/../fixtures/test-bot-input.js`,
    distFolderPath,
    accounts: {
      prod: '1234567890',
      nonprod: '0987654321',
    },
  };

  const testAccounts = getFile('testAccounts');
  const testIntent = getFile('testIntent');
  const anotherIntent = getFile('anotherIntent');
  const exampleSlotType = getFile('exampleSlotType');
  const testBot = getFile('testBot');
  const testSlot = getFile('testSlot');

  sinon.stub(writeFile, 'write');

  parse(params);

  const expected = [
    [
      {
        type: 'accounts',
        fileName: 'accounts',
        folder: '',
        code: testAccounts,
      },
      distFolderPath,
    ],
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
        type: 'intent',
        fileName: 'anotherIntent',
        folder: 'intents',
        code: anotherIntent,
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
        type: 'slotType',
        fileName: 'exampleSlotType',
        folder: 'slot-types',
        code: exampleSlotType,
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
    'it deconstructs the bot into expected parts');
  t.deepEqual(writeFile.write.args[1], expected[1],
    'it deconstructs the bot into expected parts');
  t.deepEqual(writeFile.write.args[2], expected[2],
    'it deconstructs the bot into expected parts');
  t.deepEqual(writeFile.write.args[3], expected[3],
    'it deconstructs the bot into expected parts');
  t.deepEqual(writeFile.write.args[4], expected[4],
    'it deconstructs the bot into expected parts');
  t.deepEqual(writeFile.write.args[5], expected[5],
    'it deconstructs the bot into expected parts');

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
