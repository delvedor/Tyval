'use strict'

/* globals value, state */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const numberFunction = function () {
  // states if the value is a number
  const number = function () {
    number.validators = []
    number.validators.push({
      function: function number () {
        state = state && typeof value === 'number'
      },
      parameters: {}
    })
    return number
  }

  // states if the number is lower than the passed value
  number.max = function (max) {
    this.validators.push({
      function: function max () {
        state = state && value <= max
      },
      parameters: {
        max: max
      }
    })
    return this
  }

  // states if the number is higher than the passed value
  number.min = function (min) {
    this.validators.push({
      function: function min () {
        state = state && value >= min
      },
      parameters: {
        min: min
      }
    })
    return this
  }

  // states if the value is a positive number
  number.positive = function () {
    this.validators.push({
      function: function positive () {
        state = state && value > 0
      },
      parameters: {}
    })
    return this
  }

  // states if the value is a negative number
  number.negative = function () {
    this.validators.push({
      function: function negative () {
        state = state && value < 0
      },
      parameters: {}
    })
    return this
  }

  // states if the value is an Integer
  number.integer = function () {
    this.validators.push({
      function: function integer () {
        state = state && Number.isInteger(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the value is a Float
  number.float = function () {
    this.validators.push({
      function: function float () {
        state = state && !Number.isInteger(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the value is a safe integer
  number.safeInteger = function () {
    this.validators.push({
      function: function safeInteger () {
        state = state && Number.isSafeInteger(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the value is a finite number
  number.finite = function () {
    this.validators.push({
      function: function finite () {
        state = state && Number.isFinite(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the value if a multiple of the passed value
  number.multiple = function (mult) {
    this.validators.push({
      function: function multiple () {
        state = state && value % multiple === 0
      },
      parameters: {
        multiple: mult
      }
    })
    return this
  }

  // states if the value is not NaN
  number.notNaN = function () {
    this.validators.push({
      function: function notNaN () {
        state = state && !Number.isNaN(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the number is a valid network port number
  number.port = function (reserved) {
    this.validators.push({
      function: function port () {
        state = state && value <= 65535 && value >= (reserved ? 1024 : 0)
      },
      parameters: {
        reserved: reserved || false
      }
    })
    return this
  }

  // Extends a number function
  number.extend = function (func) {
    return common.extend(this, func)
  }

  number.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return number
}

module.exports = numberFunction()
