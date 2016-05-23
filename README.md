# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval)

Tyval is an extensible type validator for JavaScript, highly inspired from [Joi](https://github.com/hapijs/joi), it provides a lot of  fast and useful validation functions, with a self-descriptive name.

## Install
```
npm install tyval --save
```

## Usage
Easily require it and call the chainable functions.  
The chain always return `true` if all the validations are correct or `false` if at least one is not correct.
```javascript
const tyval = require('tyval')

let num = 1
if (tyval(num, 4).isNumber().min(0).max(5).integer()) {
  console.log('Yay!')
}

let str = 'I\'m a string!'
if (tyval(str, 3).isString().min(5).max(20)) {
  console.log('Yes you are!')
}
```

<a name="api"></a>
## API
- <a href="#tyval"><code><b>tyval()</b></code></a>
- <a href="#isString"><code>tyval().<b>isString()</b></code></a>
- <a href="#isNumber"><code>tyval().<b>isNumber()</b></code></a>
- <a href="#isNull"><code>tyval().<b>isNull()</b></code></a>
- <a href="#isUndefined"><code>tyval().<b>isUndefined()</b></code></a>
- <a href="#isBoolean"><code>tyval().<b>isBoolean()</b></code></a>
- <a href="#isObject"><code>tyval().<b>isObject()</b></code></a>
- <a href="#isFunction"><code>tyval().<b>isFunction()</b></code></a>
- <a href="#alphanum"><code>tyval().<b>alphanum()</b></code></a>
- <a href="#regex"><code>tyval().<b>regex()</b></code></a>
- <a href="#max"><code>tyval().<b>max()</b></code></a>
- <a href="#min"><code>tyval().<b>min()</b></code></a>
- <a href="#positive"><code>tyval().<b>positive()</b></code></a>
- <a href="#negative"><code>tyval().<b>negative()</b></code></a>
- <a href="#integer"><code>tyval().<b>integer()</b></code></a>
- <a href="#float"><code>tyval().<b>float()</b></code></a>
- <a href="#safeInteger"><code>tyval().<b>safeInteger()</b></code></a>
- <a href="#finite"><code>tyval().<b>finite()</b></code></a>
- <a href="#extend"><code>tyval().<b>extend()</b></code></a>

<a name="tyval"></a>
#### tyval(variable, planned)
Tyval Constructor,  
`variable` is the variable you have to check,  
`planned`is the number of validations you are going to do.

<a name="isString"></a>
#### tyval(variable, planned).isString()
Checks if the `variable` is a string.

<a name="isNumber"></a>
#### tyval(variable, planned).isNumber()
Checks if the `variable` is a number.

<a name="isNull"></a>
#### tyval(variable, planned).isNull()
Checks if the `variable` is null.

<a name="isUndefined"></a>
#### tyval(variable, planned).isUndefined()
Checks if the `variable` is undefined.

<a name="isBoolean"></a>
#### tyval(variable, planned).isBoolean()
Checks if the `variable` is a boolean.

<a name="isObject"></a>
#### tyval(variable, planned).isObject()
Checks if the `variable` is an object.

<a name="isFunction"></a>
#### tyval(variable, planned).isFunction()
Checks if the `variable` is a function.

<a name="alphanum"></a>
#### tyval(variable, planned).alphanum()
Checks if the `variable` is alphanumerical.

<a name="regex"></a>
#### tyval(variable, planned).regex(regex)
Test the regex passed as input on the `variable`.

<a name="max"></a>
#### tyval(variable, planned).max(number)
Checks if the `variable` is lower than the passed max value.  
If `variable` is a string it checks the length.

<a name="min"></a>
#### tyval(variable, planned).min(number)
Checks if the `variable` is higher than the passed min value.  
If `variable` is a string it checks the length.

<a name="positive"></a>
#### tyval(variable, planned).positive()
Checks if the `variable` is positive.

<a name="negative"></a>
#### tyval(variable, planned).negative()
Checks if the `variable` is negative.

<a name="integer"></a>
#### tyval(variable, planned).integer()
Checks if the `variable` is an integer.

<a name="float"></a>
#### tyval(variable, planned).float()
Checks if the `variable` is a float.

<a name="safeInteger"></a>
#### tyval(variable, planned).safeInteger()
Checks if the `variable` is a safeInteger.

<a name="finite"></a>
#### tyval(variable, planned).finite()
Checks if the `variable` is finite.

<a name="extend"></a>
#### tyval(variable, planned).extend(function)
Adds a new function to tyval.  
Usage:
```javascript
tyval().extend(function someName () {
  // your validation code
  this.check &= // your boolean validator
  return this.plan()
})
```
Example:
```javascript
tyval().extend(function isZero () {
  this.check &= this.variable === 0
  return this.plan()
})
if (tyval(0, 1).isZero()) {
  console.log('is equal to zero :D')
}
```
*Did you made a cool validator? Open a pull request! ;)*

## TODO
- [ ] Implement tyval().isArray()
- [ ] Implement max/min for array.length
- [ ] New string validation functions

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
The code is released under the MIT license.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
