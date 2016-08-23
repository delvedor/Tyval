'use strict'

/* globals value, errors */
/* eslint-disable no-native-reassign, no-undef */

const common = require('./common')

const arrayFunction = function () {
  // checks if the value is an array
  const array = function () {
    array.validators = []
    array.validators.push({
      function: function isArray () {
        if (!Array.isArray(value)) {
          return false
        }
      },
      parameters: {}
    })
    return array
  }

  // checks if the array.length is higher than the passed value
  array.max = function max (max) {
    this.validators.push({
      function: function maxArray () {
        if (value.length > $max$) {
          errors++
        }
      },
      parameters: {
        $max$: max
      }
    })
    return this
  }

  // checks if the array.length is lower than the passed value
  array.min = function min (min) {
    this.validators.push({
      function: function minArray () {
        if (value.length < $min$) {
          errors++
        }
      },
      parameters: {
        $min$: min
      }
    })
    return this
  }

  // Makes writable the length object property
  Object.defineProperties(array, {
    'length': {
      writable: true
    }
  })
  // checks if the array.length is the same if the passed value
  array.length = function length (len) {
    this.validators.push({
      function: function lengthArray () {
        if (value.length !== $length$) {
          errors++
        }
      },
      parameters: {
        $length$: len
      }
    })
    return this
  }

  // checks if the array value contains the passed value
  array.contains = function contains (containValue) {
    this.validators.push({
      function: function contains () {
        if (value.indexOf($containValue$) === -1) {
          errors++
        }
      },
      parameters: {
        $containValue$: containValue
      }
    })
    return this
  }

  // checks if every array item is valid using the function passed as parameter
  array.items = function (func) {
    if (typeof func !== 'function') {
      throw new Error('array.items parameter must be a function')
    }
    this.validators.push({
      function: function items () {
        const validate = $func$
        for (let i = 0, len = value.length; i < len; i++) {
          if (!validate(value[i])) {
            errors++
          }
        }
      },
      parameters: {
        $func$: func
      }
    })
    return this
  }
  // Extends an array function
  array.extend = function (func) {
    return common.extend(this, func)
  }

  array.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return array
}

module.exports = arrayFunction()
