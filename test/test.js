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
  const validators = [{
    function: function val1 () {
      if (value !== true) {
        errors++
      }
    },
    parameters: {}
  }, {
    function: function val2 () {
      if (value === false) {
        errors++
      }
    },
    parameters: {}
  }, {
    function: () => {
      let a = 2
    },
    parameters: {}
  }, {
    function: () => {let a=true;let b=a;}, // eslint-disable-line
    parameters: {}
  }, {
    function: () => {
      let a = $obj$.bool
      let b = $obj$.num
      let c = $obj$.str
      let d = $str$
      let e = $max$
      let f = 0
    },
    parameters: {
      $obj$: { bool: true, num: 2, str: 'str' },
      $str$: 'string',
      $max$: 2
    }
  }]
  const gen = common.toFunction(validators)
  t.is(typeof gen, 'function')
  t.true(gen(true))
  t.false(gen(false))
})

test('common.toFunction - errored', (t) => {
  t.plan(4)
  const common = require('../lib/common')
  const badValidators = [{
    // Fix for make the test pass under node v4
    function: function f (/* {err: or} */) {
      let a = 2
    },
    parameters: {}
  }]
  const badParameters = [{
    function: function f () {
      let a = 2
    },
    parameters: 1
  }]

  const badFunction = [{
    function: null,
    parameters: {}
  }]

  try {
    let f = common.toFunction(badValidators)
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'SyntaxError: Unexpected token *')
  }

  try {
    let f = common.toFunction(badParameters)
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'TypeError: validator.parameters is not an object')
  }

  try {
    let f = common.toFunction(badFunction)
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'TypeError: validator.function is not a function')
  }

  try {
    let f = common.toFunction(null)
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'TypeError: Validators is not an array')
  }
})

test('common.extend', (t) => {
  t.plan(5)
  const tyval = require('../tyval')
  const common = require('../lib/common')
  common.extend(tyval.number, function is50 (fifty) {
    if (value !== fifty) {
      errors++
    }
  })
  t.is(typeof tyval.number.is50, 'function')

  let f = tyval.number().is50(50)
  t.is(typeof tyval.number.validators[1].function, 'function')
  t.is(typeof tyval.number.validators[1].parameters, 'object')
  t.is(typeof tyval.number.validators[1].parameters.$fifty$, 'number')
  t.is(tyval.number.validators[1].parameters.$fifty$, 50)
})

test('common.extend - errored', (t) => {
  t.plan(1)
  const common = require('../lib/common')
  try {
    let f = common.extend('test')
    t.fail()
  } catch (e) {
    t.is(e.toString(), 'TypeError: func is not a function')
  }
})
/* eslint-disable no-undef, no-unused-vars */

