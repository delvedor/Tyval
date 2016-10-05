'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('error', (t) => {
  t.plan(4)
  t.is(typeof tyval.error, 'function')
  let err = tyval.error()
  t.is(typeof err, 'function')
  t.true(err(new Error()))
  t.false(err([]))
})

test('error.RangeError', (t) => {
  t.plan(4)
  t.is(typeof tyval.error.RangeError, 'function')
  let err = tyval.error().RangeError()
  t.is(typeof err, 'function')
  t.true(err(new RangeError()))
  t.false(err(new Error()))
})

test('error.ReferenceError', (t) => {
  t.plan(4)
  t.is(typeof tyval.error.ReferenceError, 'function')
  let err = tyval.error().ReferenceError()
  t.is(typeof err, 'function')
  t.true(err(new ReferenceError()))
  t.false(err(new Error()))
})

test('error.SyntaxError', (t) => {
  t.plan(4)
  t.is(typeof tyval.error.SyntaxError, 'function')
  let err = tyval.error().SyntaxError()
  t.is(typeof err, 'function')
  t.true(err(new SyntaxError()))
  t.false(err(new Error()))
})

test('error.TypeError', (t) => {
  t.plan(4)
  t.is(typeof tyval.error.TypeError, 'function')
  let err = tyval.error().TypeError()
  t.is(typeof err, 'function')
  t.true(err(new TypeError()))
  t.false(err(new Error()))
})

test('error.message', (t) => {
  t.plan(4)
  t.is(typeof tyval.error.message, 'function')
  let err = tyval.error().message('some error')
  t.is(typeof err, 'function')
  t.true(err(new Error('some error')))
  t.false(err(new Error('other error')))
})
