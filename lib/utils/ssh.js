var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const chalk = require('chalk');
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

function connect(sshInfo) {
  return new Promise((resolve, reject) => {
    ssh.connect(_extends({}, sshInfo)).then(() => {
      resolve(console.log('------- ' + sshInfo.host + '连接成功 -------'));
    }).catch(err => {
      reject(console.log(chalk.green(sshInfo.host), chalk.red('连接失败: ' + err)));
    });
  });
}

module.exports = { ssh, connect };