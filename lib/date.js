'use strict'
/* globals value, state, newDate */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const dateFunction = function () {
  const date = function date () {
    date.validators = []
    date.validators.push({
      function: function date () {
        state = state && value instanceof Date
      },
      parameters: {}
    })
    return date
  }

  // states if the date value is lower than the passed date
  date.lower = function (d) {
    this.validators.push({
      function: function lower () {
        state = state && value.getTime() < newDate
      },
      parameters: {
        newDate: d.getTime()
      }
    })
    return this
  }

  // states if the date value is higher than the passed date
  date.higher = function (d) {
    this.validators.push({
      function: function higher () {
        state = state && value.getTime() > newDate
      },
      parameters: {
        newDate: d.getTime()
      }
    })
    return this
  }

  // Extends a date function
  date.extend = function (func) {
    return common.extend(this, func)
  }

  date.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return date
}

module.exports = dateFunction()
