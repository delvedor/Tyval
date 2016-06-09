'use strict'

/* globals variable, check */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const numberFunction = function () {
  // Checks if the variable is a number
  const number = function () {
    number.validators = []
    number.parameters = {}
    number.validators.push(function number () {
      check = check && typeof variable === 'number'
    })
    return number
  }

  // Checks if the number is lower than the passed value
  number.max = function (max) {
    this.parameters.max = max
    this.validators.push(function max () {
      check = check && variable <= max
    })
    return this
  }

  // Checks if the number is higher than the passed value
  number.min = function (min) {
    this.parameters.min = min
    this.validators.push(function min () {
      check = check && variable >= min
    })
    return this
  }

  // Checks if the variable is a positive number
  number.positive = function () {
    this.validators.push(function positive () {
      check = check && variable > 0
    })
    return this
  }

  // Checks if the variable is a negative number
  number.negative = function () {
    this.validators.push(function negative () {
      check = check && variable < 0
    })
    return this
  }

  // Checks if the variable is an Integer
  number.integer = function () {
    this.validators.push(function integer () {
      check = check && Number.isInteger(variable)
    })
    return this
  }

  // Checks if the variable is a Float
  number.float = function () {
    this.validators.push(function float () {
      check = check && !Number.isInteger(variable)
    })
    return this
  }

  // Checks if the variable is a safe integer
  number.safeInteger = function () {
    this.validators.push(function safeInteger () {
      check = check && Number.isSafeInteger(variable)
    })
    return this
  }

  // Checks if the variable is a finite number
  number.finite = function () {
    this.validators.push(function finite () {
      check = check && Number.isFinite(variable)
    })
    return this
  }

  // Checks if the variable if a multiple of the passed value
  number.multiple = function (mult) {
    this.parameters.multiple = mult
    this.validators.push(function multiple () {
      check = check && variable % multiple === 0
    })
    return this
  }

  // Checks if the variable is not NaN
  number.notNaN = function () {
    this.validators.push(function notNaN () {
      check = check && !Number.isNaN(variable)
    })
    return this
  }

  // Extends a number function
  number.extend = function (func) {
    this[func.name] = func
  }

  number.toFunction = function () {
    return common.toFunction(this.validators, this.parameters)
  }
  return number
}

module.exports = numberFunction()
