'use strict'
/* eslint-disable no-new-func */

// Code parser
const esprima = require('esprima')
// AST traversal
const estraverse = require('estraverse')
// Code generator
const escodegen = require('escodegen')

const common = {
  // Parse the validators code in a single function
  toFunction: function (validators, parameters) {
    let functionCode = '"use strict";\nlet check = true;\n'
    // Adds variables to functionCode
    for (let val in parameters) {
      if (typeof parameters[val] === 'string') {
        functionCode += 'let ' + val + ' = "' + parameters[val] + '";\n'
      } else if (typeof parameters[val] === 'object' && !(parameters[val] instanceof RegExp)) {
        functionCode += 'let ' + val + ' = ' + JSON.stringify(parameters[val]) + ';\n'
      } else {
        functionCode += 'let ' + val + ' = ' + parameters[val] + ';\n'
      }
    }
    let ast = null
    let block = null
    validators.forEach(function (code, index, array) {
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
    functionCode += 'return check;'
    return new Function('variable', functionCode)
  }
}

module.exports = common
