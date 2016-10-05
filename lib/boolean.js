'use strict'

/* globals value */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

const boolean = function () {
  return toFunction(null, function () {
    if (typeof value !== 'boolean') {
      return false
    }
  })
}

// Extends a boolean function
boolean.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(boolean)
module.exports = boolean
