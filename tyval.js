/*
 * Project: Tyval
 * Version: 2.1.0
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
      check = check && typeof variable === 'string'
    })
    return this
  },
  // Checks if the variable is a number
  isNumber: function () {
    this.validators.push(function isNumber () {
      check = check && typeof variable === 'number'
    })
    return this
  },
  // Checks if the variable is null
  isNull: function () {
    this.validators.push(function isNull () {
      check = check && variable === null
    })
    return this
  },
  // Checks if the variable is undefined
  isUndefined: function () {
    this.validators.push(function isUndefined () {
      check = check && variable === undefined
    })
    return this
  },
  // Checks if the variable is a boolean
  isBoolean: function () {
    this.validators.push(function isBoolean () {
      check = check && typeof variable === 'boolean'
    })
    return this
  },
  // Checks if the variable is an object
  isObject: function () {
    this.validators.push(function isObject () {
      check = check && typeof variable === 'object'
    })
    return this
  },
  // Checks if the variable is an array
  isArray: function () {
    this.validators.push(function isArray () {
      check = check && Array.isArray(variable)
    })
    return this
  },
  // Checks if the variable is a function
  isFunction: function () {
    this.validators.push(function isFunction () {
      check = check && typeof variable === 'function'
    })
    return this
  },
  // Checks if the string is alphanumberic
  alphanum: function () {
    this.validators.push(function alphanum () {
      const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
      check = check && reg.test(variable)
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
      check = check && reg.test(variable)
    })
    return this
  },
  // Checks if the string.length is lower than the passed max value
  maxStr: function (max) {
    this.parameters.maxStr = max
    this.validators.push(function max () {
      check = check && variable.length <= parameters.maxStr
    })
    return this
  },
  // Checks if the string.length is higher than the passed value
  minStr: function (min) {
    this.parameters.minStr = min
    this.validators.push(function min () {
      check = check && variable.length >= parameters.minStr
    })
    return this
  },
  // Checks if the array.length is higher than the passed value
  maxArray: function (max) {
    this.parameters.maxArray = max
    this.validators.push(function maxArray () {
      check = check && variable.length <= parameters.maxArray
    })
    return this
  },
  // Checks if the array.length is lower than the passed value
  minArray: function (min) {
    this.parameters.minArray = min
    this.validators.push(function minArray () {
      check = check && variable.length >= parameters.minArray
    })
    return this
  },
  // Checks if the number is lower than the passed value
  maxNum: function (max) {
    this.parameters.maxNumber = max
    this.validators.push(function max () {
      check = check && variable <= parameters.maxNumber
    })
    return this
  },
  // Checks if the number is higher than the passed value
  minNum: function (min) {
    this.parameters.minNumber = min
    this.validators.push(function min () {
      check = check && variable >= parameters.minNumber
    })
    return this
  },
  // Checks if the variable is a positive number
  positive: function () {
    this.validators.push(function positive () {
      check = check && variable > 0
    })
    return this
  },
  // Checks if the variable is a negative number
  negative: function () {
    this.validators.push(function negative () {
      check = check && variable < 0
    })
    return this
  },
  // Checks if the variable is an Integer
  integer: function () {
    this.validators.push(function integer () {
      check = check && Number.isInteger(variable)
    })
    return this
  },
  // Checks if the variable is a Float
  float: function () {
    this.validators.push(function float () {
      check = check && !Number.isInteger(variable)
    })
    return this
  },
  // Checks if the variable is a safe integer
  safeInteger: function () {
    this.validators.push(function safeInteger () {
      check = check && Number.isSafeInteger(variable)
    })
    return this
  },
  // Checks if the variable is a finite number
  finite: function () {
    this.validators.push(function finite () {
      check = check && Number.isFinite(variable)
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
    let functionCode = '"use strict";\nlet check = true;\nlet parameters = ' + JSON.stringify(this.parameters) + '\n'
    let ast = null
    let block = null
    this.validators.forEach(function (code, index, array) {
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
      if (index === array.length - 1) {
        functionCode += escodegen.generate(block) + ';\n'
      } else {
        functionCode += escodegen.generate(block) + ';\nif (!check) { return false; }\n'
      }
    })
    functionCode += 'return check;'
    this.validators = []
    this.parameters = {}
    return new Function('variable', functionCode)
  }
}

module.exports = tyval
