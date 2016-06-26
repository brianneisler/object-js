/*
 * Copyright (c) 2016 Brian Neisler. http://brianneisler.com
 *
 * object-js may be freely distributed under the MIT license.
 */
if (!global._babelPolyfill) {
  require('babel-polyfill');
}
module.exports = require('./dist');
