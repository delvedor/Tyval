'use strict'
/* eslint-disable no-new-func */

const common = {
  toFunction: function (validators, parameters) {
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
    // Here we get the validator function code
    validators.forEach((code) => {
      // Stringify the validator function code
      code = code.toString()
      // Here we remove the function declaration,
      // this works ONLY if there are not destructuring assignment as parameters.
      // Because of the lib design the validator function has never parameters,
      // so we can be "safe" about the following implementation.
      functionCode += code.substring(code.indexOf('{')) + ';\n'
    })
    functionCode += 'return check;'
    // Generates the new function
    return new Function('variable', functionCode)
  }
}

module.exports = common
