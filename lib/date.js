'use strict'

/* globals value, errors, $newDate$ */
/* eslint-disable no-native-reassign */

const common = require('./common')

const dateFunction = function () {
  const date = function date () {
    date.validators = []
    date.validators.push({
      function: function date () {
        if (!(value instanceof Date)) {
          errors++
        }
      },
      parameters: {}
    })
    return date
  }

  // checks if the date value is lower than the passed date
  date.lower = function (d) {
    this.validators.push({
      function: function lower () {
        if (value.getTime() >= $newDate$) {
          errors++
        }
      },
      parameters: {
        $newDate$: d.getTime()
      }
    })
    return this
  }

  // checks if the date value is higher than the passed date
  date.higher = function (d) {
    this.validators.push({
      function: function higher () {
        if (value.getTime() <= $newDate$) {
          errors++
        }
      },
      parameters: {
        $newDate$: d.getTime()
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
