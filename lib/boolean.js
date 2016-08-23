'use strict'

/* globals value */
/* eslint-disable no-native-reassign */

const common = require('./common')

const booleanFunction = function () {
  const boolean = function () {
    boolean.validators = []
    boolean.validators.push({
      function: function boolean () {
        if (typeof value !== 'boolean') {
          return false
        }
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
