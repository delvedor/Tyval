'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('object', (t) => {
  t.plan(4)
  t.is(typeof tyval.object, 'function')
  let obj = tyval.object().toFunction()
  t.is(typeof obj, 'function')
  t.true(obj({}))
  t.false(obj('test'))
})

test('object.empty', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.empty, 'function')
  let empty = tyval.object().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty({}))
  t.false(empty({key: 'value'}))
})

test('object.notNull', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.notNull, 'function')
  let n = tyval.object().notNull().toFunction()
  t.is(typeof n, 'function')
  t.true(n({}))
  t.false(n(null))
})

test('object.notArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.notArray, 'function')
  let a = tyval.object().notArray().toFunction()
  t.is(typeof a, 'function')
  t.true(a({}))
  t.false(a([]))
})

test('object.notDate', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.notDate, 'function')
  let n = tyval.object().notDate().toFunction()
  t.is(typeof n, 'function')
  t.true(n({}))
  t.false(n(new Date()))
})

test('object.notRegExp', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.notRegExp, 'function')
  let n = tyval.object().notRegExp().toFunction()
  t.is(typeof n, 'function')
  t.true(n({}))
  t.false(n(new RegExp()))
})

test('object.has', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.has, 'function')
  let has = tyval.object().has('test').toFunction()
  t.is(typeof has, 'function')
  t.true(has({test: ''}))
  t.false(has({nope: ''}))
})

test('object.has fast', (t) => {
  t.plan(5)
  t.is(typeof tyval.object.has, 'function')
  let has = tyval.object().has('test', true).toFunction()
  t.is(typeof has, 'function')
  t.true(has({test: ''}))
  t.false(has({nope: ''}))
  t.false(has({test: undefined}))
})

test('object.hasNot', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.hasNot, 'function')
  let hasNot = tyval.object().hasNot('test').toFunction()
  t.is(typeof hasNot, 'function')
  t.true(hasNot({nope: ''}))
  t.false(hasNot({test: ''}))
})

test('object.hasNot fast', (t) => {
  t.plan(5)
  t.is(typeof tyval.object.hasNot, 'function')
  let hasNot = tyval.object().hasNot('test', true).toFunction()
  t.is(typeof hasNot, 'function')
  t.true(hasNot({nope: ''}))
  t.false(hasNot({test: ''}))
  t.true(hasNot({test: undefined}))
})

test('object.has - multiple', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.has, 'function')
  let has = tyval.object().has('test').has('key').toFunction()
  t.is(typeof has, 'function')
  t.true(has({test: 1, key: 2}))
  t.false(has({test: 1, nope: 2}))
})

test('object.hasNot - multiple', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.hasNot, 'function')
  let hasNot = tyval.object().hasNot('test').hasNot('key').toFunction()
  t.is(typeof hasNot, 'function')
  t.true(hasNot({test: 1, nope: 2}))
  t.false(hasNot({test: 1, key: 2}))
})

test('object.has - object.hasNot', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.hasNot, 'function')
  let key = tyval.object().has('test').hasNot('key').toFunction()
  t.is(typeof key, 'function')
  t.true(key({test: 1, nope: 2}))
  t.false(key({test: 1, key: 2}))
})
