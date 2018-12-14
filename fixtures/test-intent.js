const slotOne = require('../slots/slot_one.js');
const slotTwo = require('../slots/slot_two.js');
const accounts = require('../accounts.js');

const testIntent = {
  name: 'test_intent',
  sampleUtterances: [
    'test',
  ],
  slots: [
    slotOne,
    slotTwo,
  ],
  fulfillmentActivity: {
    type: 'CodeHook',
    codeHook: {
      uri: `arn:aws:lambda:eu-west-1:${
        accounts[process.argv[2]]
      }:function:testLambda`,
    },
  },
  dialogCodeHook: {
    uri: `arn:aws:lambda:eu-west-1:${
      accounts[process.argv[2]]
    }:function:testLambda`,
  },
};

module.exports = testIntent;
