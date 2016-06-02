'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

// Emulates the number test
// tyval.isNumber().minNum(-5).maxNum(10).integer().finite().safeInteger().toFunction()
const numTest = function (number) {
  let bool = true
  bool = bool && typeof number === 'number'
  if (!bool) return false
  bool = bool && number >= -5
  if (!bool) return false
  bool = bool && number <= 10
  if (!bool) return false
  bool = bool && Number.isInteger(number)
  if (!bool) return false
  bool = bool && Number.isFinite(number)
  if (!bool) return false
  bool = bool && Number.isSafeInteger(number)
  return bool
}

// Emulates the string test
// const strTest = tyval.isString().minStr(5).maxStr(10).alphanum().toFunction()
const strTest = function (string) {
  let bool = true
  bool = bool && typeof string === 'string'
  if (!bool) return false
  bool = bool && string.length >= 5
  if (!bool) return false
  bool = bool && string.length <= 10
  if (!bool) return false
  let reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
  bool = bool && reg.test(string)
  return bool
}

// Emulates the array test
// const arrayTest = tyval.isArray().maxArray(10).minArray(2).toFunction()
const arrayTest = function (array) {
  let bool = true
  bool = bool && Array.isArray(array)
  if (!bool) return false
  bool = bool && array.length <= 10
  if (!bool) return false
  bool = bool && array.length >= 2
  return bool
}

suite
  .add('numTest', function () {
    if (numTest(5)) noop()
  })
  .add('numTest-false', function () {
    if (numTest(-50)) noop()
  })
  .add('strTest', function () {
    if (strTest('abc123')) noop()
  })
  .add('strTest-false', function () {
    if (strTest('abcdef')) noop()
  })
  .add('arrayTest', function () {
    if (arrayTest([1, 2, 3])) noop()
  })
  .add('arrayTest-false', function () {
    if (arrayTest([1])) noop()
  })

  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()

function noop () {}
