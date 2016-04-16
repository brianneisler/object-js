/*
 * Copyright (c) 2016 Brian Neisler. http://brianneisler.com
 *
 * object-js may be freely distributed under the MIT license.
 */
require('babel-polyfill');
const _ = require('lodash');
const modules = require('./dist');
const def = modules.default;
module.exports = _.assign(def, _.omit(modules, ['default']));

