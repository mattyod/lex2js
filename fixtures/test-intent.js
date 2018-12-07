const slotOne = require('../slots/slot_one.js');
const slotTwo = require('../slots/slot_two.js');

const testIntent = {
  name: 'test_intent',
  sampleUtterances: [
    'test',
  ],
  slots: [
    slotOne,
    slotTwo,
  ],
};

module.exports = testIntent;
