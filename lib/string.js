'use string'

/* globals value, state  */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const common = require('./common')

const stringFunction = function () {
  // checks if the value is a string
  const string = function () {
    string.validators = []
    string.validators.push({
      function: function string () {
        state = state && typeof value === 'string'
      },
      parameters: {}
    })
    return string
  }

  // checks if the string is alphanumberic
  string.alphanum = function () {
    this.validators.push({
      function: function alphanum () {
        const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
        state = state && reg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // Tests the regex passed as input
  string.regex = function (reg) {
    this.validators.push({
      function: function regex () {
        state = state && reg.test(value)
      },
      parameters: {
        reg: reg
      }
    })
    return this
  }

  // checks if the string.length is lower than the passed max value
  string.max = function (max) {
    this.validators.push({
      function: function max () {
        state = state && value.length <= max
      },
      parameters: {
        max: max
      }
    })
    return this
  }

  // checks if the string.length is higher than the passed value
  string.min = function (min) {
    this.validators.push({
      function: function min () {
        state = state && value.length >= min
      },
      parameters: {
        min: min
      }
    })
    return this
  }

  // Makes writable the length object property
  Object.defineProperties(string, {
    'length': {
      writable: true
    }
  })
  // checks if the string.length is the same than the passed value
  string.length = function (len) {
    this.validators.push({
      function: function length () {
        state = state && value.length === length
      },
      parameters: {
        length: len
      }
    })
    return this
  }

  // checks if the value is a valid mail string
  string.mail = function () {
    // Thanks to: https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    this.validators.push({
      function: function mail () {
        const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        state = state && mailReg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid ipv4 string
  string.ipv4 = function () {
    this.validators.push({
      function: function ipv4 () {
        const ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        state = state && ipReg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid ipv6 string
  string.ipv6 = function () {
    // Thanks to: https://community.helpsystems.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4
    this.validators.push({
      function: function ipv6 () {
        const ipReg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
        state = state && ipReg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid base64 string
  string.base64 = function () {
    this.validators.push({
      function: function base64 () {
        const base64Reg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
        state = state && base64Reg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid JSON
  string.JSON = function () {
    this.validators.push({
      function: function JSON () {
        try {
          JSON.parse(value)
          state = state && true
        } catch (e) {
          state = state && false
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid uuid string
  string.uuid = function () {
    this.validators.push({
      function: function uuid () {
        const uuidReg = /[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i
        state = state && uuidReg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid MAC address
  string.MAC = function () {
    this.validators.push({
      function: function MAC () {
        const macReg = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
        state = state && macReg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // checks if the value is a valid md5 string
  string.md5 = function () {
    this.validators.push({
      function: function md5 () {
        const md5Reg = /^[a-f0-9]{32}$/
        state = state && md5Reg.test(value)
      },
      parameters: {}
    })
    return this
  }

  // Extends a string function
  string.extend = function (func) {
    return common.extend(this, func)
  }

  string.toFunction = function () {
    return common.toFunction(this.validators)
  }

  return string
}

module.exports = stringFunction()
