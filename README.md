# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval) [![NPM version](https://img.shields.io/npm/v/tyval.svg?style=flat)](https://www.npmjs.com/package/tyval)

Tyval is an extensible type validator for JavaScript, highly inspired from [Joi](https://github.com/hapijs/joi), it provides a lot of [fast](https://github.com/delvedor/Tyval/tree/master/bench) and useful validation functions, with a self-descriptive name.  
The design of the API forces to write atomic test, in this way the result of a single test does not influence the others.


If you want a structured object validator, with an excellent error management and an integrated parser use Joi, it's just amazing and is doing a good job.  
Tyval has only one purpose, validate small and focused values in the fastest way possible via code generation.  
Tyval is synchronous and has not an error management, it always returns a boolean, *true* if all the validations has passed, *false* if at least one has failed.

**Needs Node.js ≥ 4.0.0**

## Install
```
npm install tyval --save
```

## Usage
Easily require it, compose a function with the chainable API and then use it.
```javascript
const tyval = require('tyval')

const stringCheck = tyval.string().max(10).min(1).toFunction()
const numberCheck = tyval.number().max(1000).min(1).integer().toFunction()

if (stringCheck('Test')) {
  console.log('yay!')
}
if (numberCheck(42)) {
  console.log('The answer')
}

function strAndNum (str, num ) {
  if (!stringCheck(str) && !numberCheck(num)) {
    return 'error'
  }
  // ...
}
```

**Note that the `.toFunction()` at the end of your validation code is mandatory.**

### Browser version
If you need to use Tyval inside the browser use [`tyval.min.js`](https://github.com/delvedor/Tyval/blob/master/tyval.min.js), that is generated via *browserify* and *uglify*.
```html
<script src="./node_modules/tyval/tyval.min.js"></script>
```

<a name="api"></a>
## API
- <a href="#string"><code>tyval.<b>string()</b></code></a>
  * <a href="#alphanum"><code>tyval.string().<b>alphanum()</b></code></a>
  * <a href="#regex"><code>tyval.string().<b>regex()</b></code></a>
  * <a href="#maxStr"><code>tyval.string().<b>max()</b></code></a>
  * <a href="#minStr"><code>tyval.string().<b>min()</b></code></a>
  * <a href="#lengthStr"><code>tyval.string().<b>length()</b></code></a>
  * <a href="#mailStr"><code>tyval.string().<b>mail()</b></code></a>
  * <a href="#ipv4Str"><code>tyval.string().<b>ipv4()</b></code></a>
  * <a href="#ipv6Str"><code>tyval.string().<b>ipv6()</b></code></a>
  * <a href="#base64"><code>tyval.string().<b>base64()</b></code></a>
  * <a href="#json"><code>tyval.string().<b>JSON()</b></code></a>
  * <a href="#uuid"><code>tyval.string().<b>uuid()</b></code></a>
  * <a href="#mac"><code>tyval.string().<b>MAC()</b></code></a>
  * <a href="#md5"><code>tyval.string().<b>md5()</b></code></a>


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
  * <a href="#notnan"><code>tyval.number().<b>notNaN()</b></code></a>
  * <a href="#portNumber"><code>tyval.number().<b>port()</b></code></a>

- <a href="#array"><code>tyval.<b>array()</b></code></a>
  * <a href="#maxArray"><code>tyval.array().<b>max()</b></code></a>
  * <a href="#minArray"><code>tyval.array().<b>min()</b></code></a>
  * <a href="#lengthArray"><code>tyval.array().<b>length()</b></code></a>
  * <a href="#containsArray"><code>tyval.array().<b>contains()</b></code></a>

- <a href="#date"><code>tyval.<b>date()</b></code></a>
  * <a href="#dateLower"><code>tyval.date().<b>lower()</b></code></a>
  * <a href="#dateHigher"><code>tyval.date().<b>higher()</b></code></a>

- <a href="#boolean"><code>tyval.<b>boolean()</b></code></a>

- <a href="#object"><code>tyval.<b>object()</b></code></a>
  * <a href="#emptyObject"><code>tyval.object().<b>empty()</b></code></a>
  * <a href="#notNullObject"><code>tyval.object().<b>notNull()</b></code></a>
  * <a href="#notArrayObject"><code>tyval.object().<b>notArray()</b></code></a>
  * <a href="#notDateObject"><code>tyval.object().<b>notDate()</b></code></a>
  * <a href="#notRegExpObject"><code>tyval.object().<b>notRegExp()</b></code></a>
  * <a href="#hasObject"><code>tyval.object().<b>has()</b></code></a>
  * <a href="#hasNotObject"><code>tyval.object().<b>hasNot()</b></code></a>

- <a href="#extend"><code>tyval._______.<b>extend()</b></code></a>

<a name="string"></a>
### tyval.string()
Checks if the `value` is a string.

<a name="alphanum"></a>
#### .string().alphanum()
Checks if the `value` is alphanumerical.

<a name="regex"></a>
#### .string().regex(regex)
Test the regex passed as input on the `value`.  
`regex` is the regex code.  

<a name="maxStr"></a>
#### .string().max(number)
Checks if the `value.length` is lower than the passed max value.  
`number` is the number value to check.

<a name="minStr"></a>
#### .string().min(number)
Checks if the `value.length` is higher than the passed min value.  
`number` is the number value to check.

<a name="lengthStr"></a>
#### .string().length(number)
Checks if the `value.length` is equal than the passed value.  
`number` is the number value to check.

<a name="mailStr"></a>
#### .string().mail()
Checks if the `value` is a valid mail string.

<a name="ipv4Str"></a>
#### .string().ipv4()
Checks if the `value` is a valid ipv4 string.

<a name="ipv6Str"></a>
#### .string().ipv6()
Checks if the `value` is a valid ipv6 string.

<a name="base64"></a>
#### .string().base64()
Checks if the `value` is a valid base64 string.

<a name="json"></a>
#### .string().JSON()
Checks if the `value` is a valid JSON.

<a name="uuid"></a>
#### .string().uuid()
Checks if the `value` is a valid uuid string.

<a name="mac"></a>
#### .string().MAC()
Checks if the `value` is a valid MAC address.

<a name="md5"></a>
#### .string().md5()
Checks if the `value` is a valid md5 string.


<a name="number"></a>
### tyval.number()
Checks if the `value` is a number.

<a name="maxNum"></a>
#### .number().max(number)
Checks if the `value` is lower than the passed max value.  
`number` is the number value to check.

<a name="minNum"></a>
#### .number().min(number)
Checks if the `value` is higher than the passed min value.  
`number` is the number value to check.

<a name="positive"></a>
#### .number().positive()
Checks if the `value` is positive.

<a name="negative"></a>
#### .number().negative()
Checks if the `value` is negative.

<a name="integer"></a>
#### .number().integer()
Checks if the `value` is an integer.
good
<a name="float"></a>
#### .number().float()
Checks if the `value` is a float.

<a name="safeInteger"></a>
#### .number().safeInteger()
Checks if the `value` is a safeInteger.

<a name="finite"></a>
#### .number().finite()
Checks if the `value` is finite.

<a name="multiple"></a>
#### .number().multiple(number)
Checks if the `value` is a multiple of the passed value.  
`number` is the multiple number value to check.

<a name="notnan"></a>
#### .number().notNaN()
Checks if the `value` is not a NaN.

<a name="portNumber"></a>
#### .number().port(reserved)
Checks if the `value` is a valid network port number.  
If `reserved` is equal to true, the test returns false if the port number is lower than 1024.


<a name="array"></a>
### tyval.array()
Checks if the `value` is an array.

<a name="maxArray"></a>
#### .array().max(number)
Checks if the `value.length` is lower than the passed max value.  
`number` is the number value to check.

<a name="minArray"></a>
#### .array().min(number)
Checks if the `value.length` is higher than the passed min value.  
`number` is the number value to check.

<a name="lengthArray"></a>
#### .array().length(number)
Checks if the `value.length` is the same as the passed value.  
`number` is the length number value to check.

<a name="containsArray"></a>
#### .array().contains(value)
Checks if the array `value` contains the passed value


<a name="date"></a>
### tyval.date()
Checks if the `value` is a date.

<a name="dateLower"></a>
#### .date().lower(date)
Checks if the `value.getTime()` is lower than the passed value.  
`date` is the date object to compare

<a name="dateHigher"></a>
#### .date().higher(date)
Checks if the `value.getTime()` is higher than the passed value.  
`date` is the date object to compare

<a name="boolean"></a>
### tyval.boolean()
Checks if the `value` is a boolean.

<a name="object"></a>
### tyval.object()
Checks if the `value` is an object.

<a name="emptyObject"></a>
#### .object().empty()
Checks if the `value` object is empty.

<a name="notNullObject"></a>
#### .object().notNull()
Checks if the `value` object is not null.  
This because typeof null = 'object'

<a name="notArrayObject"></a>
#### .object().notArray()
Checks if the `value` object is not an array.  
This because typeof [] = 'object'

<a name="notDateObject"></a>
#### .object().notDate()
Checks if the `value` object is not a date.  
This because typeof new Date() = 'object'

<a name="notRegExpObject"></a>
#### .object().notRegExp()
Checks if the `value` object is not a RegExp.  
This because typeof new RegExp() = 'object'

<a name="hasObject"></a>
#### .object().has(key, fast)
Checks if the `value` object has the key passed as string.  
If `fast`is *true* the overall performances gets ~10x speed, but the test fails if the key value exist and is equal to *undefined*.

<a name="hasNotObject"></a>
#### .object().hasNot(key, fast)
Checks if the `value` object has not the key passed as string.  
If `fast`is *true* the overall performances gets ~4x speed, but the test fails if the key value exist and is equal to *undefined*.


<a name="extend"></a>
### tyval._______.extend(function)
Adds a new validator to tyval.  
**Inside the `_______` field you must put the type of validator you need to extend.**  
You can access the value to validate via `value`   
Use `state = state &&` to elaborate your validation.  
Usage:
```javascript
tyval./*type you need to extend*/.extend(function someName () {
  // your validation code
  state = state && // your boolean validator
})
```
Example:
```javascript
tyval.number.extend(function isZero () {
  state = state && value === 0
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
  // your validation code
  console.log(param)
  state = state && // your boolean validator
})
```
As you can imagine, `value` and `state` are reserved names of **Tyval**, see [here](https://github.com/delvedor/Tyval/blob/master/vademecum.md) why.
```javascript
// usage example with a parameter
tyval.number.extend(function lessThan (num) {
  state = state && value < num
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
- [x] Implement tyval.array()
- [x] Implement max/min for array.length
- [x] Refactor of the tyval object, divide functions by field (string, number, array, object...) for a better maintainability
- [x] Add `Date` validator
- [x] Split test in multiple files
- [x] New string validation functions
- [x] Browser version
- [x] Improve lib code readability
- [x] In toFunction, move function parameters inside function blocks to avoid naming conflicts
- [ ] Add `Any` type
- [ ] Make compatible extend/getArgs with es6
- [ ] Improve generated code readability

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

Do you want to know more how this library is built?  
Have a look [here](https://github.com/delvedor/Tyval/blob/master/vademecum.md)!

I would make a special thanks to [@mcollina](https://github.com/mcollina) for helping me to improving the code.  

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
**[MIT](https://github.com/delvedor/Tyval/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

Copyright © 2016 Tomas Della Vedova
