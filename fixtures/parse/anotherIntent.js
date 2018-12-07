const testSlot = require('../slots/testSlot.js');

const anotherIntent = {
  name: 'anotherIntent',
  version: '1',
  fulfillmentActivity: {
    type: 'ReturnIntent',
  },
  sampleUtterances: [
    'how is it going',
    'are we there yet',
  ],
  slots: [
    testSlot,
  ],
  conclusionStatement: {
    messages: [
      {
        contentType: 'PlainText',
        content: 'nearly done',
      },
    ],
  },
};

module.exports = anotherIntent;
