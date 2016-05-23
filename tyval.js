/*
 * Project: Tyval
 * Version: 1.0.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: MIT
 * GitHub: https://github.com/delvedor/Tyval
 */

'use strict'

// Tyval Constructor
function tyval (variable, planned) {
  return new tyval.Init(variable, planned)
}

tyval.prototype = {
  // Checks if the variable is a string
  isString: function () {
    this.check &= this.type === 'string'
    return this.plan()
  },

  // Checks if the variable is a number
  isNumber: function () {
    this.check &= this.type === 'number'
    return this.plan()
  },

  // Checks if the variable is null
  isNull: function () {
    this.check &= this.type === 'null'
    return this.plan()
  },

  // Checks if the variable is undefined
  isUndefined: function () {
    this.check &= this.type === 'undefined'
    return this.plan()
  },

  // Checks if the variable is a boolean
  isBoolean: function () {
    this.check &= this.type === 'boolean'
    return this.plan()
  },

  // Checks if the variable is an object
  isObject: function () {
    this.check &= this.type === 'object'
    return this.plan()
  },

  // Checks if the variable is a function
  isFunction: function () {
    this.check &= this.type === 'function'
    return this.plan()
  },

  // Checks if the string is alphanumeric
  alphanum: function () {
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
    this.check &= reg.test(this.variable)
    return this.plan()
  },

  // Tests the regex passed as input
  regex: function (reg) {
    this.check &= reg.test(this.variable)
    return this.plan()
  },

  // Checks if the variable is lower than the passed max value
  max: function (max = 0) {
    switch (this.type) {
      case 'number':
        this.check &= this.variable <= max
        break
      case 'string':
        this.check &= this.variable.length <= max
        break
      default:
        this.check = false
    }
    return this.plan()
  },

  // Checks if the variable is higher than the passed min value
  min: function (min = 0) {
    switch (this.type) {
      case 'number':
        this.check &= this.variable >= min
        break
      case 'string':
        this.check &= this.variable.length >= min
        break
      default:
        this.check = false
    }
    return this.plan()
  },

  positive: function () {
    this.check &= this.variable > 0
    return this.plan()
  },

  negative: function () {
    this.check &= this.variable < 0
    return this.plan()
  },

  // Checks if the Number is an Integer
  integer: function () {
    this.check &= Number.isInteger(this.variable)
    return this.plan()
  },

  // Checks if the Number is a Float
  float: function () {
    this.check &= !Number.isInteger(this.variable)
    return this.plan()
  },

  // Checks if the Number is a safe Integer
  safeInteger: function () {
    this.check &= Number.isSafeInteger(this.variable)
    return this.plan()
  },

  // Checks if the Number is finite
  finite: function () {
    this.check &= Number.isFinite(this.variable)
    return this.plan()
  },

  // Adds a new function to Tyval
  extend: function (func) {
    tyval.prototype[func.name] = func
    return this.plan()
  },

  // Checks if all the planned tests are over
  plan: function () {
    return this.planned === ++this.passed ? !!this.check : this
  }
}

// Trick borrowed from jQuery
tyval.Init = function (variable, planned) {
  if (!(this instanceof tyval.Init)) return new tyval.Init(variable, planned)
  // Binary validator
  tyval.prototype.check = 1
  // Variable passed as input
  tyval.prototype.variable = variable
  // Type of the variable
  // the conditional operator because typeof null = 'object'
  tyval.prototype.type = variable === null ? 'null' : typeof variable
  // planned validation test
  tyval.prototype.planned = planned
  // how many test are over
  tyval.prototype.passed = 0
}

tyval.Init.prototype = tyval.prototype

module.exports = tyval
