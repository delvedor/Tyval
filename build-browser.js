'use strict'

const fs = require('fs')
const pump = require('pump')
const browserify = require('browserify')
const { minify } = require('uglify-js')
const replaceStream = require('replacestream')
const selfStream = require('self-stream')

// Streams
const brBabel = browserify('./tyval.js').transform('babelify', { presets: ['es2015'] }).bundle()
const ws = fs.createWriteStream('./bundle.js')
const rs = replaceStream('[function(t,n,e){"use strict";n.exports=', '[function(t,n,e){"use strict";window.tyval=')

browserifyCode()

function browserifyCode () {
  console.log('> Start browserify')
  console.log('> Start babelify')
  pump(brBabel, ws, (err) => {
    if (err) return err
    console.log('< End babelify')
    console.log('< End browserify')
    uglifyCode()
  })
}

function uglifyCode () {
  console.log('> Start uglify')
  const { code } = minify('./bundle.js')
  fs.writeFile('./tyval.min.js', code, 'utf8', (err) => {
    if (err) return console.log(err)
    console.log('< End uglify')
    replaceExports()
  })
}

function replaceExports () {
  console.log('> Start replace')
  selfStream('./tyval.min.js', rs, (err) => {
    if (err) return console.log(err)
    console.log('> End replace')
    fs.unlink('./bundle.js', (err) => {
      if (err) return console.log(err)
      console.log('Done!')
    })
  })
}
