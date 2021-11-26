const chalk = require('chalk')
const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()

function connect(sshInfo) {
  return new Promise((resolve, reject) => {
    ssh.connect({ ...sshInfo }).then(() => {
      resolve(console.log('------- ' + sshInfo.host + '连接成功 -------'))
    }).catch(err => {
      reject(console.log(chalk.green(sshInfo.host), chalk.red('连接失败: ' + err)))
    })
  })
}

module.exports = {ssh, connect}