'use string'

/* globals value, errors */
/* eslint-disable no-native-reassign, no-undef */

const common = require('./common')

const stringFunction = function () {
  // checks if the value is a string
  const string = function () {
    string.validators = []
    string.validators.push({
      function: function string () {
        if (typeof value !== 'string') {
          return false
        }
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
        if (!(reg.test(value))) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // Tests the regex passed as input
  string.regex = function (reg) {
    this.validators.push({
      function: function regex () {
        const reg = $reg$
        if (!(reg.test(value))) {
          errors++
        }
      },
      parameters: {
        $reg$: reg
      }
    })
    return this
  }

  // checks if the string.length is lower than the passed max value
  string.max = function (max) {
    this.validators.push({
      function: function max () {
        if (value.length > $max$) {
          errors++
        }
      },
      parameters: {
        $max$: max
      }
    })
    return this
  }

  // checks if the string.length is higher than the passed value
  string.min = function (min) {
    this.validators.push({
      function: function min () {
        if (value.length < $min$) {
          errors++
        }
      },
      parameters: {
        $min$: min
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
        if (value.length !== $length$) {
          errors++
        }
      },
      parameters: {
        $length$: len
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
        if (!(mailReg.test(value))) {
          errors++
        }
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
        if (!(ipReg.test(value))) {
          errors++
        }
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
        if (!(ipReg.test(value))) {
          errors++
        }
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
        if (!(base64Reg.test(value))) {
          errors++
        }
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
        } catch (e) {
          errors++
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
        if (!(uuidReg.test(value))) {
          errors++
        }
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
        if (!(macReg.test(value))) {
          errors++
        }
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
        if (!(md5Reg.test(value))) {
          errors++
        }
      },
      parameters: {}
    })
    return this
  }

  // checks if the value corresponds to the card code selected
  string.card = function (cardType) {
    if (typeof cardType !== 'string') {
      throw new Error('cardType must be a string')
    }
    // Thanks to: https://github.com/DylanPiercey/the
    const cards = {
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      visa: /^4\d{12}(?:\d{3})?$/,
      discover: /^6(?:011|5\d{2})\d{12}$/,
      dinersclub: /^3(?:0[0-5]|[68]\d)\d{11}$/,
      mastercard: /^5[1-5]\d{14}$/,
      americanexpress: /^3[47]\d{13}$/
    }
    if (!cards[cardType]) {
      throw new Error(cardType + ' card is not supported')
    }
    this.validators.push({
      function: function isValidCard () {
        if (!($reg$.test(value))) {
          errors++
        }
      },
      parameters: {
        $reg$: cards[cardType]
      }
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
