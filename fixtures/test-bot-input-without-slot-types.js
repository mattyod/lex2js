const testBot = {
  resource: {
    name: 'testBot',
    version: '1',
    intents: [
      {
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
          messages: [{
            contentType: 'PlainText',
            content: 'It certainly is',
          }],
        },
      },
      {
        name: 'anotherIntent',
        version: '1',
        fulfillmentActivity: {
          type: 'ReturnIntent',
        },
        sampleUtterances: [
          'how is it going',
          'are we there yet',
        ],
        slots: [{
          name: 'testSlot',
          slotConstraint: 'required',
          slotType: 'AMAZON.Person',
          valueElicitationPrompt: {
            messages: [
              {
                contentType: 'PlainText',
                content: 'what is your name?',
              },
            ],
            maxAttempts: '2',
          },
          priority: '1',
          sampleUtterances: [],
        }],
        conclusionStatement: {
          messages: [{
            contentType: 'PlainText',
            content: 'nearly done',
          }],
        },
      },
    ],
  },
};

module.exports = testBot;
