'use strict'
/* globals value, state */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const objectFunction = function () {
  const object = function object () {
    object.validators = []
    object.validators.push({
      function: function object () {
        state = state && typeof value === 'object'
      },
      parameters: {}
    })
    return object
  }

  // states if the value object is empty
  object.empty = function empty () {
    this.validators.push({
      function: function empty () {
        state = state && Object.keys(value).length === 0
      },
      parameters: {}
    })
    return this
  }

  // states if the value is not null (because typeof null = 'object')
  object.notNull = function notNull () {
    this.validators.push({
      function: function notNull () {
        state = state && value !== null
      },
      parameters: {}
    })
    return this
  }

  // states if the value is not an array (because typeof [] = 'object')
  object.notArray = function notArray () {
    this.validators.push({
      function: function notArray () {
        state = state && !Array.isArray(value)
      },
      parameters: {}
    })
    return this
  }

  // states if the value is not a Date (because of typeof new Date() = 'object')
  object.notDate = function notDate () {
    this.validators.push({
      function: function notDate () {
        state = state && !(value instanceof Date)
      },
      parameters: {}
    })
    return this
  }

  // states if the value is not a RegExp (becaus of typeof new RegExp() = 'object')
  object.notRegExp = function notRegExp () {
    this.validators.push({
      function: function notRegExp () {
        state = state && !(value instanceof RegExp)
      },
      parameters: {}
    })
    return this
  }

  // states if the value has the passed key
  // if fast is true the perf gets a ~10x speed
  object.has = function has (haskey, fast) {
    if (fast) {
      this.validators.push({
        function: function has () {
          state = state && value[haskey] !== undefined
        },
        parameters: {
          haskey: haskey
        }
      })
    } else {
      this.validators.push({
        function: function has () {
          state = state && value.hasOwnProperty(haskey)
        },
        parameters: {
          haskey: haskey
        }
      })
    }
    return this
  }

  // states if the value has not the passed key
  // if fast is true the perf gets a ~4x speed
  object.hasNot = function (hasnotkey, fast) {
    if (fast) {
      this.validators.push({
        function: function hasNot () {
          state = state && value[hasnotkey] === undefined
        },
        parameters: {
          hasnotkey: hasnotkey
        }
      })
    } else {
      this.validators.push({
        function: function hasNot () {
          state = state && !value.hasOwnProperty(hasnotkey)
        },
        parameters: {
          hasnotkey: hasnotkey
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
