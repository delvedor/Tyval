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
  t.plan(4)
  t.is(typeof common.toFunction, 'function')
  const validators = [
    function val1 () {
      check = !variable
    },
    function val2 () {
      check = variable
    },
    () => {
      check = variable
    },
    () => {check=variable;let a=true;let b=a;}, // eslint-disable-line
    () => {
      let a = obj.bool
      let b = obj.num
      let c = obj.str
      let d = str
      let e = max
      let f = 0
    }
  ]
  const parameters = {
    min: 0,
    max: 1,
    reg: /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i,
    obj: { bool: true, num: 2, str: 'str' },
    str: 'string'
  }
  const gen = common.toFunction(validators, parameters)
  t.is(typeof gen, 'function')
  t.true(gen(true))
  t.false(gen(false))
})

test('common.toFunction - errored', (t) => {
  const common = require('../lib/common')
  t.plan(1)
  const validators = [
    // Fix for make the test pass under node v4
    function f (/* {err: or} */) {
      check = variable
    }
  ]
  try {
    let f = common.toFunction(validators, {})
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'SyntaxError: Unexpected token *')
  }
})
/* eslint-disable no-undef, no-unused-vars */

