#!/usr/bin/env node
const { program } = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .description('An auto deploy cli created by node.js.')

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
