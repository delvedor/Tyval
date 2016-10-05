# Tyval [![NPM version](https://img.shields.io/npm/v/tyval.svg?style=flat)](https://www.npmjs.com/package/tyval)

## How works this library?
**Tyval** has two main goals:
- **Speed**
- **Extensibility**

To achieve this two goals the lib adopted few decisions and technical implementations.  
Below you will find all the main parts of the code and their explanation.

### toFunction method
This method is the core of the library, its purpose is to take all the validation functions and merge them into a single function via code generation. To achieve the *composability* all the type-validator-specific methods are added to the generated function.
```javascript
toFunction: function (validatorObject) {
  return (context, validatorFunction, validatorParameters) => {
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
}
```
See the [full code](https://github.com/delvedor/Tyval/blob/master/lib/common.js)!  

**Real world example:**  
This following code
```javascript
const strTest = tyval.string().min(5).max(10).alphanum()
```
generates:
```javascript
function (value) {
  "use strict"
  {
    if (typeof value !== 'string') {
      return false
    }
  };{
    if (value < 5) {
      return false
    }
  };{
    if (value > 10) {
      return false
    }
  };{
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (!reg.test(value)) {
      return false
    }
  };
  return true
}
```
Before version 3.2.0, the validator was checked by a boolean assign, `state = state && condition`.  
From version 4.0.0, Tyval uses the following implementation, `if (condition) { return false }`, because has better performances.

<a name="whydollar"></a>
### Why $varname$
Inside the parameters object every key is saved as `$varname$ : value`, the `'$'` are used during the code generation to replace the `$varname$` with his value to improve performances.  
Example:
```javascript
if (value > $max$) { ... }
// assuming $max$ is equal to 5,
// after code generation becomes:
if (value > 5) { ... }
```

### extend method
Extensibility is one of the core concept of Tyval, with the version 3.0.0 the `extend` function has been rewrited and simplified its use.
```javascript
extend: function (tyvalValidator, func, toFunction) {
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
```
See the [full code](https://github.com/delvedor/Tyval/blob/master/lib/common.js)!
