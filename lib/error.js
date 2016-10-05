'use strict'

/* globals value, $message$ */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

// checks if the value is an instance of Error
const error = function () {
  return toFunction(null, function () {
    if (!(value instanceof Error)) {
      return false
    }
  })
}

// checks if the value is an instance of RangeError
error.RangeError = function () {
  return toFunction(this, function () {
    if (!(value instanceof RangeError)) {
      return false
    }
  })
}

// checks if the value is an instance of ReferenceError
error.ReferenceError = function () {
  return toFunction(this, function () {
    if (!(value instanceof ReferenceError)) {
      return false
    }
  })
}

// checks if the value is an instance of SyntaxError
error.SyntaxError = function () {
  return toFunction(this, function () {
    if (!(value instanceof SyntaxError)) {
      return false
    }
  })
}

// checks if the value is an instance of TypeError
error.TypeError = function () {
  return toFunction(this, function () {
    if (!(value instanceof TypeError)) {
      return false
    }
  })
}

// checks if the error message is the same as the given parameter
error.message = function (message) {
  if (typeof message !== 'string') {
    throw new Error('error message must be a string')
  }
  return toFunction(this, function () {
    if (value.message !== $message$) {
      return false
    }
  }, { $message$: message })
}

// Extends an object function
error.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(error)
module.exports = error
