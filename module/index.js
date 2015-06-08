const ifElse = require('1-liners/ifElse');
const isFunction = require('1-liners/isFunction');
const filter = require('1-liners/filter');

const throwError = (msg) => () => { throw new Error(msg); };

const filterCurried = (filterFn) => ifElse(
  Array.isArray,
  (arr) => filter(filterFn, arr),
  throwError('Filter expected an array')
);

export default ifElse(
  isFunction,
  filterCurried,
  throwError('Filter expected a function')
);
