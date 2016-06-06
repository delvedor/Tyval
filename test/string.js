'use strict'
/* globals check, variable */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const test = require('ava')
const tyval = require('../tyval')

test('string', (t) => {
  t.plan(4)
  t.is(typeof tyval.string, 'function')
  let str = tyval.string().toFunction()
  t.is(typeof str, 'function')
  t.true(str('test'))
  t.false(str(1))
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

test('lengthString', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.length, 'function')
  let len = tyval.string().length(4).toFunction()
  t.is(typeof len, 'function')
  t.true(len('test'))
  t.false(len('!test'))
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
