# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval)

Tyval is an extensible type validator for JavaScript, highly inspired from [Joi](https://github.com/hapijs/joi), it provides a lot of fast and useful validation functions, with a self-descriptive name.

## Install
```
npm install tyval --save
```

## Usage
Easily require it, compose a function with the chainable api and then use it.
```javascript
const tyval = require('tyval')

const stringCheck = tyval.isString().maxStr(10).minStr(1).toFunction()
if (stringCheck('Test')) {
  console.log('yay!')
}

const numberCheck = tyval.isNumber().maxNum(1000).minNum(1).integer().toFunction()
if (numberCheck(42)) {
  console.log('The answer')
}
```
Note that the `.toFunction()` at the end of your validation code is mandatory.

<a name="api"></a>
## API
- <a href="#isString"><code>tyval.<b>isString()</b></code></a>
- <a href="#isNumber"><code>tyval.<b>isNumber()</b></code></a>
- <a href="#isNull"><code>tyval.<b>isNull()</b></code></a>
- <a href="#isUndefined"><code>tyval.<b>isUndefined()</b></code></a>
- <a href="#isBoolean"><code>tyval.<b>isBoolean()</b></code></a>
- <a href="#isObject"><code>tyval.<b>isObject()</b></code></a>
- <a href="#isFunction"><code>tyval.<b>isFunction()</b></code></a>
- <a href="#alphanum"><code>tyval.<b>alphanum()</b></code></a>
- <a href="#regex"><code>tyval.<b>regex()</b></code></a>
- <a href="#maxStr"><code>tyval.<b>maxStr()</b></code></a>
- <a href="#minStr"><code>tyval.<b>minStr()</b></code></a>
- <a href="#maxNum"><code>tyval.<b>maxNum()</b></code></a>
- <a href="#minNum"><code>tyval.<b>minNum()</b></code></a>
- <a href="#positive"><code>tyval.<b>positive()</b></code></a>
- <a href="#negative"><code>tyval.<b>negative()</b></code></a>
- <a href="#integer"><code>tyval.<b>integer()</b></code></a>
- <a href="#float"><code>tyval.<b>float()</b></code></a>
- <a href="#safeInteger"><code>tyval.<b>safeInteger()</b></code></a>
- <a href="#finite"><code>tyval.<b>finite()</b></code></a>
- <a href="#extend"><code>tyval.<b>extend()</b></code></a>

<a name="isString"></a>
#### tyval.isString()
Checks if the `variable` is a string.

<a name="isNumber"></a>
#### tyval.isNumber()
Checks if the `variable` is a number.

<a name="isNull"></a>
#### tyval.isNull()
Checks if the `variable` is null.

<a name="isUndefined"></a>
#### tyval.isUndefined()
Checks if the `variable` is undefined.

<a name="isBoolean"></a>
#### tyval.isBoolean()
Checks if the `variable` is a boolean.

<a name="isObject"></a>
#### tyval.isObject()
Checks if the `variable` is an object.

<a name="isFunction"></a>
#### tyval.isFunction()
Checks if the `variable` is a function.

<a name="alphanum"></a>
#### tyval.alphanum()
Checks if the `variable` is alphanumerical.

<a name="regex"></a>
#### tyval.regex(regex, flag)
Test the regex passed as input on the `variable`.  
`regex` is the regex code passed as string.  
`flag` is the regex flag passed as string.

<a name="maxStr"></a>
#### tyval.maxStr(number)
Checks if the `variable.length` is lower than the passed max value.  
`number` is the number value to check.

<a name="minStr"></a>
#### tyval.minStr(number)
Checks if the `variable.length` is higher than the passed min value.  
`number` is the number value to check.

<a name="maxNum"></a>
#### tyval.maxNum(number)
Checks if the `variable` is lower than the passed max value.  
`number` is the number value to check.

<a name="minNum"></a>
#### tyval.minNum(number)
Checks if the `variable` is higher than the passed min value.  
`number` is the number value to check.

<a name="positive"></a>
#### tyval.positive()
Checks if the `variable` is positive.

<a name="negative"></a>
#### tyval.negative()
Checks if the `variable` is negative.

<a name="integer"></a>
#### tyval.integer()
Checks if the `variable` is an integer.

<a name="float"></a>
#### tyval.float()
Checks if the `variable` is a float.

<a name="safeInteger"></a>
#### tyval.safeInteger()
Checks if the `variable` is a safeInteger.

<a name="finite"></a>
#### tyval.finite()
Checks if the `variable` is finite.

<a name="extend"></a>
#### tyval.extend(function)
Adds a new function to tyval.  
You can access the variable to validate via `variable`   
Use `check &=` to elaborate your validation.  
Usage:
```javascript
tyval.extend(function someName () {
  this.validators.push(function someName () {
    // your validation code
    check &= // your boolean validator
  })
  return this
})
```
Example:
```javascript
tyval.extend(function isZero () {
  this.validators.push(function isZero () {
    check &= variable === 0
  })
  return this
})
// let's use the extended function
const zero = tyval.isZero().toFunction()
if (zero(0)) {
  console.log('is equal to zero :D')
}
```
If you need to pass some `parameter` to the function:
```javascript
tyval.extend(function someName (param) {
  this.parameters.paramName = param
  this.validators.push(function someName () {
    // your validation code
    // access the parameter via parameters.paramName
    console.log(parameters.paramName)
    check &= // your boolean validator
  })
  return this
})
```
As you can imagine, `variable`, `check` and `parameters` are reserved names of **tyval**.
```javascript
// usage example with a parameter
tyval.extend(function lessThan (num) {
  this.parameters.lessThanParam = num
  this.validators.push(function lessThan () {
    check &= variable < parameters.lessThanParam
  })
  return this
})
// let's use the extended function with a parameter
const zero = tyval.lessThan(50).toFunction()
if (lessThan(10)) {
  console.log('is less than 50!')
}
```
*Did you made a cool validator? Open a pull request! ;)*

## TODO
- [x] Rewrite API to improve performances
- [ ] Implement tyval.isArray()
- [ ] Implement max/min for array.length
- [ ] New string validation functions

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

Do you want to know more how this library is built?  
Have a look [here](https://github.com/delvedor/Tyval/blob/master/vademecum.md)!

I would make a special thanks to [@mcollina](https://github.com/mcollina) for helping me to improving the code.  

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
The code is released under the MIT license.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
