# Tyval

## How works this library?
**Tyval** has two main goals:
- **Speed**
- **Extensibility**

To achieve this two goals the lib adopted few decisions and technical implementations.  
Below you will find all the main parts of the code and their explanation.

### **toFunction** method
This method is the core of the library, its purpose is to take all the validation function and merge them into a single function.  
Before starting with the explanation let me introduce the main parameters that we are gonna to use.
- `validators`, an array with all the validation function, every function of tyval pushes a function into this array when is called, in this way when toFunction is called, it knows which function it has to merge together.  
- `functionCode`, who is a string with all the function code.  
- `parameters` is an object with all the parameters passed to the validation function.

Ok, now we can start:  
First, *toFunction* declare the first part of *functionCode*:
- `use strict` for compatibility with Node v4 and because *"use strict"* is always good;
- `check`: that is a boolean value and it's used inside the validation functions;
- `parameters`: stringify the parameters object.

```javascript
let functionCode = '"use strict";\nlet check = true;\nlet parameters = ' + JSON.stringify(this.parameters) + '\n'
```

*toFunction()* iterates over the validators array and generates an *AST* (Abstract Syntax Tree) for every function via [esprima](http://esprima.org/),
```javascript
ast = esprima.parse(code.toString(), {})
```
then it removes the function declaration via [estraverse](https://github.com/estools/estraverse)
```javascript
estraverse.traverse(ast, {
  enter: function (node, parent) {
    if (node.type === 'BlockStatement') {
      block = node
      this.break()
    }
  }
})
```
and finally via [escodegen](https://github.com/estools/escodegen) appends the code to *functionCode*; it preserves the curly braces for making a scope for every validation, in this way we avoid naming conflict.  
It adds by default an `if (!check)`, in this way if one test fails, the function terminates immediately.
```javascript
functionCode += escodegen.generate(block) + ';\n'
if (index !== array.length - 1) functionCode += 'if(!check) { return false; }\n'
```
When *toFunction* terminates the code merge, it appends the *return block* and generates the final function via the `new Function()` constructor.
```javascript
functionCode += 'return check;'
return new Function('variable', functionCode)
```
**Real world example:**  
This following code
```javascript
const strTest = tyval.isString().minStr(5).maxStr(10).alphanum().toFunction()
```
generates:
```javascript
function () {
  "use strict";
  let check = true;
  let parameters = {"minStr":5,"maxStr":10}
  {
    check = check && typeof variable === 'string';
  };
  if(!check) { return false; }
  {
    check = check && variable.length >= parameters.minStr;
  };
  if(!check) { return false; }
  {
    check = check && variable.length <= parameters.maxStr;
  };
  if(!check) { return false; }
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
In tyval we use the *parameters* object, because as far as I know there's no other way *(if I'm wrong, let me know)* to pass the parameter inside the final function.  
In every function you'll append a parameter with a self-descriptive name and the value that you need inside you validation function.
