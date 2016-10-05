'use strict'

/* globals value */
/* eslint-disable no-undef */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

const object = function () {
  return toFunction(null, function () {
    if (typeof value !== 'object') {
      return false
    }
  })
}

// checks if the value object is empty
object.empty = function () {
  return toFunction(this, function () {
    if (Object.keys(value).length > 0) {
      return false
    }
  })
}

// checks if the value is not null (because typeof null = 'object')
object.notNull = function () {
  return toFunction(this, function () {
    if (value === null) {
      return false
    }
  })
}

// checks if the value is not an array (because typeof [] = 'object')
object.notArray = function notArray () {
  return toFunction(this, function () {
    if (Array.isArray(value)) {
      return false
    }
  })
}

// checks if the value is not a Date (because of typeof new Date() = 'object')
object.notDate = function notDate () {
  return toFunction(this, function () {
    if (value instanceof Date) {
      return false
    }
  })
}

// checks if the value is not a RegExp (becaus of typeof new RegExp() = 'object')
object.notRegExp = function notRegExp () {
  return toFunction(this, function () {
    if (value instanceof RegExp) {
      return false
    }
  })
}

// checks if the value has the passed key
// if fast is true the perf gets a ~10x speed
object.has = function has (haskey, options) {
  if (typeof haskey !== 'string') {
    throw new TypeError('object.has - haskey is not a string')
  }
  options = options || {}
  if (options.fast) {
    return toFunction(this, function () {
      if (value[$haskey$] === undefined) {
        return false
      }
    }, { $haskey$: haskey })
  } else {
    return toFunction(this, function () {
      if (!(value.hasOwnProperty($haskey$))) {
        return false
      }
    }, { $haskey$: haskey })
  }
}

// checks if the value has not the passed key
// if fast is true the perf gets a ~4x speed
object.hasNot = function (hasnotkey, options) {
  if (typeof hasnotkey !== 'string') {
    throw new TypeError('object.hasNot - hasnotkey is not a string')
  }
  options = options || {}
  if (options.fast) {
    return toFunction(this, function () {
      if (value[$hasnotkey$] !== undefined) {
        return false
      }
    }, { $hasnotkey$: hasnotkey })
  } else {
    return toFunction(this, function () {
      if (value.hasOwnProperty($hasnotkey$)) {
        return false
      }
    }, { $hasnotkey$: hasnotkey })
  }
}

// Extends an object function
object.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(object)
module.exports = object
