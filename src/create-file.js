const util = require('util');
const camelcase = require('camelcase');
const prepareCode = require('./lib/prepare-code');

const folders = {
  slot: 'slots',
  slotType: 'slot-types',
  accounts: '',
};

function createFile(item, type) {
  const suffix = (type === 'slotType')
    ? 'SlotType'
    : '';

  const name = camelcase(`${item.name}${suffix}`);

  const code = util
    .inspect(item, false, null);

  const template = `
    const ${name} = ${code};

    module.exports = ${name};
  `;

  const { output } = prepareCode(template);

  return {
    type,
    fileName: item.name,
    folder: folders[type],
    code: output,
  };
}

module.exports = createFile;
