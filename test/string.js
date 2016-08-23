'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('../tyval')

test('string', (t) => {
  t.plan(4)
  t.is(typeof tyval.string, 'function')
  let str = tyval.string().toFunction()
  t.is(typeof str, 'function')
  t.true(str('test'))
  t.false(str(1))
})

test('string.alphanum', (t) => {
  t.plan(5)
  t.is(typeof tyval.string.alphanum, 'function')
  let alp = tyval.string().alphanum().toFunction()
  t.is(typeof alp, 'function')
  t.true(alp('abcd1234'))
  t.false(alp('abcd'))
  t.false(alp('123'))
})

test('string.regex', (t) => {
  t.plan(5)
  t.is(typeof tyval.string.regex, 'function')
  let regex = tyval.string().regex(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i).toFunction()
  t.is(typeof regex, 'function')
  t.true(regex('abcd1234'))
  t.false(regex('abcd'))
  t.false(regex('123'))
})

test('string.max', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.max, 'function')
  let max = tyval.string().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max('test'))
  t.false(max('testtesttest'))
})

test('string.min', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.min, 'function')
  let min = tyval.string().min(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min('test'))
  t.false(min('no'))
})

test('string.length', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.length, 'function')
  let len = tyval.string().length(4).toFunction()
  t.is(typeof len, 'function')
  t.true(len('test'))
  t.false(len('!test'))
})

test('strTest', (t) => {
  t.plan(5)
  let strTest = tyval.string().min(5).max(10).alphanum().toFunction()
  t.is(typeof strTest, 'function')
  t.true(strTest('abc123'))
  t.false(strTest('abc'))
  t.false(strTest('123'))
  t.false(strTest(123))
})

test('string.mail', (t) => {
  t.plan(9)
  t.is(typeof tyval.string.mail, 'function')
  let mail = tyval.string().mail().toFunction()
  t.is(typeof mail, 'function')
  t.true(mail('test@gmail.com'))
  t.true(mail('make.test@sub.domain.com'))
  t.true(mail('the.answer.is.42@sub.sub.domain.eu'))
  t.false(mail('test@gmail.'))
  t.false(mail('test.gmail@.it'))
  t.false(mail('t.e.s.t.@g.e'))
  t.false(mail('t@t.t'))
})

test('string.ipv4', (t) => {
  t.plan(9)
  t.is(typeof tyval.string.ipv4, 'function')
  let ip = tyval.string().ipv4().toFunction()
  t.is(typeof ip, 'function')
  t.true(ip('192.168.20.20'))
  t.true(ip('0.255.0.255'))
  t.true(ip('0.0.0.0'))
  t.false(ip('192.168'))
  t.false(ip('192.168.20.256'))
  t.false(ip('::1'))
  t.false(ip('2001:0db8::1428:57ab'))
})

test('string.ipv6', (t) => {
  t.plan(13)
  t.is(typeof tyval.string.ipv6, 'function')
  let ip = tyval.string().ipv6().toFunction()
  t.is(typeof ip, 'function')
  t.true(ip('2001:0db8:0000:0000:0000:0000:1428:57ab'))
  t.true(ip('2001:0db8:0000:0000::1428:57ab'))
  t.true(ip('2001:0db8:0:0:0:0:1428:57ab'))
  t.true(ip('2001:0db8:0::0:1428:57ab'))
  t.true(ip('2001:0db8::1428:57ab'))
  t.false(ip('2001:0db8::25de::cade'))
  t.false(ip('1111:2222:3333:4444::5555:'))
  t.false(ip('2001:db8:85a3::8a2e:37023:7334'))
  t.false(ip('::ffff:257.1.2.3'))
  t.false(ip('1.2.3.4::'))
  t.false(ip('2001:db8:85a3::8a2e:370k:7334'))
})

test('string.base64', (t) => {
  t.plan(6)
  t.is(typeof tyval.string.base64, 'function')
  let b64 = tyval.string().base64().toFunction()
  t.is(typeof b64, 'function')
  t.true(b64('SSdtIGEgYmFzZTY0IHN0cmluZw=='))
  t.true(b64('MSsxPTU1'))
  t.false(b64('I\'m not a base64 string'))
  t.false(b64('Hello1World=='))
})

test('string.JSON', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.JSON, 'function')
  let isJSON = tyval.string().JSON().toFunction()
  t.is(typeof isJSON, 'function')
  t.true(isJSON('{"valid":true}'))
  t.false(isJSON('{"valid:false}'))
})

test('string.uuid', (t) => {
  t.plan(6)
  t.is(typeof tyval.string.uuid, 'function')
  let uuid = tyval.string().uuid().toFunction()
  t.is(typeof uuid, 'function')
  t.true(uuid('6fa459ea-ee8a-3ca4-894e-db77e160355e'))
  t.true(uuid('16fd2706-8baf-433b-82eb-8c7fada847da'))
  t.true(uuid('886313e1-3b8a-5372-9b90-0c9aee199e5d'))
  t.false(uuid('what?'))
})

test('string.MAC', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.MAC, 'function')
  let isMac = tyval.string().MAC().toFunction()
  t.is(typeof isMac, 'function')
  t.true(isMac('48-2C-6A-1E-59-3D'))
  t.false(isMac('nope!'))
})

test('string.md5', (t) => {
  t.plan(4)
  t.is(typeof tyval.string.md5, 'function')
  let isMd5 = tyval.string().md5().toFunction()
  t.is(typeof isMd5, 'function')
  t.true(isMd5('b4dd7f0b0ca6c25dd46cc096e45158eb'))
  t.false(isMd5('maybe but not'))
})

/* eslint-disable no-undef */
test('string.extend', (t) => {
  t.plan(4)
  tyval.string.extend(function empty () {
    if (value.length > 0) {
      errors++
    }
  })
  t.is(typeof tyval.string.empty, 'function')
  let empty = tyval.string().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty(''))
  t.false(empty('.'))
})
/* eslint-disable no-undef */

test('string.card', (t) => {
  t.plan(15)
  t.is(typeof tyval.string.card, 'function')
  let card = tyval.string().card('jcb').toFunction()
  t.true(card('3530111333300000'))
  t.false(card('378282246310005'))

  card = tyval.string().card('visa').toFunction()
  t.true(card('4012888888881881'))
  t.false(card('3566002020360505'))

  card = tyval.string().card('discover').toFunction()
  t.true(card('6011000990139424'))
  t.false(card('4111111111111111'))

  card = tyval.string().card('dinersclub').toFunction()
  t.true(card('38520000023237'))
  t.false(card('6011111111111117'))

  card = tyval.string().card('mastercard').toFunction()
  t.true(card('5105105105105100'))
  t.false(card('38520000023237'))

  card = tyval.string().card('americanexpress').toFunction()
  t.true(card('371449635398431'))
  t.false(card('5555555555554444'))

  try {
    card = tyval.string().card('lannister').toFunction()
    t.fail()
  } catch (e) {
    t.is(e.message, 'lannister card is not supported')
    t.pass()
  }
})
