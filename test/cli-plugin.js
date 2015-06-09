import cli from '../module/cli-plugin';

const path = require('path');

const test = require('tape-catch');
const title = require('1-liners/curry')(require('1-liners/plus'))(
  'CLI plugin:  '
);

// Override `process.cwd()` for testing.
console.log(process.cwd());
const originalCwd = process.cwd;
process.cwd = () => path.resolve(__dirname, 'cwd');

test(title('Locates the right files'), (is) => {
  const mock = [
    {data: {location: 'somewhere else'}},
    {data: {location: '.doxie.filter.js'}},
    {data: {location: 'myFilter.js'}},
  ];

  is.deepEqual(
    cli()(mock),
    [{data: {location: '.doxie.filter.js'}}],
    'Takes the function from `<cwd>/.doxie.filter.js` by default.'
  );

  is.deepEqual(
    cli('myFilter.js')(mock),
    [{data: {location: 'myFilter.js'}}],
    'Locates `myFilter.js`.'
  );

  is.deepEqual(
    cli('./myFilter.js')(mock),
    [{data: {location: 'myFilter.js'}}],
    'Locates `./myFilter.js`.'
  );

  is.deepEqual(
    cli('../cwd/myFilter.js')(mock),
    [{data: {location: 'myFilter.js'}}],
    'Locates `../cwd/myFilter.js`.'
  );

  is.end();
});

test(title('Fails gracefully'), (is) => {
  is.throws(
    () => cli('nonExistent.js'),
    'Throws an error when given a non-existent file.'
  );

  is.throws(
    () => cli('badlyFormed.js'),
    'Throws an error when given an invalid JS file.'
  );

  is.end();
});

process.cwd = originalCwd;
