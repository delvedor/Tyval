'use strict'
/* globals variable, check */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const arrayFunction = function () {
  // Checks if the variable is an array
  const array = function () {
    array.validators = []
    array.parameters = {}
    array.validators.push(function isArray () {
      check = check && Array.isArray(variable)
    })
    return array
  }

  // Checks if the array.length is higher than the passed value
  array.max = function max (max) {
    this.parameters.max = max
    this.validators.push(function maxArray () {
      check = check && variable.length <= max
    })
    return this
  }

  // Checks if the array.length is lower than the passed value
  array.min = function min (min) {
    this.parameters.min = min
    this.validators.push(function minArray () {
      check = check && variable.length >= min
    })
    return this
  }

  // Makes writable the length object property
  Object.defineProperties(array, {
    'length': {
      writable: true
    }
  })
  // Checks if the array.length is the same if the passed value
  array.length = function length (len) {
    this.parameters.length = len
    this.validators.push(function lengthArray () {
      check = check && variable.length === length
    })
    return this
  }

  // Checks if the array variable contains the passed value
  array.contains = function contains (containValue) {
    this.parameters.containValue = containValue
    this.validators.push(function contains () {
      check = check && variable.indexOf(containValue) !== -1
    })
    return this
  }

  // Extends an array function
  array.extend = function (func) {
    this[func.name] = func
  }

  array.toFunction = function () {
    return common.toFunction(array.validators, array.parameters)
  }
  return array
}

module.exports = arrayFunction()
