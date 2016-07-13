# Tyval

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
- `functionCode`, is the string with all the function code.  

Ok, now we can start:  
First, *toFunction* declare the first part of *functionCode*:
- `"use strict"` for compatibility with Node v4 and because *"use strict"* is always good;
- `state`: that is a boolean value and it's used inside the validation functions;

```javascript
// Function code
let functionCode = '"use strict";\nlet state = true;\n'

// Here we get the validator function code
validators.forEach((validator) => {
  // Adds the function variables inside their function scope
  let params = validator.parameters
  // Begin a new block scope
  functionCode += '{\n'

  for (let val in params) {
    // If the variable is a string we add the quotes
    if (typeof params[val] === 'string') {
      functionCode += `let ${val} = '${params[val]}';\n`

    // If the variable is an object (but not an instance of RegExp) we stringify it
    } else if (typeof params[val] === 'object' && !(params[val] instanceof RegExp)) {
      functionCode += `let ${val} = ${JSON.stringify(params[val])};\n`

    // In all the other cases we add it 'as is' to the code
    } else {
      functionCode += `let ${val} = ${params[val]};\n`
    }
  }

  // Stringify the validator function code
  let code = validator.function.toString()
  // Here we remove the function declaration,
  // this works ONLY if there are not destructuring assignment as parameters.
  // Because of the lib design the validator function has never parameters,
  // so we can be "safe" about the following implementation.
  functionCode += code.substring(code.indexOf('{') + 1) + ';\n'
})

// Adds the final return
functionCode += 'return state;'
// Generates the new Function
return new Function('value', functionCode)
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
  "use strict";
  let state = true;
  {
    state = state && typeof value === 'string';
  };
  {
    let min = 5;
    state = state && value.length >= min;
  };
  {
    let max = 10;
    state = state && value.length <= max;
  };
  {
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    state = state && reg.test(value);
  };
  return state;
}
```
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

### extend method
Extensibility is one of the core concept of Tyval, with the version 3.0.0 the `extend` function has been rewrited and simplified its use.
```javascript
// Gets the parameters name
const parametersName = this.getArgs(func)

// Extends the passed tyval validator with a new function
tyvalValidator[func.name] = function () {
  // gets the parameters passed as arguments
  const parametersValue = Array.prototype.slice.call(arguments, 1)

  // Instantiate the parameters object
  const parameters = {}
  for (let i = 0; i < parametersName.length; i++) {
    // Adds the parameters name: value
    parameters[parametersName[i]] = parametersValue[i]
  }

  // Push the function and the generated parameters object
  tyvalValidator.validators.push({
    function: func,
    parameters: parameters
  })

  return tyvalValidator
```
See the [full code](https://github.com/delvedor/Tyval/blob/master/lib/common.js)!
