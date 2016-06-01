'use strict'

const bench = require('fastbench')
const tyval = require('../tyval')

const isString = tyval.isString().toFunction()
const isNumber = tyval.isNumber().toFunction()
const isNull = tyval.isNull().toFunction()
const isUndefined = tyval.isUndefined().toFunction()
const isBoolean = tyval.isBoolean().toFunction()
const isObject = tyval.isObject().toFunction()
const isFunction = tyval.isFunction().toFunction()
const alphanum = tyval.alphanum().toFunction()
const regex = tyval.regex('((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$', 'i').toFunction()
const maxStr = tyval.maxStr(10).toFunction()
const minStr = tyval.minStr(1).toFunction()
const maxNum = tyval.maxNum(10).toFunction()
const minNum = tyval.minNum(1).toFunction()
const positive = tyval.positive().toFunction()
const negative = tyval.negative().toFunction()
const integer = tyval.integer().toFunction()
const float = tyval.float().toFunction()
const safeInteger = tyval.safeInteger().toFunction()
const finite = tyval.finite().toFunction()
const bigTest = tyval.isNumber().minNum(-5).maxNum(10).integer().finite().safeInteger().toFunction()

const run = bench([
  function benchIsString (done) {
    process.nextTick(() => { if (isString('test')) done() })
  },
  function benchIsNumber (done) {
    process.nextTick(() => { if (isNumber(1)) done() })
  },
  function benchIsNull (done) {
    process.nextTick(() => { if (isNull(null)) done() })
  },
  function benchIsUndefined (done) {
    process.nextTick(() => { if (isUndefined(undefined)) done() })
  },
  function benchIsBoolean (done) {
    process.nextTick(() => { if (isBoolean(true)) done() })
  },
  function benchIsObject (done) {
    process.nextTick(() => { if (isObject({})) done() })
  },
  function benchIsFunction (done) {
    process.nextTick(() => { if (isFunction(function () {})) done() })
  },
  function benchAlphanum (done) {
    process.nextTick(() => { if (alphanum('abc123')) done() })
  },
  function benchRegex (done) {
    process.nextTick(() => { if (regex('abc123')) done() })
  },
  function benchMaxStr (done) {
    process.nextTick(() => { if (maxStr('ciao')) done() })
  },
  function benchMinStr (done) {
    process.nextTick(() => { if (minStr('ciao')) done() })
  },
  function benchMaxNum (done) {
    process.nextTick(() => { if (maxNum(5)) done() })
  },
  function benchMinNum (done) {
    process.nextTick(() => { if (minNum(5)) done() })
  },
  function benchPositive (done) {
    process.nextTick(() => { if (positive(5)) done() })
  },
  function benchNegative (done) {
    process.nextTick(() => { if (negative(-5)) done() })
  },
  function benchInteger (done) {
    process.nextTick(() => { if (integer(1)) done() })
  },
  function benchFloat (done) {
    process.nextTick(() => { if (float(1.1)) done() })
  },
  function benchSafeInteger (done) {
    process.nextTick(() => { if (safeInteger(10)) done() })
  },
  function benchFinite (done) {
    process.nextTick(() => { if (finite(10)) done() })
  },
  function benchBigTest (done) {
    process.nextTick(() => { if (bigTest(5)) done() })
  }
], 1000)

run(run)
