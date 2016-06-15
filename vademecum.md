# Tyval

## How works this library?
**Tyval** has two main goals:
- **Speed**
- **Extensibility**

To achieve this two goals the lib adopted few decisions and technical implementations.  
Below you will find all the main parts of the code and their explanation.

### **toFunction** method
This method is the core of the library, its purpose is to take all the validation functions and merge them into a single function via code generation.  
Before starting with the explanation let me introduce the main parameters that we are gonna to use.
- `validators`, an array with all the validation functions, every time you call a validator function, Tyval pushes the function's code inside this array, in this way when toFunction is called, it knows which function it has to merge together.  
- `functionCode`, is the string with all the function code.  
- `parameters` is an object with all the parameters passed to the validation functions.

Ok, now we can start:  
First, *toFunction* declare the first part of *functionCode*:
- `"use strict"` for compatibility with Node v4 and because *"use strict"* is always good;
- `check`: that is a boolean value and it's used inside the validation functions;
- Declaration of all the passed parameters.

```javascript
// function code
let functionCode = '"use strict";\nlet check = true;\n'
// Adds variables to functionCode
for (let val in parameters) {
  // If the variable is a string we add the double quote
  if (typeof parameters[val] === 'string') {
    functionCode += `let ${val} = "${parameters[val]}";\n`
  // If the variable is an object (but not an instance of RegExp) we stringify it
  } else if (typeof parameters[val] === 'object' && !(parameters[val] instanceof RegExp)) {
    functionCode += `let ${val} = ${JSON.stringify(parameters[val])};\n`
  // In all the other cases we add it 'as is' to the code
  } else {
    functionCode += `let ${val} = ${parameters[val]};\n`
  }
}
```

*toFunction()* iterates over the validators array and stringify the validation function code, removes the function declaration part, then it adds the code to `functionCode`.  
See the code below for more info about this.
```javascript
validators.forEach((code) => {
  // Stringify the validator function code
  code = code.toString()
  // Here we remove the function declaration,
  // this works ONLY if there are not destructuring assignment as parameters.
  // Because of the lib design the validator function has never parameters,
  // so we can be "safe" about the following implementation.
  functionCode += code.substring(code.indexOf('{')) + ';\n'
})
```
When *toFunction* terminates the code merge, it appends the *return block* and generates the final function via the `new Function()` constructor.
```javascript
functionCode += 'return check;'
return new Function('variable', functionCode)
```
**Real world example:**  
This following code
```javascript
const strTest = tyval.string().min(5).max(10).alphanum().toFunction()
```
generates:
```javascript
function (variable) {
  "use strict";
  let check = true;
  let min = 5;
  let max = 10;
  {
    check = check && typeof variable === 'string';
  };
  {
    check = check && variable.length >= min;
  };
  {
    check = check && variable.length <= max;
  };
  {
    const reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    check = check && reg.test(variable);
  };
  return check;
}
```
### **validators** array
Tyval uses the *validators* function array because of how works *toFunction*, it's useful for make easier generate the final function code.

### **parameters** object
In Tyval we use the *parameters* object, because as far as I know there's no other way *(if I'm wrong, let me know)* to pass the parameter inside the final function.  
In every function you'll append a parameter with a self-descriptive name and the value that you need inside you validation function.
