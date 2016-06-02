'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()
const tyval = require('../tyval')

const numTest = tyval.isNumber().minNum(-5).maxNum(10).integer().finite().safeInteger().toFunction()
const strTest = tyval.isString().minStr(5).maxStr(10).alphanum().toFunction()
const arrayTest = tyval.isArray().maxArray(10).minArray(2).toFunction()

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
