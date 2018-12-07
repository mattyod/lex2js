const test = require('tape');
const fs = require('fs');
const prepareCode = require('./prepare-code');

test(__filename, (t) => {
  t.plan(1);

  const code = `
    const foo = ["one", "two"]; const bar = { boom: 1 }
  `;

  const expected = fs
    .readFileSync(`${__dirname}/../../fixtures/prepared-code.js`)
    .toString();

  const { output } = prepareCode(code);

  t.deepEqual(output, expected,
    'formats code');
});
