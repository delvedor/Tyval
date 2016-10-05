'use strict'

/* globals value */
/* eslint-disable no-undef */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

// checks if the value is an array
const array = function () {
  return toFunction(null, function () {
    if (!Array.isArray(value)) {
      return false
    }
  })
}

// checks if the array.length is higher than the passed value
array.max = function (max) {
  if (typeof max !== 'number') {
    throw new TypeError('array.max - max is not a number')
  }
  return toFunction(this, function () {
    if (value.length > $max$) {
      return false
    }
  }, { $max$: max })
}

// checks if the array.length is lower than the passed value
array.min = function (min) {
  if (typeof min !== 'number') {
    throw new TypeError('array.min - min is not a number')
  }
  return toFunction(this, function () {
    if (value.length < $min$) {
      return false
    }
  }, { $min$: min })
}

// Makes writable the length object property
Object.defineProperty(array, 'length', {
  writable: true
})
// checks if the array.length is the same if the passed value
array.length = function (len) {
  if (typeof len !== 'number') {
    throw new TypeError('array.length - len is not a number')
  }
  return toFunction(this, function () {
    if (value.length !== $length$) {
      return false
    }
  }, { $length$: len })
}

// checks if the array value contains the passed value
array.contains = function (containValue) {
  return toFunction(this, function () {
    if (value.indexOf($containValue$) === -1) {
      return false
    }
  }, { $containValue$: containValue })
}

// checks if every array item is valid using the function passed as parameter
array.items = function (func) {
  if (typeof func !== 'function') {
    throw new TypeError('array.items parameter must be a function')
  }
  return toFunction(this, function () {
    const validate = $func$
    for (let i = 0, len = value.length; i < len; i++) {
      if (!validate(value[i])) {
        return false
      }
    }
  }, { $func$: func })
}

// Extends an array function
array.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(array)
module.exports = array
