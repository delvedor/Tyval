'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('boolean', (t) => {
  t.plan(4)
  t.is(typeof tyval.boolean, 'function')
  let bool = tyval.boolean().toFunction()
  t.is(typeof bool, 'function')
  t.true(bool(true))
  t.false(bool('test'))
})

