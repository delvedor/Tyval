'use strict'
/* globals variable, check */
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
  // date.lower
  // date.higher
  // date.year
  // date.month
  // date.day

  // Extends a date function
  date.extend = function (func) {
    date[func.name] = func
  }

  date.toFunction = function () {
    return common.toFunction(date.validators, date.parameters)
  }
  return date
}

module.exports = dateFunction()
