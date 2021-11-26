const path = require('path')
const { unlink } = require('fs')
const chalk = require('chalk')
const config = require(path.join(process.cwd(), 'deploy.config'))
const filename = require('./utils/filename')
const helper = require('./utils/helper')
const compress = require('./utils/compress')
const sshServer = require('./utils/ssh')
const upload = require('./utils/upload')
const run = require('./utils/command')

async function main() {
  try {
    const SELECTED_CONFIG = await helper(config)
    console.log(chalk.green('部署项目: ', SELECTED_CONFIG.name))
    const targetFile = filename(SELECTED_CONFIG)
    const localFile = path.join(__dirname, targetFile)
    await compress(SELECTED_CONFIG, localFile)
    await sshServer.connect(SELECTED_CONFIG.ssh)
    await upload(sshServer.ssh, SELECTED_CONFIG, localFile, targetFile)
    await run(sshServer.ssh, 'tar -xzf ' + targetFile, SELECTED_CONFIG.deployDir)
    await run(sshServer.ssh, 'mv ' + SELECTED_CONFIG.targetName + ' ' + SELECTED_CONFIG.releaseDir, SELECTED_CONFIG.deployDir)
    await run(sshServer.ssh, 'rm -f ' + targetFile, SELECTED_CONFIG.deployDir)
    await unlink(localFile, err => {
      if(err) throw err
    })
  } catch (e) {
    console.log(chalk.red('部署出现错误: ', e))
  } finally {
    process.exit()
  }
}

main()