const test = require('tape');
const fs = require('fs');
const sinon = require('sinon');
const writeFile = require('./write-file');

test(__filename, (t) => {
  t.plan(1);

  const code = '0<1';

  const file = {
    type: 'slot',
    folder: 'slots',
    fileName: 'testSlot',
    code,
  };

  sinon.stub(fs, 'writeFileSync');

  writeFile.write(file, 'Users/mattyod/lexbot');

  const expected = [
    [
      'Users/mattyod/lexbot/slots/testSlot.js',
      code,
    ],
  ];

  t.deepEqual(fs.writeFileSync.args, expected,
    'writes the file to the correct location');

  sinon.restore();
});
