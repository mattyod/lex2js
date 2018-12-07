const eslint = require('eslint');
const prettier = require('prettier');
const eslintConfig = require('./eslintrc');

module.exports = function prepareCode(code) {
  const prettierCode = prettier.format(code, {
    parser: 'babylon',
  });

  return eslint.linter
    .verifyAndFix(prettierCode, eslintConfig);
};
