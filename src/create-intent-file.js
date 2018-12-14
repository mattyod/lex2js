const util = require('util');
const camelcase = require('camelcase');
const prepareCode = require('./lib/prepare-code');

function intentHasLambdas(intent, params) {
  const accounts = Object.values(params.accounts || {});
  const lambdas = {
    haslambdas: false,
    uris: [],
  };

  function getOldAndNewUris(uri) {
    accounts.find((account) => {
      const accountMatch = uri.includes(account);

      if (accountMatch) {
        lambdas.haslambdas = true;
        lambdas.uris.push({
          oldUri: uri,
          // eslint-disable-next-line no-template-curly-in-string
          newUri: uri.replace(account, '${accounts[process.argv[2]]}'),
        });
      }

      return accountMatch;
    });
  }

  if (intent.fulfillmentActivity && intent.fulfillmentActivity.type === 'CodeHook') {
    getOldAndNewUris(intent.fulfillmentActivity.codeHook.uri);
  }

  if (intent.dialogCodeHook) {
    getOldAndNewUris(intent.dialogCodeHook.uri);
  }

  return lambdas;
}

function requireAccounts({ haslambdas }) {
  return haslambdas
    ? 'const accounts = require(\'../accounts.js\')'
    : [];
}

function createIntentFile(intent, params) {
  const { slots } = intent;

  const lambdas = intentHasLambdas(intent, params);

  const requires = slots
    .map(({ name }) => `const ${camelcase(name)} = require('../slots/${name}.js');`)
    .concat(requireAccounts(lambdas));

  const intentWithReferences = {
    ...intent,
    slots: ['SLOTS_PLACEHOLDER'],
  };

  const slotNames = slots.map(({ name }) => camelcase(name));

  let code = util
    .inspect(intentWithReferences, false, null)
    .replace('\'SLOTS_PLACEHOLDER\'', slotNames.join(','));

  function replaceUris(uris) {
    code = code.replace(`'${uris.oldUri}'`, `\`${uris.newUri}\``);
  }

  if (lambdas.haslambdas) {
    lambdas.uris.map(replaceUris);
  }

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
