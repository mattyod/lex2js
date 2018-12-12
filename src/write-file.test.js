const test = require('tape');
const fs = require('fs');
const sinon = require('sinon');
const {
  write,
  errorHandler,
  messages,
} = require('./write-file');

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

  const log = sinon.stub(console, 'log');

  const directory = '/foo/bar';
  const error = {
    code: 'EEXIST',
  };

  errorHandler(error, directory);

  const expected = [
    [messages.exists(directory)],
  ];

  t.deepEqual(log.args, expected,
    'logs that directory already exists');

  sinon.restore();
});

test(__filename, (t) => {
  t.plan(1);

  const log = sinon.stub(console, 'log');

  const directory = '/foo/bar';
  const error = {
    code: 'ENOENT',
  };

  errorHandler(error, directory);

  const expected = [
    [error],
  ];

  t.deepEqual(log.args, expected,
    'logs unexpected errors');

  sinon.restore();
});

test(__filename, (t) => {
  t.plan(1);

  const log = sinon.stub(console, 'log');

  const directory = '/foo/bar';

  errorHandler(null, directory);

  const expected = [
    [messages.created(directory)],
  ];

  t.deepEqual(log.args, expected,
    'logs successful folder creation');

  sinon.restore();
});
