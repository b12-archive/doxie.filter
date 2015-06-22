import error from './tools/error';

const isFunction = require('1-liners/isFunction');
const filter = require('1-liners/filter');

export default (filterFunction) => {
  if (!isFunction(filterFunction)) throw error(
    'Wrong value of `filterFunction`. We expected a function.'
  );

  return (input = {}) => {
    let {version, docs} = input;
    if (!Array.isArray(docs = input.docs)) throw error(
      'Wrong value of `input.docs`. We expected an array.'
    );

    return {
      docs: filter(filterFunction, docs),
      version
    };
  };
};
