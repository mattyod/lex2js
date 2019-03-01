const test = require('tape');
const fs = require('fs');
const createFile = require('./create-file');

test(__filename, (t) => {
  t.plan(1);

  const type = 'slot';

  const slot = {
    name: 'test',
    slotConstraint: 'Optional',
    slotType: 'tests',
    slotTypeVersion: '1',
    valueElicitationPrompt: {
      messages: [{
        contentType: 'PlainText',
        content: 'this is a test',
      }],
      maxAttempts: 2,
    },
    priority: 1,
    sampleUtterances: [],
  };

  const fixture = fs
    .readFileSync(`${__dirname}/../fixtures/test-slot.js`)
    .toString();

  const expected = {
    type,
    fileName: 'test',
    folder: 'slots',
    code: fixture,
  };

  const actual = createFile(slot, type);

  t.deepEqual(actual, expected,
    'creates a slot file object');
});

test(__filename, (t) => {
  t.plan(1);

  const type = 'slotType';

  const slotType = {
    name: 'Test',
    version: '1',
    enumerationValues: [{
      value: 'unit',
      synonyms: [],
    }, {
      value: 'manual',
      synonyms: [],
    }],
    valueSelectionStrategy: 'ORIGINAL_VALUE',
  };

  const fixture = fs
    .readFileSync(`${__dirname}/../fixtures/test-slot-type.js`)
    .toString();

  const expected = {
    type,
    fileName: 'Test',
    folder: 'slot-types',
    code: fixture,
  };

  const actual = createFile(slotType, type);

  t.deepEqual(actual, expected,
    'creates a slot-type file object');
});
