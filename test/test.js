'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('tyval', (t) => {
  t.plan(1)
  t.is(typeof tyval, 'object')
})

/* eslint-disable no-undef */
test('common.toFunction', (t) => {
  const common = require('../lib/common')
  t.plan(4)
  t.is(typeof common.toFunction, 'function')
  const validators = [
    function val1 () {
      check = !variable
    },
    function val2 () {
      check = variable
    }
  ]
  const parameters = {
    min: 0,
    max: 1
  }
  const gen = common.toFunction(validators, parameters)
  t.is(typeof gen, 'function')
  t.true(gen(true))
  t.false(gen(false))
})
/* eslint-disable no-undef */

