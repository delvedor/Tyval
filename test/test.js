'use strict'
/* globals check, variable */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const test = require('ava')
const tyval = require('../tyval')

test('tyval', (t) => {
  t.plan(1)
  t.is(typeof tyval, 'object')
})

test('string', (t) => {
  t.plan(4)
  t.is(typeof tyval.string, 'function')
  let str = tyval.string().toFunction()
  t.is(typeof str, 'function')
  t.true(str('test'))
  t.false(str(1))
})

test('number', (t) => {
  t.plan(4)
  t.is(typeof tyval.number, 'function')
  let num = tyval.number().toFunction()
  t.is(typeof num, 'function')
  t.true(num(1))
  t.false(num('test'))
})

test('boolean', (t) => {
  t.plan(4)
  t.is(typeof tyval.boolean, 'function')
  let bool = tyval.boolean().toFunction()
  t.is(typeof bool, 'function')
  t.true(bool(true))
  t.false(bool('test'))
})

test('object', (t) => {
  t.plan(4)
  t.is(typeof tyval.object, 'function')
  let obj = tyval.object().toFunction()
  t.is(typeof obj, 'function')
  t.true(obj({}))
  t.false(obj('test'))
})

test('array', (t) => {
  t.plan(4)
  t.is(typeof tyval.array, 'function')
  let arr = tyval.array().toFunction()
  t.is(typeof arr, 'function')
  t.true(arr([]))
  t.false(arr('test'))
})

test('date', (t) => {
  t.plan(4)
  t.is(typeof tyval.date, 'function')
  let isDate = tyval.date().toFunction()
  t.is(typeof isDate, 'function')
  t.true(isDate(new Date()))
  t.false(isDate('2016-06-03T13:45:53.225Z'))
})

test('alphanum', (t) => {
  t.plan(5)
  t.is(typeof tyval.string.alphanum, 'function')
  let alp = tyval.string().alphanum().toFunction()
  t.is(typeof alp, 'function')
  t.true(alp('abcd1234'))
  t.false(alp('abcd'))
  t.false(alp('123'))
})

test('regex', (t) => {
  t.plan(5)
  t.is(typeof tyval.string.regex, 'function')
  let regex = tyval.string().regex(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i).toFunction()
  t.is(typeof regex, 'function')
  t.true(regex('abcd1234'))
  t.false(regex('abcd'))
  t.false(regex('123'))
})

test('maxStr', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.max, 'function')
  let max = tyval.string().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max('test'))
  t.false(max('testtesttest'))
})

test('minStr', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.min, 'function')
  let min = tyval.string().min(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min('test'))
  t.false(min('no'))
})

test('maxArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.max, 'function')
  let max = tyval.array().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max([1, 2, 3]))
  t.false(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
})

test('minArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.min, 'function')
  let min = tyval.array().min(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min([1, 2, 3, 4]))
  t.false(min([]))
})

test('lengthArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.length, 'function')
  let len = tyval.array().length(3).toFunction()
  t.is(typeof len, 'function')
  t.true(len([1, 2, 3]))
  t.false(len([1, 2]))
})

test('maxNum', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.max, 'function')
  let max = tyval.number().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max(5))
  t.false(max(15))
})

test('minNum', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.min, 'function')
  let min = tyval.number().min(4).toFunction()
  t.is(typeof min, 'function')
  t.true(min(5))
  t.false(min(3))
})

test('positive', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.positive, 'function')
  let pos = tyval.number().positive().toFunction()
  t.is(typeof pos, 'function')
  t.true(pos(5))
  t.false(pos(-5))
})

test('negative', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.negative, 'function')
  let neg = tyval.number().negative().toFunction()
  t.is(typeof neg, 'function')
  t.true(neg(-5))
  t.false(neg(5))
})

test('integer', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.integer, 'function')
  let int = tyval.number().integer().toFunction()
  t.is(typeof int, 'function')
  t.true(int(1))
  t.false(int(1.1))
})

test('float', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.float, 'function')
  let float = tyval.number().float().toFunction()
  t.is(typeof float, 'function')
  t.true(float(1.1))
  t.false(float(1))
})

test('safeInteger', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.safeInteger, 'function')
  let safe = tyval.number().safeInteger().toFunction()
  t.is(typeof safe, 'function')
  t.true(safe(1))
  t.false(safe(Number.MAX_SAFE_INTEGER + 1))
})

test('finite', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.finite, 'function')
  let fin = tyval.number().finite().toFunction()
  t.is(typeof fin, 'function')
  t.true(fin(1))
  t.false(fin(Number.POSITIVE_INFINITY))
})

test('multiple', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.multiple, 'function')
  let mul2 = tyval.number().multiple(2).toFunction()
  t.is(typeof mul2, 'function')
  t.true(mul2(10))
  t.false(mul2(3))
})

test('numTest', (t) => {
  t.plan(4)
  let numTest = tyval.number().min(-5).max(10).integer().finite().safeInteger().toFunction()
  t.is(typeof numTest, 'function')
  t.true(numTest(5))
  t.false(numTest(15))
  t.false(numTest('15'))
})

test('strTest', (t) => {
  t.plan(5)
  let strTest = tyval.string().min(5).max(10).alphanum().toFunction()
  t.is(typeof strTest, 'function')
  t.true(strTest('abc123'))
  t.false(strTest('abc'))
  t.false(strTest('123'))
  t.false(strTest(123))
})

test('arrayTest', (t) => {
  t.plan(4)
  let arrayTest = tyval.array().max(10).min(2).toFunction()
  t.is(typeof arrayTest, 'function')
  t.true(arrayTest([1, 2, 3]))
  t.false(arrayTest([1]))
  t.false(arrayTest({}))
})

test('number.extend', (t) => {
  t.plan(4)
  tyval.number.extend(function isZero () {
    tyval.number.validators.push(function isZero () {
      check = check && variable === 0
    })
    return this
  })
  t.is(typeof tyval.number.isZero, 'function')
  let zero = tyval.number().isZero().toFunction()
  t.is(typeof zero, 'function')
  t.true(zero(0))
  t.false(zero(1))
})

test('array.extend', (t) => {
  t.plan(4)
  tyval.array.extend(function empty () {
    tyval.array.validators.push(function empty () {
      check = check && variable.length === 0
    })
    return this
  })
  t.is(typeof tyval.array.empty, 'function')
  let empty = tyval.array().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty([]))
  t.false(empty([1]))
})

test('string.extend', (t) => {
  t.plan(4)
  tyval.string.extend(function empty () {
    tyval.string.validators.push(function empty () {
      check = check && variable.length === 0
    })
    return this
  })
  t.is(typeof tyval.string.empty, 'function')
  let empty = tyval.string().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty(''))
  t.false(empty('.'))
})
