const testSlot = {
  name: 'testSlot',
  slotConstraint: 'required',
  slotType: 'exampleSlotType',
  valueElicitationPrompt: {
    messages: [
      {
        contentType: 'PlainText',
        content: 'what is it?',
      },
    ],
    maxAttempts: '2',
  },
  priority: '1',
  sampleUtterances: [],
};

module.exports = testSlot;
