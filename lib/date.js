'use strict'
/* globals variable, check, newDate */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')
const dateFunction = function () {
  const date = function date () {
    date.validators = []
    date.parameters = {}
    date.validators.push(function date () {
      check = check && variable instanceof Date
    })
    return date
  }

  // Checks if the date variable is lower than the passed date
  date.lower = function (d) {
    this.parameters.newDate = d.getTime()
    this.validators.push(function lower () {
      check = check && variable.getTime() < newDate
    })
    return this
  }

  // Checks if the date variable is higher than the passed date
  date.higher = function (d) {
    this.parameters.newDate = d.getTime()
    this.validators.push(function higher () {
      check = check && variable.getTime() > newDate
    })
    return this
  }
  // Extends a date function
  date.extend = function (func) {
    this[func.name] = func
  }

  date.toFunction = function () {
    return common.toFunction(date.validators, date.parameters)
  }
  return date
}

module.exports = dateFunction()
