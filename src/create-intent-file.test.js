const test = require('tape');
const fs = require('fs');
const createIntentFile = require('./create-intent-file');

test(__filename, (t) => {
  t.plan(1);

  const intent = {
    name: 'test_intent',
    sampleUtterances: [
      'test',
    ],
    slots: [
      { name: 'slot_one' },
      { name: 'slot_two' },
    ],
    fulfillmentActivity: {
      type: 'CodeHook',
      codeHook: {
        uri: 'arn:aws:lambda:eu-west-1:1234567890:function:testLambda',
      },
    },
    dialogCodeHook: {
      uri: 'arn:aws:lambda:eu-west-1:1234567890:function:testLambda',
    },
  };

  const params = {
    accounts: {
      nonprod: '1234567890',
      prod: '01234567890',
    },
  };

  const fixture = fs
    .readFileSync(`${__dirname}/../fixtures/test-intent.js`)
    .toString();

  const expected = {
    type: 'intent',
    fileName: 'test_intent',
    folder: 'intents',
    code: fixture,
  };

  const actual = createIntentFile(intent, params);

  t.deepEqual(actual, expected,
    'renders an intent file object');
});
