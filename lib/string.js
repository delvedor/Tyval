'use string'

/* globals variable, check  */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')
const stringFunction = function () {
  // Checks if the variable is a string
  const string = function () {
    string.validators = []
    string.parameters = {}
    string.validators.push(function string () {
      check = check && typeof variable === 'string'
    })
    return string
  }

  // Checks if the string is alphanumberic
  string.alphanum = function () {
    this.validators.push(function alphanum () {
      const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
      check = check && reg.test(variable)
    })
    return this
  }

  // Tests the regex passed as input
  string.regex = function (reg, flag) {
    this.parameters.reg = reg
    this.validators.push(function regex () {
      check = check && reg.test(variable)
    })
    return this
  }

  // Checks if the string.length is lower than the passed max value
  string.max = function (max) {
    this.parameters.max = max
    this.validators.push(function max () {
      check = check && variable.length <= max
    })
    return this
  }

  // Checks if the string.length is higher than the passed value
  string.min = function (min) {
    this.parameters.min = min
    this.validators.push(function min () {
      check = check && variable.length >= min
    })
    return this
  }

  // Makes writable the length object property
  Object.defineProperties(string, {
    'length': {
      writable: true
    }
  })
  // Checks if the string.length is the same than the passed value
  string.length = function (len) {
    this.parameters.length = len
    this.validators.push(function length () {
      check = check && variable.length === length
    })
    return this
  }

  // Checks if the variable is a valid mail string
  string.mail = function () {
    // Thanks to: https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    this.validators.push(function mail () {
      const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      check = check && mailReg.test(variable)
    })
    return this
  }

  // Checks if the variable is a valid ipv4 string
  string.ipv4 = function () {
    this.validators.push(function ipv4 () {
      const ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      check = check && ipReg.test(variable)
    })
    return this
  }

  string.ipv6 = function () {
    // Thanks to: https://community.helpsystems.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4
    this.validators.push(function ipv6 () {
      const ipReg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
      check = check && ipReg.test(variable)
    })
    return this
  }

  // Extends a string function
  string.extend = function (func) {
    this[func.name] = func
  }

  string.toFunction = function () {
    return common.toFunction(string.validators, string.parameters)
  }
  return string
}

module.exports = stringFunction()
