'use strict'

/* globals value, errors */
/* eslint-disable no-native-reassign, no-undef */

const common = require('./common')

const errorFunction = function () {
  // checks if the value is an instance of Error
  const error = function error () {
    error.validators = []
    error.validators.push({
      function: function isError () {
        if (!(value instanceof Error)) {
          errors++
        }
      },
      parameters: {}
    })
    return error
  }

  // checks if the value is an instance of RangeError
  error.RangeError = function () {
    this.validators.push({
      function: function isRangeError () {
        if (!(value instanceof RangeError)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is an instance of ReferenceError
  error.ReferenceError = function () {
    this.validators.push({
      function: function isReferenceError () {
        if (!(value instanceof ReferenceError)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is an instance of SyntaxError
  error.SyntaxError = function () {
    this.validators.push({
      function: function isSyntaxError () {
        if (!(value instanceof SyntaxError)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is an instance of TypeError
  error.TypeError = function () {
    this.validators.push({
      function: function isTypeError () {
        if (!(value instanceof TypeError)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the error message is the same as the given parameter
  error.message = function (message) {
    if (typeof message !== 'string') {
      throw new Error('error message must be a string')
    }
    this.validators.push({
      function: function errorMessage () {
        if (value.message !== $message$) {
          errors++
        }
      },
      parameters: {
        $message$: message
      }
    })
    return this
  }

  // Extends an object function
  error.extend = function (func) {
    return common.extend(this, func)
  }

  error.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return error
}

module.exports = errorFunction()
