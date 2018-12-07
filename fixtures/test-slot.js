const test = {
  name: 'test',
  slotConstraint: 'Optional',
  slotType: 'tests',
  slotTypeVersion: '1',
  valueElicitationPrompt: {
    messages: [
      {
        contentType: 'PlainText',
        content: 'this is a test',
      },
    ],
    maxAttempts: 2,
  },
  priority: 1,
  sampleUtterances: [],
};

module.exports = test;
