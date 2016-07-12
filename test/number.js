'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('number', (t) => {
  t.plan(4)
  t.is(typeof tyval.number, 'function')
  let num = tyval.number().toFunction()
  t.is(typeof num, 'function')
  t.true(num(1))
  t.false(num('test'))
})

test('number.max', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.max, 'function')
  let max = tyval.number().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max(5))
  t.false(max(15))
})

test('number.min', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.min, 'function')
  let min = tyval.number().min(4).toFunction()
  t.is(typeof min, 'function')
  t.true(min(5))
  t.false(min(3))
})

test('number.positive', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.positive, 'function')
  let pos = tyval.number().positive().toFunction()
  t.is(typeof pos, 'function')
  t.true(pos(5))
  t.false(pos(-5))
})

test('number.negative', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.negative, 'function')
  let neg = tyval.number().negative().toFunction()
  t.is(typeof neg, 'function')
  t.true(neg(-5))
  t.false(neg(5))
})

test('number.integer', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.integer, 'function')
  let int = tyval.number().integer().toFunction()
  t.is(typeof int, 'function')
  t.true(int(1))
  t.false(int(1.1))
})

test('number.float', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.float, 'function')
  let float = tyval.number().float().toFunction()
  t.is(typeof float, 'function')
  t.true(float(1.1))
  t.false(float(1))
})

test('number.safeInteger', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.safeInteger, 'function')
  let safe = tyval.number().safeInteger().toFunction()
  t.is(typeof safe, 'function')
  t.true(safe(1))
  t.false(safe(Number.MAX_SAFE_INTEGER + 1))
})

test('number.finite', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.finite, 'function')
  let fin = tyval.number().finite().toFunction()
  t.is(typeof fin, 'function')
  t.true(fin(1))
  t.false(fin(Number.POSITIVE_INFINITY))
})

test('number.multiple', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.multiple, 'function')
  let mul2 = tyval.number().multiple(2).toFunction()
  t.is(typeof mul2, 'function')
  t.true(mul2(10))
  t.false(mul2(3))
})

test('numTest', (t) => {
  t.plan(5)
  let numTest = tyval.number().min(-5).max(10).integer().finite().safeInteger().toFunction()
  t.is(typeof numTest, 'function')
  t.true(numTest(5))
  t.false(numTest(15))
  t.false(numTest('15'))
  t.false(numTest(NaN))
})

/* eslint-disable no-undef */
test('number.extend', (t) => {
  t.plan(4)
  tyval.number.extend(function isZero () {
    state = state && value === 0
  })
  t.is(typeof tyval.number.isZero, 'function')
  let zero = tyval.number().isZero().toFunction()
  t.is(typeof zero, 'function')
  t.true(zero(0))
  t.false(zero(1))
})
/* eslint-disable no-undef */

test('number.notNaN', (t) => {
  t.plan(4)
  t.is(typeof tyval.number.notNaN, 'function')
  let n = tyval.number().notNaN().toFunction()
  t.is(typeof n, 'function')
  t.true(n(1))
  t.false(n(NaN))
})

test('number.port', (t) => {
  t.plan(8)
  t.is(typeof tyval.number.port, 'function')
  let port = tyval.number().port().toFunction()
  let portReserved = tyval.number().port(true).toFunction()
  t.is(typeof port, 'function')
  t.is(typeof portReserved, 'function')
  t.true(port(1024))
  t.false(port(-10))
  t.false(port(70000))
  t.true(portReserved(1025))
  t.false(portReserved(1000))
})
