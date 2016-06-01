/*
 * Project: Tyval
 * Version: 2.0.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: MIT
 * GitHub: https://github.com/delvedor/Tyval
 */

'use strict'
/* globals variable, check, parameters */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

// Code parser
const esprima = require('esprima')
// AST traversal
const estraverse = require('estraverse')
// Code generator
const escodegen = require('escodegen')

const tyval = {
  // Validator functions
  validators: [],
  // Parameters for the validator functions
  parameters: {},
  // Checks if the variable is a string
  isString: function () {
    this.validators.push(function isString () {
      check &= typeof variable === 'string'
    })
    return this
  },
  // Checks if the variable is a number
  isNumber: function () {
    this.validators.push(function isNumber () {
      check &= typeof variable === 'number'
    })
    return this
  },
  // Checks if the variable is null
  isNull: function () {
    this.validators.push(function isNull () {
      check &= variable === null
    })
    return this
  },
  // Checks if the variable is undefined
  isUndefined: function () {
    this.validators.push(function isUndefined () {
      check &= variable === undefined
    })
    return this
  },
  // Checks if the variable is a boolean
  isBoolean: function () {
    this.validators.push(function isBoolean () {
      check &= typeof variable === 'boolean'
    })
    return this
  },
  // Checks if the variable is an object
  isObject: function () {
    this.validators.push(function isObject () {
      check &= typeof variable === 'object'
    })
    return this
  },
  // Checks if the variable is a function
  isFunction: function () {
    this.validators.push(function isFunction () {
      check &= typeof variable === 'function'
    })
    return this
  },
  // Checks if the string is alphanumberic
  alphanum: function () {
    this.validators.push(function alphanum () {
      const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
      check &= reg.test(variable)
    })
    return this
  },
  // Tests the regex passed as input
  regex: function (reg, flag) {
    this.parameters.regex = {
      reg: reg,
      flag: flag
    }
    this.validators.push(function regex () {
      let reg = new RegExp(parameters.regex.reg, parameters.regex.flag)
      check &= reg.test(variable)
    })
    return this
  },
  // Checks if the string.length is lower than the passed max value
  maxStr: function (max) {
    this.parameters.maxStr = max
    this.validators.push(function max () {
      check &= variable.length <= parameters.maxStr
    })
    return this
  },
  // Checks if the string.length is higher than the passed value
  minStr: function (min) {
    this.parameters.minStr = min
    this.validators.push(function min () {
      check &= variable.length >= parameters.minStr
    })
    return this
  },
  // Checks if the number is lower than the passed value
  maxNum: function (max) {
    this.parameters.maxNumber = max
    this.validators.push(function max () {
      check &= variable <= parameters.maxNumber
    })
    return this
  },
  // Checks if the number is higher than the passed value
  minNum: function (min) {
    this.parameters.minNumber = min
    this.validators.push(function min () {
      check &= variable >= parameters.minNumber
    })
    return this
  },
  // Checks if the variable is a positive number
  positive: function () {
    this.validators.push(function positive () {
      check &= variable > 0
    })
    return this
  },
  // Checks if the variable is a negative number
  negative: function () {
    this.validators.push(function negative () {
      check &= variable < 0
    })
    return this
  },
  // Checks if the variable is an Integer
  integer: function () {
    this.validators.push(function integer () {
      check &= Number.isInteger(variable)
    })
    return this
  },
  // Checks if the variable is a Float
  float: function () {
    this.validators.push(function float () {
      check &= !Number.isInteger(variable)
    })
    return this
  },
  // Checks if the variable is a safe integer
  safeInteger: function () {
    this.validators.push(function safeInteger () {
      check &= Number.isSafeInteger(variable)
    })
    return this
  },
  // Checks if the variable is a finite number
  finite: function () {
    this.validators.push(function finite () {
      check &= Number.isFinite(variable)
    })
    return this
  },
  // Adds a new function to tyval
  extend: function (func) {
    tyval[func.name] = func
  },
  // Parse the validators code in a single function
  toFunction: function () {
    // Fix for the RegExp to JSON
    RegExp.prototype.toJSON = RegExp.prototype.toString
    let functionCode = '"use strict";\nlet check = 1;\nlet parameters = ' + JSON.stringify(this.parameters) + '\n'
    let ast = null
    let block = null
    this.validators.forEach(function (code) {
      // get function ast
      ast = esprima.parse(code.toString(), {})
      block = null
      estraverse.traverse(ast, {
        enter: function (node, parent) {
          // gets only the function code
          if (node.type === 'BlockStatement') {
            block = node
            this.break()
          }
        }
      })
      // generate the function code without the function declaration
      functionCode += escodegen.generate(block) + ';\n'
    })
    functionCode += 'return !!check;'
    // restore validators and parameters
    this.validators = []
    this.parameters = {}
    return new Function('variable', functionCode)
  }
}

module.exports = tyval
