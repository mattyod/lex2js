const test = require('tape');
const compareName = require('./compare-name');

test(__filename, (t) => {
  t.plan(3);

  t.deepEqual(compareName({ name: 'Anne' }, { name: 'Harry' }), -1,
    'returns -1 when first name is first alphabetically');

  t.deepEqual(compareName({ name: 'Zach' }, { name: 'Harry' }), 1,
    'returns 1 when second name is first alphabetically');

  t.deepEqual(compareName({ name: 'Dave' }, { name: 'dave' }), 0,
    'returns 0 when both names are the same alphabetically');
});
