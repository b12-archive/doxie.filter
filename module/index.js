const isFunction = require('1-liners/isFunction');
const filter = require('1-liners/filter');
const error = require('tiny-error')({prefix: '[doxie.filter] '});

export default (filterFunction) => {
  if (!isFunction(filterFunction)) throw error(
    'Wrong value of `filterFunction`. We expected a function'
  );

  return (input = {}) => {
    let {version, chunks} = input;
    if (!Array.isArray(chunks = input.chunks)) throw error(
      'Wrong value of `input.chunks`. We expected an array'
    );

    return {
      chunks: filter(filterFunction, chunks),
      version
    };
  };
};
