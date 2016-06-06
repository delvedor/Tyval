'use strict'

const test = require('ava')
const tyval = require('../tyval')

test('object', (t) => {
  t.plan(4)
  t.is(typeof tyval.object, 'function')
  let obj = tyval.object().toFunction()
  t.is(typeof obj, 'function')
  t.true(obj({}))
  t.false(obj('test'))
})

test('empty object', (t) => {
  t.plan(4)
  t.is(typeof tyval.object.empty, 'function')
  let empty = tyval.object().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty({}))
  t.false(empty({key: 'value'}))
})
