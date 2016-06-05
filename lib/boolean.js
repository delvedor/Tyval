'use strict'
/* globals variable, check */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const booleanFunction = function () {
  const boolean = function (strict) {
    boolean.validators = []
    boolean.parameters = {}
    boolean.validators.push(function boolean () {
      check = check && typeof variable === 'boolean'
    })
    return boolean
  }

  // Extends a boolean function
  boolean.extend = function (func) {
    boolean[func.name] = func
  }

  boolean.toFunction = function () {
    return common.toFunction(boolean.validators, boolean.parameters)
  }
  return boolean
}

module.exports = booleanFunction()
