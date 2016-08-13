# Tyval [![NPM version](https://img.shields.io/npm/v/tyval.svg?style=flat)](https://www.npmjs.com/package/tyval)
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

___

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

___
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

___
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

___
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

___
<a name="boolean"></a>
### tyval.boolean()
Checks if the `value` is a boolean.

___
<a name="object"></a>
### tyval.object()
Checks if the `value` is an object.

<a name="emptyObject"></a>
#### .object().empty()
Checks if the `value` object is empty.

<a name="notNullObject"></a>
#### .object().notNull()
Checks if the `value` object is not null.  
This because `typeof null = 'object'`

<a name="notArrayObject"></a>
#### .object().notArray()
Checks if the `value` object is not an array.  
This because `typeof [] = 'object'`

<a name="notDateObject"></a>
#### .object().notDate()
Checks if the `value` object is not a date.  
This because `typeof new Date() = 'object'`

<a name="notRegExpObject"></a>
#### .object().notRegExp()
Checks if the `value` object is not a RegExp.  
This because `typeof new RegExp() = 'object'`

<a name="hasObject"></a>
#### .object().has(key, fast)
Checks if the `value` object has the key passed as string.  
If `fast`is *true* the overall performances gets ~10x speed, but the test fails if the key value exist and is equal to *undefined*.

<a name="hasNotObject"></a>
#### .object().hasNot(key, fast)
Checks if the `value` object has not the key passed as string.  
If `fast`is *true* the overall performances gets ~4x speed, but the test fails if the key value exist and is equal to *undefined*.

___
<a name="extend"></a>
### tyval._______.extend(function)
Adds a new validator to tyval.  
**Inside the `_______` field you must put the type of validator you need to extend.**  
You can access the value to validate via `value`   
Use `if (condition) { errors++ }` to elaborate your validation.  
Usage:
```javascript
tyval./*type you need to extend*/.extend(function someName () {
  // your validation code
  if (/* your boolean validator */) {
    errors++
  }
})
```
Example:
```javascript
tyval.number.extend(function isZero () {
  if (value !== 0) {
    errors++
  }
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
  console.log($param$)
  if (/* your boolean validator */) {
    errors++
  }
})
```
As you can imagine, `value` and `errors` are reserved names of **Tyval**, see [here](https://github.com/delvedor/Tyval/blob/master/docs/vademecum.md) why.  
If you are passing some variable in your function, write it with `'$'` inside your code, as you can see in the example, see [here](https://github.com/delvedor/Tyval/blob/master/docs/vademecum.md#whydollar) why.
```javascript
// usage example with a parameter
tyval.number.extend(function lessThan (num) {
  if (value > $num$) {
    errors++
  }
})
// let's use the extended function with a parameter
const ltf = tyval.number().lessThan(50).toFunction()
if (ltf(10)) {
  console.log('is less than 50!')
}
```
*Did you made a cool validator? Open a pull request! ;)*
