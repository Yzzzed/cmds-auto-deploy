const chalk = require('chalk')
const run = require('./command')

async function unzip(ssh, config, targetFile) {
  let command = ''
  if(config.archiveFormat === 'tar') {
    command += 'tar '
    if(config.openGzip) {
      command += '-xzf '
    } else {
      command += '-xvf '
    }
  }
  if(config.archiveFormat === 'zip') {
    command += 'unzip '
  }
  command += targetFile
  console.log(chalk.green('------- 开始解压 -------'))
  try {
    await run(ssh, command, config.deployDir)
    console.log(chalk.green('------- 解压成功 -------'))
  } catch(err) {
    console.log(chalk.red(err))
  }
}

module.exports = unzip