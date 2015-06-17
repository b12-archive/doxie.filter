import dummyData from './test-tools/dummyData';

import cli from '../module/cli-plugin';

const path = require('path');

const test = require('tape-catch');
const title = require('1-liners/curry')(require('1-liners/plus'))(
  'CLI plugin:  '
);

// Override `process.cwd()` for testing.
const originalCwd = process.cwd;
const mockCwd = () => path.resolve(__dirname, 'cwd');

test(title('Locates the right files'), (is) => {
  process.cwd = mockCwd;

  const mock = dummyData([
    {data: {location: 'somewhere else'}},
    {data: {location: '.doxie.filter.js'}},
    {data: {location: 'myFilter.js'}},
  ]);

  is.deepEqual(
    cli()(mock),
    dummyData([{data: {location: '.doxie.filter.js'}}]),
    'Takes the function from `<cwd>/.doxie.filter.js` by default.'
  );

  is.deepEqual(
    cli('myFilter.js')(mock),
    dummyData([{data: {location: 'myFilter.js'}}]),
    'Locates `myFilter.js`.'
  );

  is.deepEqual(
    cli('./myFilter.js')(mock),
    dummyData([{data: {location: 'myFilter.js'}}]),
    'Locates `./myFilter.js`.'
  );

  is.deepEqual(
    cli('../cwd/myFilter.js')(mock),
    dummyData([{data: {location: 'myFilter.js'}}]),
    'Locates `../cwd/myFilter.js`.'
  );

  process.cwd = originalCwd;
  is.end();
});

test(title('Fails gracefully'), (is) => {
  process.cwd = mockCwd;

  is.throws(
    () => cli('nonExistent.js'),
    /no filter function found/i,
    'Throws a helpful error when given a non-existent file.'
  );

  is.throws(
    () => cli('notAFunction.js'),
    /invalid filter function/i,
    'Throws a helpful error when given a non-function module.'
  );

  is.throws(
    () => cli('badlyFormed.file'),
    SyntaxError,
    'Throws a SyntaxError when given an invalid JS file.'
  );

  process.cwd = originalCwd;
  is.end();
});
