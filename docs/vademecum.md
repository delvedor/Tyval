# Tyval [![NPM version](https://img.shields.io/npm/v/tyval.svg?style=flat)](https://www.npmjs.com/package/tyval)

## How works this library?
**Tyval** has two main goals:
- **Speed**
- **Extensibility**

To achieve this two goals the lib adopted few decisions and technical implementations.  
Below you will find all the main parts of the code and their explanation.

### toFunction method
This method is the core of the library, its purpose is to take all the validation functions and merge them into a single function via code generation.  
Before starting with the explanation let me introduce the main parameters that we are gonna to use.
- `validators`, an array, of objects with all the validation functions and parameters, every time you call a validator function, Tyval pushes the function's code inside this array, in this way when toFunction is called, it knows which function it has to merge together.  
- `code`, is the string with all the function code.  

Ok, now we can start:  
First, *toFunction* declare the first part of *functionCode*:
- `"use strict"` for compatibility with Node v4 and because *"use strict"* is always good;
- `errors`: that is a number value and it's used inside the validation functions;

```javascript
// Function code
let code = '"use strict"\nlet errors = 0\n'

// Here we get the validator function code
validators.forEach((validator) => {
  // Begins a new block scope
  code += '{\n'
  // Stringify the validator function code
  const functionCode = validator.function.toString()
  // Here we remove the function declaration,
  // this works ONLY if there are not destructuring assignment as parameters.
  // Because of the lib design the validator function has never parameters,
  // so we can be "safe" about the following implementation.
  const linesOfCode = functionCode.substring(functionCode.indexOf('{') + 1, functionCode.lastIndexOf('}'))
                                  .replace(/  +/g, ' ') // eslint-disable-line
                                  .trim()
                                  .split('\n')
  const params = validator.parameters
  linesOfCode.forEach((line) => {
    for (let val in params) {
      let value
      if (typeof params[val] === 'string') {
        value = `'${params[val]}'`

      // If the variable is an object (but not an instance of RegExp) we stringify it
      } else if (typeof params[val] === 'object' && !(params[val] instanceof RegExp)) {
        value = `${JSON.stringify(params[val])}`

      // In all the other cases we add it 'as is' to the code
      } else {
        value = params[val]
      }
      // Replace $varname$ with its value
      line = line.replace(new RegExp('\\' + val.substring(0, val.length - 1) + '\\$', 'g'), value)
    }
    code += line + '\n'
  })
  // Ends the block scope
  code += '}'
})

// Adds the final return
code += 'return errors === 0'
// Generates the new Function
return new Function('value', code)
```
See the [full code](https://github.com/delvedor/Tyval/blob/master/lib/common.js)!  

**Real world example:**  
This following code
```javascript
const strTest = tyval.string().min(5).max(10).alphanum().toFunction()
```
generates:
```javascript
function (value) {
  "use strict"
  let errors = 0
  {
    if (typeof value !== 'string') {
      errors++
    }
  }{
    if (value < 5) {
      errors++
    }
  }{
    if (value > 10) {
      errors++
    }
  }{
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (!reg.test(value)) {
      errors++
    }
  }
  return errors === 0
}
```
Before version 3.2.0, the validator was checked by a boolean assign, `state = state && condition`.  
From version 3.2.0, Tyval uses the implementation of [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid), `if (condition) { errors++ }`, because has better performances.

### validators array
Tyval uses the *validators* function array because of how works *toFunction*, it's useful for make easier generate the final function code.  
Is built this way:  
```javascript
[{
  function: function func1 () { ... },
  parameters: { ... }
},
{
  function: function func2 () { ... },
  parameters: { ... }
},
{
  function: function func3 () { ... },
  parameters: { ... }
}]
```
<a name="whydollar"></a>
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
// Gets the parameters name
const parametersName = this.getArgs(func)

// Extends the passed tyval validator with a new function
tyvalValidator[func.name] = function () {
  // gets the parameters passed as arguments
  const parametersValue = Array.prototype.slice.call(arguments)

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
```
See the [full code](https://github.com/delvedor/Tyval/blob/master/lib/common.js)!
