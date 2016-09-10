'use strict'

/* eslint-disable no-new-func */

const common = {
  toFunction: function (validators) {
    if (!Array.isArray(validators)) {
      throw new TypeError('Validators is not an array')
    }
    // Function code
    let code = `  "use strict"
  let errors = 0
  `

    // Here we get the validator function code
    validators.forEach(validator => {
      // Error checking
      if (typeof validator !== 'object') {
        throw new TypeError('Validator is not an object')
      }
      if (typeof validator.parameters !== 'object') {
        throw new TypeError('validator.parameters is not an object')
      }
      if (typeof validator.function !== 'function') {
        throw new TypeError('validator.function is not a function')
      }

      // Begins a new block scope
      code += '{'
      // Stringify the validator function code
      const functionCode = validator.function.toString()
      // Here we remove the function declaration,
      // this works ONLY if there are not destructuring assignment as parameters.
      // Because of the lib design the validator function has never parameters,
      // so we can be "safe" about the following implementation.
      const linesOfCode = functionCode.substring(functionCode.indexOf('{') + 1, functionCode.lastIndexOf('}'))
                                      .split('\n')
                                      .filter(line => line.trim() !== '') // Removes empty lines
      // gets first line indentation
      const spaces = linesOfCode[0].search(/\S/)
      const params = validator.parameters
      linesOfCode.forEach(line => {
        for (let val in params) {
          let value
          if (typeof params[val] === 'string') {
            value = `'${params[val]}'`

          // If the variable is an object (but not an instance of RegExp) we stringify it
          } else if (typeof params[val] === 'object' && !(params[val] instanceof RegExp)) {
            value = JSON.stringify(params[val])

          // If the variable is a function
          } else if (typeof params[val] === 'function') {
            value = params[val].toString()

          // In all the other cases we add it 'as is' to the code
          } else {
            value = params[val]
          }
          // Replace $varname$ with its value
          line = line.replace(new RegExp('\\' + val.substring(0, val.length - 1) + '\\$', 'g'), value)
        }
        code += `
    ${line.slice(spaces)}`
      })
      // Ends the block scope
      code += `
  };`
    })

    // Adds the final return
    code += `
  return errors === 0`
    // Generates the new Function
    return new Function('value', code)
  },

  or: function () {
    const functions = Array.prototype.slice.call(arguments)
    let code = `  "use strict"
    `
    let returnCode = `
    return`

    functions.forEach((func, index) => {
      if (typeof func !== 'function') {
        throw new Error('tyval.or, parameters must be functions')
      }
      code += `
    const validate${index} = ${func.toString()}`
      returnCode += ` validate${index}(orValue)`
      if (index < functions.length - 1) {
        returnCode += ' ||'
      }
    })

    code += `
    function orify (orValue) {${returnCode}
    }
    return orify`
    return new Function(code)()
  },

  // Thanks to: https://davidwalsh.name/javascript-arguments
  getArgs: function (func) {
    if (typeof func !== 'function') {
      throw new TypeError('func is not a function')
    }

    // First match everything inside the function argument parens.
    let args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]

    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function (arg) {
      // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, '').trim()
    }).filter(function (arg) {
      // Ensure no undefined values are added.
      return arg
    })
  },

  extend: function (tyvalValidator, func) {
    if (typeof func !== 'function') {
      throw new TypeError('func is not a function')
    }

    // Gets the parameters name
    const parametersName = this.getArgs(func)

    // Extends the passed tyval validator with a new function
    tyvalValidator[func.name] = function () {
      // gets the parameters passed as arguments
      const parametersValue = Array.prototype.slice.call(arguments)
      if (parametersName.length !== parametersValue.length) {
        throw new Error('The length of parametersName and parametersValue do not coincide')
      }

      // Instantiate the parameters object
      const parameters = {}
      for (let i = 0; i < parametersName.length; i++) {
        // Adds the parameters name: value
        parameters['$' + parametersName[i] + '$'] = parametersValue[i]
      }

      // Push the function and the generated parameters object
      tyvalValidator.validators.push({
        function: func,
        parameters: parameters
      })

      return tyvalValidator
    }
  }
}

module.exports = common
