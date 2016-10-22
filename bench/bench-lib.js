'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()
const tyval = require('../tyval')

const numTest = tyval.number().min(-5).max(10).integer().finite().safeInteger()
const strTest = tyval.string().min(5).max(10).alphanum()
const arrayTest = tyval.array().max(10).min(2)
const objTest = tyval.object().notNull().notArray().notDate().notRegExp()
const objHas = tyval.object().has('test').has('bench').hasNot('nope')
const objHasFast = tyval.object().has('test', { fast: true }).has('bench', { fast: true }).hasNot('nope', { fast: true })

let objToTest = {
  test: 'test42',
  bench: 5
}

suite
  .add('numTest', function () {
    numTest(5)
  })
  .add('numTest-false', function () {
    numTest(-50)
  })
  .add('strTest', function () {
    strTest('abc123')
  })
  .add('strTest-false', function () {
    strTest('abcdef')
  })
  .add('arrayTest', function () {
    arrayTest([1, 2, 3])
  })
  .add('arrayTest-false', function () {
    arrayTest([1])
  })
  .add('objTest', function () {
    objTest({})
  })
  .add('objTest-false', function () {
    objTest([])
  })
  .add('objHas', function () {
    objHas({test: 1, bench: 2})
  })
  .add('objHas-false', function () {
    objHas({test: 1, bench: 2, nope: 3})
  })
  .add('objHas(fast)', function () {
    objHasFast({test: 1, bench: 2})
  })
  .add('objHas(fast)-false', function () {
    objHasFast({test: 1, bench: 2, nope: 3})
  })
  .add('combined obj and str', function () {
    objHas(objToTest) && strTest(objToTest.test) && numTest(objToTest.bench)
  })
  .add('combined obj and str - fast', function () {
    objHasFast(objToTest) && strTest(objToTest.test) && numTest(objToTest.bench)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()
