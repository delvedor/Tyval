'use strict'

/* globals value, errors */
/* eslint-disable no-native-reassign, no-undef */

const common = require('./common')

const objectFunction = function () {
  const object = function object () {
    object.validators = []
    object.validators.push({
      function: function object () {
        if (typeof value !== 'object') {
          return false
        }
      },
      parameters: {}
    })
    return object
  }

  // checks if the value object is empty
  object.empty = function empty () {
    this.validators.push({
      function: function empty () {
        if (Object.keys(value).length > 0) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is not null (because typeof null = 'object')
  object.notNull = function notNull () {
    this.validators.push({
      function: function notNull () {
        if (value === null) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is not an array (because typeof [] = 'object')
  object.notArray = function notArray () {
    this.validators.push({
      function: function notArray () {
        if (Array.isArray(value)) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is not a Date (because of typeof new Date() = 'object')
  object.notDate = function notDate () {
    this.validators.push({
      function: function notDate () {
        if (value instanceof Date) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is not a RegExp (becaus of typeof new RegExp() = 'object')
  object.notRegExp = function notRegExp () {
    this.validators.push({
      function: function notRegExp () {
        if (value instanceof RegExp) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value has the passed key
  // if fast is true the perf gets a ~10x speed
  object.has = function has (haskey, fast) {
    if (fast) {
      this.validators.push({
        function: function has () {
          if (value[$haskey$] === undefined) {
            errors++
          }
        },
        parameters: {
          $haskey$: haskey
        }
      })
    } else {
      this.validators.push({
        function: function has () {
          if (!(value.hasOwnProperty($haskey$))) {
            errors++
          }
        },
        parameters: {
          $haskey$: haskey
        }
      })
    }
    return this
  }

  // checks if the value has not the passed key
  // if fast is true the perf gets a ~4x speed
  object.hasNot = function (hasnotkey, fast) {
    if (fast) {
      this.validators.push({
        function: function hasNot () {
          if (value[$hasnotkey$] !== undefined) {
            errors++
          }
        },
        parameters: {
          $hasnotkey$: hasnotkey
        }
      })
    } else {
      this.validators.push({
        function: function hasNot () {
          if (value.hasOwnProperty($hasnotkey$)) {
            errors++
          }
        },
        parameters: {
          $hasnotkey$: hasnotkey
        }
      })
    }
    return this
  }

  // Extends an object function
  object.extend = function (func) {
    return common.extend(this, func)
  }

  object.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return object
}

module.exports = objectFunction()
