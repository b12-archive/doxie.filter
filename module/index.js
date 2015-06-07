import { 
  ifElse,
  isFunction,
  filter,
  compose } from '1-liners';

const castBool = val => val === true;

const filterCurried = filterFn => 
  ifElse(
    arr => Array.isArray(arr),
    arr => filter( compose(castBool, filterFn), arr),
    () => { throw new Error('Filter expected an array'); });

export default 
  ifElse(
    f => isFunction(f),
    f => filterCurried(f),
    () => { throw new Error('Filter expected a function'); });

