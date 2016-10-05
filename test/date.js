'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('date', (t) => {
  t.plan(4)
  t.is(typeof tyval.date, 'function')
  let isDate = tyval.date()
  t.is(typeof isDate, 'function')
  t.true(isDate(new Date()))
  t.false(isDate('2016-06-03T13:45:53.225Z'))
})

test('date.lower', (t) => {
  t.plan(4)
  t.is(typeof tyval.date.lower, 'function')
  let l = new Date()
  while (l.getTime() === new Date().getTime()) {}
  let h = new Date()
  let date = tyval.date().lower(h)
  t.is(typeof date, 'function')
  t.true(date(l))
  t.false(date(h))
})

test('date.higher', (t) => {
  t.plan(4)
  t.is(typeof tyval.date.lower, 'function')
  let l = new Date()
  while (l.getTime() === new Date().getTime()) {}
  let h = new Date()
  let date = tyval.date().higher(l)
  t.is(typeof date, 'function')
  t.true(date(h))
  t.false(date(l))
})
