# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval) [![NPM version](https://img.shields.io/npm/v/tyval.svg?style=flat)](https://www.npmjs.com/package/tyval) [![NPM downloads](https://img.shields.io/npm/dm/tyval.svg)](https://www.npmjs.com/package/tyval)

> Programs should be written for people to read, and only incidentally for machines to execute.  
> [Abelson and Sussman]

**Tyval** is a validator for JavaScript, focused on **performances** and **extensibility**.  

The API is highly inspired from [Joi](https://github.com/hapijs/joi), but the implementation is very different. Tyval uses [code generation](https://github.com/delvedor/Tyval/blob/master/docs/vademecum.md) to achieve maximum speed when evaluating a variable.  
Tyval is designed to validate single values in a synchronous way and has not an error management, it always returns a boolean, *true* if all the validations has passed, *false* if at least one has failed, the design of the API forces to write atomic test, in this way the result of a single test does not influence the others.


**Needs Node.js ≥ 4.0.0**

[Benchmark](https://github.com/delvedor/Tyval/blob/master/bench/bench-other-libs.js) comparisons with other libraries:
```bash
tyval (num) x 78,669,467 ops/sec ±1.75% (82 runs sampled)
joi (num) x 37,540 ops/sec ±0.91% (89 runs sampled)
validate.js (num) x 83,675 ops/sec ±1.60% (89 runs sampled)
is-my-json-valid (num) x 61,898,685 ops/sec ±1.46% (88 runs sampled)

tyval (str) x 81,093,089 ops/sec ±1.56% (85 runs sampled)
joi (str) x 22,927 ops/sec ±1.40% (91 runs sampled)
validate.js (str) x 96,270 ops/sec ±1.14% (91 runs sampled)
is-my-json-valid (str) x 12,099,361 ops/sec ±1.13% (85 runs sampled)
```

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
  console.log('Inside the range!')
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
- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#string"><code>tyval.<b>string()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#alphanum"><code>tyval.string().<b>alphanum()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#regex"><code>tyval.string().<b>regex()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#maxStr"><code>tyval.string().<b>max()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#minStr"><code>tyval.string().<b>min()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#lengthStr"><code>tyval.string().<b>length()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#mailStr"><code>tyval.string().<b>mail()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#ipv4Str"><code>tyval.string().<b>ipv4()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#ipv6Str"><code>tyval.string().<b>ipv6()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#base64"><code>tyval.string().<b>base64()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#json"><code>tyval.string().<b>JSON()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#uuid"><code>tyval.string().<b>uuid()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#mac"><code>tyval.string().<b>MAC()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#md5"><code>tyval.string().<b>md5()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#card"><code>tyval.string().<b>card()</b></code></a>


- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#number"><code>tyval.<b>number()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#maxNum"><code>tyval.number().<b>max()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#minNum"><code>tyval.number().<b>min()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#positive"><code>tyval.number().<b>positive()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#negative"><code>tyval.number().<b>negative()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#integer"><code>tyval.number().<b>integer()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#float"><code>tyval.number().<b>float()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#safeInteger"><code>tyval.number().<b>safeInteger()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#finite"><code>tyval.number().<b>finite()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#multiple"><code>tyval.number().<b>multiple()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#notnan"><code>tyval.number().<b>notNaN()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#portNumber"><code>tyval.number().<b>port()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#array"><code>tyval.<b>array()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#maxArray"><code>tyval.array().<b>max()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#minArray"><code>tyval.array().<b>min()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#lengthArray"><code>tyval.array().<b>length()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#containsArray"><code>tyval.array().<b>contains()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#itemsArray"><code>tyval.array().<b>items()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#date"><code>tyval.<b>date()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#dateLower"><code>tyval.date().<b>lower()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#dateHigher"><code>tyval.date().<b>higher()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#boolean"><code>tyval.<b>boolean()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#object"><code>tyval.<b>object()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#emptyObject"><code>tyval.object().<b>empty()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#notNullObject"><code>tyval.object().<b>notNull()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#notArrayObject"><code>tyval.object().<b>notArray()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#notDateObject"><code>tyval.object().<b>notDate()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#notRegExpObject"><code>tyval.object().<b>notRegExp()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#hasObject"><code>tyval.object().<b>has()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#hasNotObject"><code>tyval.object().<b>hasNot()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#Error"><code>tyval.<b>error()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#RangeError"><code>tyval.error().<b>RangeError()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#ReferenceError"><code>tyval.error().<b>ReferenceError()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#SyntaxError"><code>tyval.error().<b>SyntaxError()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#TypeError"><code>tyval.error().<b>TypeError()</b></code></a>
  * <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#message"><code>tyval.error().<b>message()</b></code></a>

- <a href="https://github.com/delvedor/Tyval/blob/master/docs/API.md#extend"><code>tyval._______.<b>extend()</b></code></a>

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
- [ ] Add `.or`functionality, eg: `tyval.string().or.number().toFunction()`
- [ ] Add `.not`functionality eg: `tyval.not.string().toFunction()`

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

Do you want to know more how this library is built?  
Have a look [here](https://github.com/delvedor/Tyval/blob/master/docs/vademecum.md)!

I would make a special thanks to [@mcollina](https://github.com/mcollina) for helping me to improving the code.  

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
**[MIT](https://github.com/delvedor/Tyval/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

Copyright © 2016 Tomas Della Vedova
