'use strict'

/* globals value, $newDate$ */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

const date = function () {
  return toFunction(null, function () {
    if (!(value instanceof Date)) {
      return false
    }
  })
}

// checks if the date value is lower than the passed date
date.lower = function (d) {
  return toFunction(this, function () {
    if (value.getTime() >= $newDate$) {
      return false
    }
  }, { $newDate$: d.getTime() })
}

// checks if the date value is higher than the passed date
date.higher = function (d) {
  return toFunction(this, function () {
    if (value.getTime() <= $newDate$) {
      return false
    }
  }, { $newDate$: d.getTime() })
}

// Extends a date function
date.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(date)
module.exports = date
