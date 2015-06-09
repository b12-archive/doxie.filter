import filter from './index';

const resolve = require('path').resolve;

export default (source = '.doxie.filter.js') => filter(
  require(resolve(process.cwd(), source))
);
