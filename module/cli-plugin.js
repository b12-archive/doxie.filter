import filterError from './tools/error';
import filter from './index';

const {resolve} = require('path');

export default (source = '.doxie.filter.js') => {
  let modulePath = resolve(process.cwd(), source);
  let filterFunction;

  try {
    filterFunction = require(modulePath);
  } catch (error) {throw (
    error.code === 'MODULE_NOT_FOUND' ?
    filterError(
      `No filter function found. We’ve looked in \`${modulePath}\`.`
        // TODO: Print usage.
    ) :
    error
  );}

  if (typeof filterFunction !== 'function') throw filterError(
    `Invalid filter function. The file \`${modulePath}\` should export a ` +
    'function.'
  );

  return filter(filterFunction);
};
