'use string'

/* globals variable, check  */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')
const stringFunction = function () {
  // Checks if the variable is a string
  const string = function () {
    string.validators = []
    string.parameters = {}
    string.validators.push(function string () {
      check = check && typeof variable === 'string'
    })
    return string
  }

  // Checks if the string is alphanumberic
  string.alphanum = function () {
    string.validators.push(function alphanum () {
      const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
      check = check && reg.test(variable)
    })
    return this
  }

  // Tests the regex passed as input
  string.regex = function (reg, flag) {
    string.parameters.reg = reg
    string.validators.push(function regex () {
      check = check && reg.test(variable)
    })
    return this
  }

  // Checks if the string.length is lower than the passed max value
  string.max = function (max) {
    string.parameters.max = max
    string.validators.push(function max () {
      check = check && variable.length <= max
    })
    return this
  }

  // Checks if the string.length is higher than the passed value
  string.min = function (min) {
    string.parameters.min = min
    string.validators.push(function min () {
      check = check && variable.length >= min
    })
    return this
  }

  // Makes writable the length object property
  Object.defineProperties(string, {
    'length': {
      writable: true
    }
  })
  // Checks if the string.length is the same than the passed value
  string.length = function (len) {
    string.parameters.length = len
    string.validators.push(function length () {
      check = check && variable.length === length
    })
    return this
  }

  // Extends a string function
  string.extend = function (func) {
    string[func.name] = func
  }

  string.toFunction = function () {
    return common.toFunction(string.validators, string.parameters)
  }
  return string
}

module.exports = stringFunction()
