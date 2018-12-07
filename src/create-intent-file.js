const util = require('util');
const camelcase = require('camelcase');
const prepareCode = require('./lib/prepare-code');

function createIntentFile(intent) {
  const { slots } = intent;

  const requires = slots
    .map(({ name }) => `const ${camelcase(name)} = require('../slots/${name}.js');`);

  const intentWithReferences = {
    ...intent,
    slots: ['SLOTS_PLACEHOLDER'],
  };

  const slotNames = slots.map(({ name }) => camelcase(name));

  const code = util
    .inspect(intentWithReferences, false, null)
    .replace('\'SLOTS_PLACEHOLDER\'', slotNames.join(','));

  const varName = camelcase(intent.name);

  const template = `
    ${requires.join('\n')}

    const ${varName} = ${code};

    module.exports = ${varName};
  `;

  const { output } = prepareCode(template);

  return {
    type: 'intent',
    fileName: intent.name,
    folder: 'intents',
    code: output,
  };
}

module.exports = createIntentFile;
