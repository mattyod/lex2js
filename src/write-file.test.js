const test = require('tape');
const fs = require('fs');
const sinon = require('sinon');
const { write } = require('./write-file');

test(__filename, (t) => {
  t.plan(2);

  const code = '0<1';

  const file = {
    type: 'slot',
    folder: 'slots',
    fileName: 'testSlot',
    code,
  };

  sinon.stub(fs, 'writeFileSync');
  sinon.stub(fs, 'mkdirSync');

  write(file, 'Users/mattyod/lexbot');

  const expectedMkdirArgs = [
    ['Users/mattyod/lexbot/slots'],
  ];

  const expectedWriteFileArgs = [
    [
      'Users/mattyod/lexbot/slots/testSlot.js',
      code,
    ],
  ];

  t.deepEqual(fs.mkdirSync.args, expectedMkdirArgs,
    'creates folder');

  t.deepEqual(fs.writeFileSync.args, expectedWriteFileArgs,
    'writes the file to the correct location');

  sinon.restore();
});

test(__filename, (t) => {
  t.plan(1);

  const file = {
    type: 'slot',
    folder: 'slots',
    fileName: 'testSlot',
    code: '?',
  };

  const error = new Error('test boom should be logged');

  sinon.stub(fs, 'writeFileSync');
  sinon.stub(fs, 'mkdirSync');
  const consoleError = sinon.spy(console, 'error');

  fs.mkdirSync.throws(error);

  write(file, 'Users/mattyod/lexbot');

  const expectedErrorArgs = [
    [error],
  ];

  t.deepEqual(consoleError.args, expectedErrorArgs,
    'logs unexpected errors');

  sinon.restore();
});

test(__filename, (t) => {
  t.plan(1);

  const file = {
    type: 'slot',
    folder: 'slots',
    fileName: 'testSlot',
    code: '?',
  };

  const error = new Error('test boom should not be logged');
  error.code = 'EEXIST';

  sinon.stub(fs, 'writeFileSync');
  sinon.stub(fs, 'mkdirSync');
  const consoleError = sinon.spy(console, 'error');

  fs.mkdirSync.throws(error);

  write(file, 'Users/mattyod/lexbot');

  t.equal(consoleError.callCount, 0,
    'does not log EEXIST errors when making directories');

  sinon.restore();
});
