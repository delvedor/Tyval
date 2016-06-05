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
    array.parameters.max = max
    array.validators.push(function maxArray () {
      check = check && variable.length <= max
    })
    return this
  }

  // Checks if the array.length is lower than the passed value
  array.min = function min (min) {
    array.parameters.min = min
    array.validators.push(function minArray () {
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
    array.parameters.length = len
    array.validators.push(function lengthArray () {
      check = check && variable.length === length
    })
    return this
  }

  // Extends an array function
  array.extend = function (func) {
    array[func.name] = func
  }

  array.toFunction = function () {
    return common.toFunction(array.validators, array.parameters)
  }
  return array
}

module.exports = arrayFunction()
