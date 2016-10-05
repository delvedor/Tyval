'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('tyval', (t) => {
  t.plan(1)
  t.is(typeof tyval, 'object')
})

/* eslint-disable no-undef, no-unused-vars */
test('common.toFunction', (t) => {
  const common = require('../lib/common')
  t.plan(2)
  t.is(typeof common.toFunction, 'function')
  t.is(typeof common.toFunction(() => {}), 'function')
})

test('common.toFunction - well formatted', (t) => {
  const common = require('../lib/common')
  t.plan(3)
  const num = function () {
    return toFunction(null, function () {
      if (typeof value !== 'number') {
        return false
      }
    })
  }
  const toFunction = common.toFunction(num)
  t.is(typeof num(), 'function')
  t.true(num()(5))
  t.false(num()('5'))
})

test('common.toFunction - bad formatted', (t) => {
  const common = require('../lib/common')
  t.plan(3)
  const num = function () {
    return toFunction(null, function () {if(typeof value !=='number' ){return false }   }) // eslint-disable-line
  }
  const toFunction = common.toFunction(num)
  t.is(typeof num(), 'function')
  t.true(num()(5))
  t.false(num()('5'))
})

test('common.toFunction - arrow function', (t) => {
  const common = require('../lib/common')
  t.plan(3)
  const num = function () {
    return toFunction(null, () => {
      if (typeof value !== 'number') {
        return false
      }
    })
  }
  const toFunction = common.toFunction(num)
  t.is(typeof num(), 'function')
  t.true(num()(5))
  t.false(num()('5'))
})

test('common.toFunction - parameters', (t) => {
  const common = require('../lib/common')
  t.plan(3)
  const num = function (max) {
    return toFunction(null, function () {
      if (value !== $max$) {
        return false
      }
    }, { $max$: max })
  }
  const toFunction = common.toFunction(num)
  t.is(typeof num(), 'function')
  t.true(num(5)(5))
  t.false(num(5)('5'))
})

test('common.toFunction - throw', (t) => {
  const common = require('../lib/common')
  t.plan(4)
  try {
    common.toFunction(null)
    t.fail()
  } catch (e) {
    t.pass()
  }

  const toFunction = common.toFunction(() => {})
  try {
    toFunction(5)
    t.fail()
  } catch (e) {
    t.pass()
  }
  try {
    toFunction(null, 5)
    t.fail()
  } catch (e) {
    t.pass()
  }
  try {
    toFunction(null, () => {}, 5)
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('or internal function declaration', (t) => {
  t.plan(6)
  t.is(typeof tyval.or, 'function')
  let validation = tyval.or(tyval.number().min(1).max(10), tyval.string().min(1).max(10))
  t.is(typeof validation, 'function')
  t.true(validation(5))
  t.true(validation('test'))
  t.false(validation(50))
  t.false(validation('I will fail'))
})

test('or external function declaration', (t) => {
  t.plan(6)
  t.is(typeof tyval.or, 'function')
  const num = tyval.number().min(1).max(10)
  const str = tyval.string().min(1).max(10)
  let validation = tyval.or(num, str)
  t.is(typeof validation, 'function')
  t.true(validation(5))
  t.true(validation('test'))
  t.false(validation(50))
  t.false(validation('I will fail'))
})

test('or mixed function declaration', (t) => {
  t.plan(6)
  t.is(typeof tyval.or, 'function')
  const num = tyval.number().min(1).max(10)
  let validation = tyval.or(num, tyval.string().min(1).max(10))
  t.is(typeof validation, 'function')
  t.true(validation(5))
  t.true(validation('test'))
  t.false(validation(50))
  t.false(validation('I will fail'))
})

test('or multiple', (t) => {
  t.plan(8)
  t.is(typeof tyval.or, 'function')
  const num = tyval.number().min(1).max(10)
  const str = tyval.string().min(1).max(10)
  const obj = tyval.object().empty()
  let validation = tyval.or(num, str, obj)
  t.is(typeof validation, 'function')
  t.true(validation(5))
  t.true(validation('test'))
  t.true(validation({}))
  t.false(validation(50))
  t.false(validation('I will fail'))
  t.false(validation({ a: '1' }))
})

test('or number range', (t) => {
  t.plan(3)
  const num1 = tyval.number().max(1)
  const num2 = tyval.number().min(10)
  // represents n < 1 || n > 10
  const or = tyval.or(num1, num2)
  t.true(or(20))
  t.true(or(-3))
  t.false(or(5))
})
