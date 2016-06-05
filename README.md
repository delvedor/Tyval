# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval)

Tyval is an extensible type validator for JavaScript, highly inspired from [Joi](https://github.com/hapijs/joi), it provides a lot of [fast](https://github.com/delvedor/Tyval/tree/master/bench) and useful validation functions, with a self-descriptive name.

## Install
```
npm install tyval --save
```

## Usage
Easily require it, compose a function with the chainable api and then use it.
```javascript
const tyval = require('tyval')

const stringCheck = tyval.string().max(10).min(1).toFunction()
if (stringCheck('Test')) {
  console.log('yay!')
}

const numberCheck = tyval.number().max(1000).min(1).integer().toFunction()
if (numberCheck(42)) {
  console.log('The answer')
}
```
Note that the `.toFunction()` at the end of your validation code is mandatory.

<a name="api"></a>
## API
- <a href="#string"><code>tyval.<b>string()</b></code></a>
  * <a href="#alphanum"><code>tyval.string().<b>alphanum()</b></code></a>
  * <a href="#regex"><code>tyval.string().<b>regex()</b></code></a>
  * <a href="#maxStr"><code>tyval.string().<b>max()</b></code></a>
  * <a href="#minStr"><code>tyval.string().<b>min()</b></code></a>

- <a href="#number"><code>tyval.<b>number()</b></code></a>
  * <a href="#maxNum"><code>tyval.number().<b>max()</b></code></a>
  * <a href="#minNum"><code>tyval.number().<b>min()</b></code></a>
  * <a href="#positive"><code>tyval.number().<b>positive()</b></code></a>
  * <a href="#negative"><code>tyval.number().<b>negative()</b></code></a>
  * <a href="#integer"><code>tyval.number().<b>integer()</b></code></a>
  * <a href="#float"><code>tyval.number().<b>float()</b></code></a>
  * <a href="#safeInteger"><code>tyval.number().<b>safeInteger()</b></code></a>
  * <a href="#finite"><code>tyval.number().<b>finite()</b></code></a>
  * <a href="#multiple"><code>tyval.number().<b>multiple()</b></code></a>

- <a href="#array"><code>tyval.<b>array()</b></code></a>
  * <a href="#maxArray"><code>tyval.array().<b>max()</b></code></a>
  * <a href="#minArray"><code>tyval.array().<b>min()</b></code></a>
  * <a href="#lengthArray"><code>tyval.array().<b>length()</b></code></a>

- <a href="#date"><code>tyval.<b>date()</b></code></a>

- <a href="#boolean"><code>tyval.<b>boolean()</b></code></a>

- <a href="#object"><code>tyval.<b>object()</b></code></a>

- <a href="#extend"><code>tyval._______.<b>extend()</b></code></a>

<a name="string"></a>
### tyval.string()
Checks if the `variable` is a string.

<a name="alphanum"></a>
#### .string().alphanum()
Checks if the `variable` is alphanumerical.

<a name="regex"></a>
#### .string().regex(regex)
Test the regex passed as input on the `variable`.  
`regex` is the regex code.  

<a name="maxStr"></a>
#### .string().max(number)
Checks if the `variable.length` is lower than the passed max value.  
`number` is the number value to check.

<a name="minStr"></a>
#### .string().min(number)
Checks if the `variable.length` is higher than the passed min value.  
`number` is the number value to check.

<a name="number"></a>
### tyval.number()
Checks if the `variable` is a number.

<a name="maxNum"></a>
#### .number().max(number)
Checks if the `variable` is lower than the passed max value.  
`number` is the number value to check.

<a name="minNum"></a>
#### .number().min(number)
Checks if the `variable` is higher than the passed min value.  
`number` is the number value to check.

<a name="positive"></a>
#### .number().positive()
Checks if the `variable` is positive.

<a name="negative"></a>
#### .number().negative()
Checks if the `variable` is negative.

<a name="integer"></a>
#### .number().integer()
Checks if the `variable` is an integer.

<a name="float"></a>
#### .number().float()
Checks if the `variable` is a float.

<a name="safeInteger"></a>
#### .number().safeInteger()
Checks if the `variable` is a safeInteger.

<a name="finite"></a>
#### .number().finite()
Checks if the `variable` is finite.

<a name="multiple"></a>
#### .number().multiple(number)
Checks if the `variable` is a multiple of the passed value.  
`number` is the multiple number value to check.

<a name="array"></a>
### tyval.array()
Checks if the `variable` is an array.

<a name="maxArray"></a>
#### .array().max(number)
Checks if the `variable.length` is lower than the passed max value.  
`number` is the number value to check.

<a name="minArray"></a>
#### .array().min(number)
Checks if the `variable.length` is higher than the passed min value.  
`number` is the number value to check.

<a name="lengthArray"></a>
#### .array().length(number)
Checks if the `variable.length` is the same as the passed value.  
`number` is the length number value to check.

<a name="date"></a>
### tyval.date()
Checks if the `variable` is a date.

<a name="boolean"></a>
### tyval.boolean()
Checks if the `variable` is a boolean.

<a name="object"></a>
### tyval.object()
Checks if the `variable` is an object.

<a name="extend"></a>
### tyval._______.extend(function)
Adds a new validator to tyval.  
**Inside the `_______` field you must put the type of validator you need to extend.**  
You can access the variable to validate via `variable`   
Use `check = check &&` to elaborate your validation.  
Usage:
```javascript
tyval./*type you need to extend*/.extend(function someName () {
  tyval./*type you need to extend*/.validators.push(function someName () {
    // your validation code
    check = check && // your boolean validator
  })
  return this
})
```
Example:
```javascript
tyval.number.extend(function isZero () {
  tyval.number.validators.push(function isZero () {
    check = check && variable === 0
  })
  return this
})
// let's use the extended function
const zero = tyval.number().isZero().toFunction()
if (zero(0)) {
  console.log('is equal to zero :D')
}
```
If you need to pass some `parameter` to the function:
```javascript
tyval./*type you need to extend*/.extend(function someName (param) {
  tyval./*type you need to extend*/.parameters.paramName = param
  tyval./*type you need to extend*/.validators.push(function someName () {
    // your validation code
    // access the parameter via paramName
    console.log(paramName)
    check = check && // your boolean validator
  })
  return this
})
```
As you can imagine, `variable` and `check` are reserved names of **tyval**.
```javascript
// usage example with a parameter
tyval.number.extend(function lessThan (num) {
  tyval.number.parameters.lessThanParam = num
  tyval.number.validators.push(function lessThan () {
    check = check && variable < lessThanParam
  })
  return this
})
// let's use the extended function with a parameter
const ltf = tyval.number().lessThan(50).toFunction()
if (ltf(10)) {
  console.log('is less than 50!')
}
```
*Did you made a cool validator? Open a pull request! ;)*

## TODO
- [x] Rewrite API to improve performances
- [x] Implement tyval.isArray()
- [x] Implement max/min for array.length
- [x] Refactor of the tyval object, divide functions by field (string, number, array, object...) for a better maintainability
- [x] Add `Date` validator
- [ ] Add code coverage
- [ ] New string validation functions
- [ ] Browser version
- [ ] Add `Any` type

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
