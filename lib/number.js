'use strict'

/* globals value, errors */
/* eslint-disable no-native-reassign, no-undef */

const common = require('./common')

const numberFunction = function () {
  // checks if the value is a number
  const number = function () {
    number.validators = []
    number.validators.push({
      function: function number () {
        if (typeof value !== 'number') {
          errors++
        }
      },
      parameters: {}
    })
    return number
  }

  // checks if the number is lower than the passed value
  number.max = function (max) {
    this.validators.push({
      function: function max () {
        if (value > $max$) {
          errors++
        }
      },
      parameters: {
        $max$: max
      }
    })
    return this
  }

  // checks if the number is higher than the passed value
  number.min = function (min) {
    this.validators.push({
      function: function min () {
        if (value < $min$) {
          errors++
        }
      },
      parameters: {
        $min$: min
      }
    })
    return this
  }

  // checks if the value is a positive number
  number.positive = function () {
    this.validators.push({
      function: function positive () {
        if (value < 0) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a negative number
  number.negative = function () {
    this.validators.push({
      function: function negative () {
        if (value > 0) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is an Integer
  number.integer = function () {
    // Thanks to https://github.com/mafintosh/is-my-json-valid
    this.validators.push({
      function: function integer () {
        if (!(Math.floor(value) === value || value > 9007199254740992 || value < -9007199254740992)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a Float
  number.float = function () {
    // Thanks to https://github.com/mafintosh/is-my-json-valid
    this.validators.push({
      function: function float () {
        if (Math.floor(value) === value || value > 9007199254740992 || value < -9007199254740992) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a safe integer
  number.safeInteger = function () {
    this.validators.push({
      function: function safeInteger () {
        if (value > 9007199254740991 || value < -9007199254740991) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a finite number
  number.finite = function () {
    this.validators.push({
      function: function finite () {
        if (!Number.isFinite(value)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value if a multiple of the passed value
  number.multiple = function (mult) {
    this.validators.push({
      function: function multiple () {
        if (value % $multiple$ !== 0) {
          errors++
        }
      },
      parameters: {
        $multiple$: mult
      }
    })
    return this
  }

  // checks if the value is not NaN
  number.notNaN = function () {
    this.validators.push({
      function: function notNaN () {
        if (Number.isNaN(value)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the number is a valid network port number
  number.port = function (reserved) {
    this.validators.push({
      function: function port () {
        if (value > 65535 || value < ($reserved$ ? 1024 : 0)) {
          errors++
        }
      },
      parameters: {
        $reserved$: reserved || false
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
