/*
 * Project: Tyval
 * Version: 4.0.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: MIT
 * GitHub: https://github.com/delvedor/Tyval
 */

'use strict'

module.exports = {
  number: require('./lib/number'),
  string: require('./lib/string'),
  array: require('./lib/array'),
  date: require('./lib/date'),
  boolean: require('./lib/boolean'),
  object: require('./lib/object'),
  error: require('./lib/error'),
  or: require('./lib/common').or
}
