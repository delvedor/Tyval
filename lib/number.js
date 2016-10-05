'use strict'

/* globals value */
/* eslint-disable no-undef */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

// checks if the value is a number
const number = function () {
  return toFunction(null, function () {
    if (typeof value !== 'number') {
      return false
    }
  })
}

// checks if the number is lower than the passed value
number.max = function (max) {
  if (typeof max !== 'number') {
    throw new TypeError('number.max - max is not a number')
  }
  return toFunction(this, function () {
    if (value > $max$) {
      return false
    }
  }, { $max$: max })
}

// checks if the number is higher than the passed value
number.min = function (min) {
  if (typeof min !== 'number') {
    throw new TypeError('number.min - min is not a number')
  }
  return toFunction(this, function () {
    if (value < $min$) {
      return false
    }
  }, { $min$: min })
}

// checks if the value is a positive number
number.positive = function () {
  return toFunction(this, function () {
    if (value < 0) {
      return false
    }
  })
}

// checks if the value is a negative number
number.negative = function () {
  return toFunction(this, function () {
    if (value > 0) {
      return false
    }
  })
}

// checks if the value is an Integer
number.integer = function () {
  // Thanks to https://github.com/mafintosh/is-my-json-valid
  return toFunction(this, function () {
    if (!(Math.floor(value) === value || value > 9007199254740992 || value < -9007199254740992)) {
      return false
    }
  })
}

// checks if the value is a Float
number.float = function () {
  // Thanks to https://github.com/mafintosh/is-my-json-valid
  return toFunction(this, function () {
    if (Math.floor(value) === value || value > 9007199254740992 || value < -9007199254740992) {
      return false
    }
  })
}

// checks if the value is a safe integer
number.safeInteger = function () {
  return toFunction(this, function () {
    if (value > 9007199254740991 || value < -9007199254740991) {
      return false
    }
  })
}

// checks if the value is a finite number
number.finite = function () {
  return toFunction(this, function () {
    if (!Number.isFinite(value)) {
      return false
    }
  })
}

// checks if the value if a multiple of the passed value
number.multiple = function (mult) {
  if (typeof mult !== 'number') {
    throw new TypeError('number.multiple - mult is not a number')
  }
  return toFunction(this, function () {
    if (value % $multiple$ !== 0) {
      return false
    }
  }, { $multiple$: mult })
}

// checks if the value is not NaN
number.notNaN = function () {
  return toFunction(this, function () {
    if (Number.isNaN(value)) {
      return false
    }
  })
}

// checks if the number is a valid network port number
number.port = function (options) {
  options = options || {}
  return toFunction(this, function () {
    if (value > 65535 || value < ($reserved$ ? 1024 : 0)) {
      return false
    }
  }, { $reserved$: options.reserved || false })
}

// Extends a number function
number.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(number)
module.exports = number
