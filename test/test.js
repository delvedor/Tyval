'use strict'

const test = require('ava')
const tyval = require('../tyval')

test('tyval', (t) => {
  t.plan(7)
  t.is(tyval('', 0).variable, '')
  t.is(tyval(5, 0).variable, 5)
  t.is(tyval(null, 0).variable, null)
  t.is(tyval(true, 0).variable, true)
  t.is(tyval(false, 0).variable, false)
  t.deepEqual(tyval({ a: 1 }, 0).variable, { a: 1 })
  t.is(tyval('', 1).planned, 1)
})

test('string', (t) => {
  t.plan(2)
  t.true(tyval('', 1).isString())
  t.false(tyval(1, 1).isString())
})

test('number', (t) => {
  t.plan(2)
  t.true(tyval(1, 1).isNumber())
  t.false(tyval('', 1).isNumber())
})

test('null', (t) => {
  t.plan(2)
  t.true(tyval(null, 1).isNull())
  t.false(tyval(1, 1).isNull())
})

test('undefined', (t) => {
  t.plan(2)
  t.true(tyval(undefined, 1).isUndefined())
  t.false(tyval(1, 1).isUndefined())
})

test('boolean', (t) => {
  t.plan(2)
  t.true(tyval(true, 1).isBoolean())
  t.false(tyval(1, 1).isBoolean())
})

test('object', (t) => {
  t.plan(2)
  t.true(tyval({}, 1).isObject())
  t.false(tyval(1, 1).isObject())
})

test('function', (t) => {
  t.plan(2)
  t.true(tyval(function () {}, 1).isFunction())
  t.false(tyval(1, 1).isFunction())
})

test('max', (t) => {
  t.plan(3)
  t.true(tyval(5, 2).isNumber().max(10))
  t.false(tyval(5, 2).isNumber().max(4))
  t.true(tyval('test', 2).isString().max(5))
})

test('min', (t) => {
  t.plan(3)
  t.true(tyval(15, 2).isNumber().min(10))
  t.false(tyval(3, 2).isNumber().min(4))
  t.true(tyval('test', 2).isString().min(2))
})

test('positive', (t) => {
  t.plan(2)
  t.true(tyval(1, 1).positive())
  t.false(tyval(-1, 1).positive())
})

test('negative', (t) => {
  t.plan(2)
  t.true(tyval(-1, 1).negative())
  t.false(tyval(1, 1).negative())
})

test('integer', (t) => {
  t.plan(2)
  t.true(tyval(1, 1).integer())
  t.false(tyval(1.5, 1).integer())
})

test('float', (t) => {
  t.plan(2)
  t.true(tyval(1.1, 1).float())
  t.false(tyval(1, 1).float())
})

test('safeInteger', (t) => {
  t.plan(2)
  t.true(tyval(1, 1).safeInteger())
  t.false(tyval(Number.MAX_SAFE_INTEGER + 1, 1).safeInteger())
})

test('finite', (t) => {
  t.plan(2)
  t.true(tyval(1, 1).finite())
  t.false(tyval(Number.POSITIVE_INFINITY, 1).finite())
})

test('test number validation', (t) => {
  t.plan(2)
  t.true(tyval(1, 6).isNumber().min(-5).max(10).integer().finite().safeInteger())
  t.false(tyval(1, 6).isNull().min(0).max(5).integer().finite().safeInteger())
})

test('extend', (t) => {
  tyval().extend(function isZero () {
    this.check &= this.variable === 0
    return this.plan()
  })
  t.plan(3)
  t.is(typeof tyval().isZero, 'function')
  t.true(tyval(0, 2).isNumber().isZero())
  t.false(tyval(1, 2).isNumber().isZero())
})
