'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

// Libraries
const tyval = require('../tyval')
const Joi = require('joi')
const validatejs = require('validate.js')
const jsonValid = require('is-my-json-valid')

// Number validations
const tyvalNum = tyval.number().min(-5).max(10).integer()
const joiNum = Joi.number().min(-5).max(10).integer()
const validatejsNum = { numericality: { greaterThanOrEqualTo: -5, lessThanOrEqualTo: 10, onlyInteger: true } }
const jsonValidNum = jsonValid({
  type: 'integer',
  minimum: -5,
  maximum: 10
})
let num = Math.floor(Math.random() * 15) - 5

// String validations
const tyvalStr = tyval.string().min(1).max(20)
const joiStr = Joi.string().min(1).max(20)
const validatejsStr = { length: { minimum: 1, maximum: 20 } }
const jsonValidStr = jsonValid({
  type: 'string',
  minimum: 1,
  maximum: 20
})
let str = 'Benchmarks!'

const tyvalItems = tyval.array().items(tyvalStr)
const joiItems = Joi.array().items(joiStr)
let arr = ['a', 'bb', 'ccc', 'dddd', 'eeeee', 'ffffff', 'ggggggg', 'hhhhhhhh', 'iiiiiiiii', 'llllllllll']

suite
  .add('tyval (num)', function () {
    tyvalNum(num)
  })
  .add('joi (num)', function () {
    Joi.validate(num, joiNum)
  })
  .add('validate.js (num)', function () {
    validatejs.single(num, validatejsNum)
  })
  .add('is-my-json-valid (num)', function () {
    jsonValidNum(num)
  })
  .add('tyval (str)', function () {
    tyvalStr(str)
  })
  .add('joi (str)', function () {
    Joi.validate(str, joiStr)
  })
  .add('validate.js (str)', function () {
    validatejs.single(str, validatejsStr)
  })
  .add('is-my-json-valid (str)', function () {
    jsonValidStr(str)
  })
  .add('tyval (array)', function () {
    tyvalItems(arr)
  })
  .add('joi (array)', function () {
    Joi.validate(arr, joiItems)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()
