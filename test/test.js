'use strict'

/* globals variable, check */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const test = require('ava')
const tyval = require('../tyval')

test('tyval', (t) => {
  t.plan(1)
  t.is(typeof tyval, 'object')
})

test('string', (t) => {
  t.plan(4)
  t.is(typeof tyval.isString, 'function')
  let str = tyval.isString().toFunction()
  t.is(typeof str, 'function')
  t.true(str('test'))
  t.false(str(1))
})

test('number', (t) => {
  t.plan(4)
  t.is(typeof tyval.isNumber, 'function')
  let num = tyval.isNumber().toFunction()
  t.is(typeof num, 'function')
  t.true(num(1))
  t.false(num('test'))
})

test('null', (t) => {
  t.plan(4)
  t.is(typeof tyval.isNull, 'function')
  let nul = tyval.isNull().toFunction()
  t.is(typeof nul, 'function')
  t.true(nul(null))
  t.false(nul('test'))
})

test('undefined', (t) => {
  t.plan(4)
  t.is(typeof tyval.isUndefined, 'function')
  let und = tyval.isUndefined().toFunction()
  t.is(typeof und, 'function')
  t.true(und(undefined))
  t.false(und('test'))
})

test('boolean', (t) => {
  t.plan(4)
  t.is(typeof tyval.isBoolean, 'function')
  let bool = tyval.isBoolean().toFunction()
  t.is(typeof bool, 'function')
  t.true(bool(true))
  t.false(bool('test'))
})

test('object', (t) => {
  t.plan(4)
  t.is(typeof tyval.isObject, 'function')
  let obj = tyval.isObject().toFunction()
  t.is(typeof obj, 'function')
  t.true(obj({}))
  t.false(obj('test'))
})

test('array', (t) => {
  t.plan(4)
  t.is(typeof tyval.isArray, 'function')
  let arr = tyval.isArray().toFunction()
  t.is(typeof arr, 'function')
  t.true(arr([]))
  t.false(arr('test'))
})

test('function', (t) => {
  t.plan(4)
  t.is(typeof tyval.isFunction, 'function')
  let fun = tyval.isFunction().toFunction()
  t.is(typeof fun, 'function')
  t.true(fun(function () {}))
  t.false(fun('test'))
})

test('alphanum', (t) => {
  t.plan(5)
  t.is(typeof tyval.alphanum, 'function')
  let alp = tyval.alphanum().toFunction()
  t.is(typeof alp, 'function')
  t.true(alp('abcd1234'))
  t.false(alp('abcd'))
  t.false(alp('123'))
})

test('regex', (t) => {
  t.plan(5)
  t.is(typeof tyval.regex, 'function')
  let regex = tyval.regex('((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$', 'i').toFunction()
  t.is(typeof regex, 'function')
  t.true(regex('abcd1234'))
  t.false(regex('abcd'))
  t.false(regex('123'))
})

test('maxStr', (t) => {
  t.plan(4)
  t.is(typeof tyval.maxStr, 'function')
  let max = tyval.maxStr(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max('test'))
  t.false(max('testtesttest'))
})

test('minStr', (t) => {
  t.plan(4)
  t.is(typeof tyval.minStr, 'function')
  let min = tyval.minStr(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min('test'))
  t.false(min('no'))
})

test('maxArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.maxArray, 'function')
  let max = tyval.maxArray(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max([1, 2, 3]))
  t.false(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
})

test('minArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.minArray, 'function')
  let min = tyval.minArray(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min([1, 2, 3, 4]))
  t.false(min([]))
})

test('maxNum', (t) => {
  t.plan(4)
  t.is(typeof tyval.maxNum, 'function')
  let max = tyval.maxNum(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max(5))
  t.false(max(15))
})

test('minNum', (t) => {
  t.plan(4)
  t.is(typeof tyval.minNum, 'function')
  let min = tyval.minNum(4).toFunction()
  t.is(typeof min, 'function')
  t.true(min(5))
  t.false(min(3))
})

test('positive', (t) => {
  t.plan(4)
  t.is(typeof tyval.positive, 'function')
  let pos = tyval.positive().toFunction()
  t.is(typeof pos, 'function')
  t.true(pos(5))
  t.false(pos(-5))
})

test('negative', (t) => {
  t.plan(4)
  t.is(typeof tyval.negative, 'function')
  let neg = tyval.negative().toFunction()
  t.is(typeof neg, 'function')
  t.true(neg(-5))
  t.false(neg(5))
})

test('integer', (t) => {
  t.plan(4)
  t.is(typeof tyval.integer, 'function')
  let int = tyval.integer().toFunction()
  t.is(typeof int, 'function')
  t.true(int(1))
  t.false(int(1.1))
})

test('float', (t) => {
  t.plan(4)
  t.is(typeof tyval.float, 'function')
  let float = tyval.float().toFunction()
  t.is(typeof float, 'function')
  t.true(float(1.1))
  t.false(float(1))
})

test('safeInteger', (t) => {
  t.plan(4)
  t.is(typeof tyval.safeInteger, 'function')
  let safe = tyval.safeInteger().toFunction()
  t.is(typeof safe, 'function')
  t.true(safe(1))
  t.false(safe(Number.MAX_SAFE_INTEGER + 1))
})

test('finite', (t) => {
  t.plan(4)
  t.is(typeof tyval.finite, 'function')
  let fin = tyval.finite().toFunction()
  t.is(typeof fin, 'function')
  t.true(fin(1))
  t.false(fin(Number.POSITIVE_INFINITY))
})

test('big test', (t) => {
  t.plan(4)
  let check = tyval.isNumber().minNum(-5).maxNum(10).integer().finite().safeInteger().toFunction()
  t.is(typeof check, 'function')
  t.true(check(5))
  t.false(check(15))
  t.false(check('15'))
})

test('extend', (t) => {
  t.plan(4)
  tyval.extend(function isZero () {
    this.validators.push(function isZero () {
      check = check && variable === 0
    })
    return this
  })
  t.is(typeof tyval.isZero, 'function')
  let zero = tyval.isZero().toFunction()
  t.is(typeof zero, 'function')
  t.true(zero(0))
  t.false(zero(1))
})
