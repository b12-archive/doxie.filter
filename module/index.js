const isFunction = require('1-liners/isFunction');
const filter = require('1-liners/filter');
const error = require('tiny-error')({prefix: '[doxie.filter] '});

export default (transformFunction) => {
  if (!isFunction(transformFunction)) throw error(
    'Wrong value of `transformFunction`. We expected a function'
  );

  return (data) => {
    if (!Array.isArray(data)) throw error(
      'Wrong value of `data`. We expected an array'
    );

    return filter(transformFunction, data);
  };
};
