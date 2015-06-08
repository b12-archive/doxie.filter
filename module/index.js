import {
  ifElse,
  isFunction,
  filter,
  compose
} from '1-liners';

const castBool = (val) => val === true;
const throwError = (msg) => () => { throw new Error(msg); };

const filterCurried = (filterFn) => ifElse(
  Array.isArray,
  (arr) => filter(compose(castBool, filterFn), arr),
  throwError('Filter expected an array')
);

export default ifElse(
  isFunction,
  filterCurried,
  throwError('Filter expected a function')
);
