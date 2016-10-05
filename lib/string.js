'use string'

/* globals value */
/* eslint-disable no-native-reassign, no-undef */

const buildToFunction = require('./common').toFunction
const extend = require('./common').extend

// checks if the value is a string
const string = function () {
  return toFunction(null, function () {
    if (typeof value !== 'string') {
      return false
    }
  })
}

// checks if the string is alphanumberic
string.alphanum = function () {
  return toFunction(this, function () {
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
    if (!(reg.test(value))) {
      return false
    }
  })
}

// Tests the regex passed as input
string.regex = function (reg) {
  if (!(reg instanceof RegExp)) {
    throw new TypeError('string.regex - reg is not a RegExp')
  }
  return toFunction(this, function () {
    const reg = $reg$
    if (!(reg.test(value))) {
      return false
    }
  }, { $reg$: reg })
}

// checks if the string.length is lower than the passed max value
string.max = function (max) {
  if (typeof max !== 'number') {
    throw new TypeError('string.max - max is not a number')
  }
  return toFunction(this, function () {
    if (value.length > $max$) {
      return false
    }
  }, { $max$: max })
}

// checks if the string.length is higher than the passed value
string.min = function (min) {
  if (typeof min !== 'number') {
    throw new TypeError('string.min - min is not a number')
  }
  return toFunction(this, function () {
    if (value.length < $min$) {
      return false
    }
  }, { $min$: min })
}

// Makes writable the length object property
Object.defineProperty(string, 'length', {
  writable: true
})
// checks if the string.length is the same than the passed value
string.length = function (len) {
  if (typeof len !== 'number') {
    throw new TypeError('string.length - len is not a number')
  }
  return toFunction(this, function () {
    if (value.length !== $length$) {
      return false
    }
  }, { $length$: len })
}

// checks if the value is a valid mail string
string.mail = function () {
  // Thanks to: https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  return toFunction(this, function () {
    const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!(mailReg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid ipv4 string
string.ipv4 = function () {
  return toFunction(this, function () {
    const ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!(ipReg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid ipv6 string
string.ipv6 = function () {
  // Thanks to: https://community.helpsystems.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4
  return toFunction(this, function () {
    const ipReg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    if (!(ipReg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid base64 string
string.base64 = function () {
  return toFunction(this, function () {
    const base64Reg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
    if (!(base64Reg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid JSON
string.JSON = function () {
  return toFunction(this, function () {
    try {
      JSON.parse(value)
    } catch (e) {
      return false
    }
  })
}

// checks if the value is a valid uuid string
string.uuid = function () {
  return toFunction(this, function () {
    const uuidReg = /[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i
    if (!(uuidReg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid MAC address
string.MAC = function () {
  return toFunction(this, function () {
    const macReg = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    if (!(macReg.test(value))) {
      return false
    }
  })
}

// checks if the value is a valid md5 string
string.md5 = function () {
  return toFunction(this, function () {
    const md5Reg = /^[a-f0-9]{32}$/
    if (!(md5Reg.test(value))) {
      return false
    }
  })
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
  return toFunction(this, function () {
    if (!($reg$.test(value))) {
      return false
    }
  }, { $reg$: cards[cardType] })
}

// Extends a string function
string.extend = function (func) {
  return extend(this, func, toFunction)
}

const toFunction = buildToFunction(string)
module.exports = string
