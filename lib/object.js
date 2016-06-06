'use strict'
/* globals variable, check */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const objectFunction = function () {
  const object = function object () {
    object.validators = []
    object.parameters = {}
    object.validators.push(function object () {
      check = check && typeof variable === 'object'
    })
    return object
  }

  // Checks if the variable object is empty
  object.empty = function empty () {
    object.validators.push(function empty () {
      check = check && Object.keys(variable).length === 0
    })
    return this
  }

  // Extends an object function
  object.extend = function (func) {
    object[func.name] = func
  }

  object.toFunction = function () {
    return common.toFunction(object.validators, object.parameters)
  }
  return object
}

module.exports = objectFunction()
