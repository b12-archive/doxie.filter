import cli from '../module/cli-plugin';

const path = require('path');

const test = require('tape-catch');

// Override `process.cwd()` for testing.
console.log(process.cwd());
const originalCwd = process.cwd;
process.cwd = () => path.resolve(__dirname, 'cwd');

test('CLI plugin:  Locates the right files', (is) => {
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

process.cwd = originalCwd;
