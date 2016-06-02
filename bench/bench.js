'use strict'

const chalk = require('chalk')

console.log(chalk.yellow('Benchmarking nolib'))
require('./bench-nolib')

console.log(chalk.yellow('\nBenchmarking lib'))
require('./bench-lib')

console.log(chalk.yellow('\nDone!'))
