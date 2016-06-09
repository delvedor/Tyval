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
    this.validators.push(function empty () {
      check = check && Object.keys(variable).length === 0
    })
    return this
  }

  // Checks if the variable is not null (because typeof null = 'object')
  object.notNull = function notNull () {
    this.validators.push(function notNull () {
      check = check && variable !== null
    })
    return this
  }

  // Checks if the variable is not an array (because typeof [] = 'object')
  object.notArray = function notArray () {
    this.validators.push(function notArray () {
      check = check && !Array.isArray(variable)
    })
    return this
  }

  // Checks if the variable is not a Date (because of typeof new Date() = 'object')
  object.notDate = function notDate () {
    this.validators.push(function notDate () {
      check = check && !(variable instanceof Date)
    })
    return this
  }

  // Checks if the variable is not a RegExp (becaus of typeof new RegExp() = 'object')
  object.notRegExp = function notRegExp () {
    this.validators.push(function notRegExp () {
      check = check && !(variable instanceof RegExp)
    })
    return this
  }

  // Checks if the variable has the passed key
  // if fast is true the perf gets a ~10x speed
  object.has = function has (haskey, fast) {
    this.parameters.haskey = haskey
    if (fast) {
      this.validators.push(function has () {
        check = check && variable[haskey] !== undefined
      })
    } else {
      this.validators.push(function has () {
        check = check && variable.hasOwnProperty(haskey)
      })
    }
    return this
  }

  // Checks if the variable has not the passed key
  // if fast is true the perf gets a ~4x speed
  object.hasNot = function (hasnotkey, fast) {
    this.parameters.hasnotkey = hasnotkey
    if (fast) {
      this.validators.push(function has () {
        check = check && variable[hasnotkey] === undefined
      })
    } else {
      this.validators.push(function has () {
        check = check && !variable.hasOwnProperty(hasnotkey)
      })
    }
    return this
  }

  // Extends an object function
  object.extend = function (func) {
    this[func.name] = func
  }

  object.toFunction = function () {
    return common.toFunction(object.validators, object.parameters)
  }
  return object
}

module.exports = objectFunction()
