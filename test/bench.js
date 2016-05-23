'use strict'

const bench = require('fastbench')
const tyval = require('../tyval')

const run = bench([
  function isString (done) {
    process.nextTick(() => { if (tyval('', 1).isString()) done() })
  },
  function isNumber (done) {
    process.nextTick(() => { if (tyval(1, 1).isNumber()) done() })
  },
  function isNull (done) {
    process.nextTick(() => { if (tyval(null, 1).isNull()) done() })
  },
  function isUndefined (done) {
    process.nextTick(() => { if (tyval(undefined, 1).isUndefined()) done() })
  },
  function isBoolean (done) {
    process.nextTick(() => { if (tyval(true, 1).isBoolean()) done() })
  },
  function isObject (done) {
    process.nextTick(() => { if (tyval({}, 1).isObject()) done() })
  },
  function isFunction (done) {
    process.nextTick(() => { if (tyval(function () {}, 1).isFunction()) done() })
  },
  function alphanum (done) {
    process.nextTick(() => { if (tyval('Abcd1234', 1).alphanum()) done() })
  },
  function regex (done) {
    process.nextTick(() => { if (tyval('Abcd1234', 1).regex(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i)) done() })
  },
  function max (done) {
    process.nextTick(() => { if (tyval(5, 1).max(10)) done() })
  },
  function min (done) {
    process.nextTick(() => { if (tyval(5, 1).min(1)) done() })
  },
  function positive (done) {
    process.nextTick(() => { if (tyval(5, 1).positive()) done() })
  },
  function negative (done) {
    process.nextTick(() => { if (tyval(-5, 1).negative()) done() })
  },
  function integer (done) {
    process.nextTick(() => { if (tyval(5, 1).integer()) done() })
  },
  function float (done) {
    process.nextTick(() => { if (tyval(5.1, 1).float()) done() })
  },
  function safeInteger (done) {
    process.nextTick(() => { if (tyval(5, 1).safeInteger()) done() })
  },
  function finite (done) {
    process.nextTick(() => { if (tyval(5, 1).finite()) done() })
  },
  function numberValidation (done) {
    process.nextTick(() => {
      if (tyval(1, 6).isNumber().min(-5).max(10).integer().finite().safeInteger()) done()
    })
  }
], 1000)

run(() => {
  run(run)
})
