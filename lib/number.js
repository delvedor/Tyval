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
    number.parameters.max = max
    number.validators.push(function max () {
      check = check && variable <= max
    })
    return this
  }

  // Checks if the number is higher than the passed value
  number.min = function (min) {
    number.parameters.min = min
    number.validators.push(function min () {
      check = check && variable >= min
    })
    return this
  }

  // Checks if the variable is a positive number
  number.positive = function () {
    number.validators.push(function positive () {
      check = check && variable > 0
    })
    return this
  }

  // Checks if the variable is a negative number
  number.negative = function () {
    number.validators.push(function negative () {
      check = check && variable < 0
    })
    return this
  }

  // Checks if the variable is an Integer
  number.integer = function () {
    number.validators.push(function integer () {
      check = check && Number.isInteger(variable)
    })
    return this
  }

  // Checks if the variable is a Float
  number.float = function () {
    number.validators.push(function float () {
      check = check && !Number.isInteger(variable)
    })
    return this
  }

  // Checks if the variable is a safe integer
  number.safeInteger = function () {
    number.validators.push(function safeInteger () {
      check = check && Number.isSafeInteger(variable)
    })
    return this
  }

  // Checks if the variable is a finite number
  number.finite = function () {
    number.validators.push(function finite () {
      check = check && Number.isFinite(variable)
    })
    return this
  }

  // Checks if the variable if a multiple of the passed value
  number.multiple = function (mult) {
    number.parameters.multiple = mult
    number.validators.push(function multiple () {
      check = check && variable % multiple === 0
    })
    return this
  }

  // Extends a number function
  number.extend = function (func) {
    number[func.name] = func
  }

  number.toFunction = function () {
    return common.toFunction(number.validators, number.parameters)
  }
  return number
}

module.exports = numberFunction()
