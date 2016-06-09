'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()
const tyval = require('../tyval')

const numTest = tyval.number().min(-5).max(10).integer().finite().safeInteger().toFunction()
const strTest = tyval.string().min(5).max(10).alphanum().toFunction()
const arrayTest = tyval.array().max(10).min(2).toFunction()
const objTest = tyval.object().notNull().notArray().notDate().notRegExp().toFunction()
const objHas = tyval.object().has('test').has('bench').hasNot('nope').toFunction()
const objHasFast = tyval.object().has('test', true).has('bench', true).hasNot('nope', true).toFunction()

let objToTest = {
  test: 'test42',
  bench: 5
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
  .add('objTest', function () {
    if (objTest({})) noop()
  })
  .add('objTest-false', function () {
    if (objTest([])) noop()
  })
  .add('objHas', function () {
    if (objHas({test: 1, bench: 2})) noop()
  })
  .add('objHas-false', function () {
    if (objHas({test: 1, bench: 2, nope: 3})) noop()
  })
  .add('objHas(fast)', function () {
    if (objHasFast({test: 1, bench: 2})) noop()
  })
  .add('objHas(fast)-false', function () {
    if (objHasFast({test: 1, bench: 2, nope: 3})) noop()
  })
  .add('combined obj and str', function () {
    if (objHas(objToTest) && strTest(objToTest.test) && numTest(objToTest.bench)) noop()
  })
  .add('combined obj and str - fast', function () {
    if (objHasFast(objToTest) && strTest(objToTest.test) && numTest(objToTest.bench)) noop()
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()

function noop () {}
