'use strict'

/* eslint-disable no-new-func */

const common = {
  toFunction: function (validatorObject) {
    if (typeof validatorObject !== 'function') {
      throw new TypeError('validatorObject is not a function')
    }
    return (context, validatorFunction, validatorParameters) => {
      // Error checking
      if (typeof context !== 'function' && context !== null) {
        throw new TypeError('context is not a function or null')
      }
      if (typeof validatorFunction !== 'function') {
        throw new TypeError('validatorFunction must be a function')
      }
      if (validatorParameters && typeof validatorParameters !== 'object') {
        throw new TypeError('validatorParameters must be an object')
      }

      // Returns an array with every line of the function
      // Here we remove the function declaration,
      // this works ONLY if there are not destructuring assignment as parameters.
      // Because of the lib design the validator function has never parameters,
      // so we can be "safe" about the following implementation.
      const linesOfCode = func => {
        func = func.toString()
        return func.substring(func.indexOf('{') + 1, func.lastIndexOf('}'))
                   .split('\n')
                   .filter(line => line.trim() !== '') // Removes empty lines
      }

      let code = ''
      // if the validator has already been defined
      if (context !== null) {
        let lines = linesOfCode(context)
        // Gets the number of spaces between
        // the beginning of the string and the first character
        let spaces = lines[0].search(/\S/)
        // Formats the indentation
        lines.forEach((line, index) => {
          if (index === lines.length - 1) return
          if (line.trim() === '{') spaces = line.search(/\S/)
          code += `
     ${line.slice(spaces)}`
        })
      // if is a new validator
      } else {
      // Function code
        code = `
    "use strict"
  `
      }

      code += `
    {`
      const lines = linesOfCode(validatorFunction)
      const spaces = lines[0].search(/\S/)

      lines.forEach(line => {
        for (let val in validatorParameters) {
          let value
          if (typeof validatorParameters[val] === 'string') {
            value = `'${validatorParameters[val]}'`

          // If the variable is an object (but not an instance of RegExp) we stringify it
          } else if (typeof validatorParameters[val] === 'object' && !(validatorParameters[val] instanceof RegExp)) {
            value = JSON.stringify(validatorParameters[val])

          // If the variable is a function
          } else if (typeof validatorParameters[val] === 'function') {
            value = validatorParameters[val].toString()

          // In all the other cases we add it 'as is' to the code
          } else {
            value = validatorParameters[val]
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

      code += `
    return true`

      // Appends all the validator functions to the newly generated function
      const func = new Function('value', code)
      Object.keys(validatorObject).forEach(val => {
        func[val] = validatorObject[val]
      })

      // Fix for .length property
      Object.defineProperty(func, 'length', {
        writable: true
      })
      if (typeof validatorObject.length === 'function') {
        func.length = validatorObject.length
      }

      return func
    }
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
      // Stringify every validator function in the code
      code += `
    const validate${index} = ${func.toString()}`
      // Call every declared function
      returnCode += ` validate${index}(orValue)`
      if (index < functions.length - 1) {
        returnCode += ' ||'
      }
    })

    // Declares all the validator functions
    // and use them with closures
    code += `
    function orify (orValue) {${returnCode}
    }
    return orify`
    return new Function(code)()
  },

  extend: function (tyvalValidator, func, toFunction) {
    // Error checking
    if (typeof tyvalValidator !== 'function') {
      throw new TypeError('tyvalValidator is not a function')
    }
    if (typeof func !== 'function') {
      throw new TypeError('func is not a function')
    }
    if (typeof toFunction !== 'function') {
      throw new TypeError('toFunction is not a function')
    }

    // Thanks to: https://davidwalsh.name/javascript-arguments
    // gets the name of the arguments of a function
    const getArgs = func => {
      // First match everything inside the function argument parens.
      let args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]
      // Split the arguments string into an array comma delimited.
      return args.split(',').map(arg => {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim()
      }).filter(arg => {
        // Ensure no undefined values are added.
        return arg
      })
    }

    // Gets the parameters name
    const parametersName = getArgs(func)

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

      return toFunction(this, func, parameters)
    }
  }
}

module.exports = common
