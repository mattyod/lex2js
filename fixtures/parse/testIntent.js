const testIntent = {
  name: 'testIntent',
  version: '1',
  fulfillmentActivity: {
    type: 'ReturnIntent',
  },
  sampleUtterances: [
    'this is a test',
    'this is only a test',
  ],
  slots: [],
  conclusionStatement: {
    messages: [
      {
        contentType: 'PlainText',
        content: 'It certainly is',
      },
    ],
  },
};

module.exports = testIntent;
