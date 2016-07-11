'use strict'
/* globals value, state */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const booleanFunction = function () {
  const boolean = function () {
    boolean.validators = []
    boolean.validators.push({
      function: function boolean () {
        state = state && typeof value === 'boolean'
      },
      parameters: {}
    })
    return boolean
  }

  // Extends a boolean function
  boolean.extend = function (func) {
    return common.extend(this, func)
  }

  boolean.toFunction = function () {
    return common.toFunction(this.validators)
  }
  return boolean
}

module.exports = booleanFunction()
