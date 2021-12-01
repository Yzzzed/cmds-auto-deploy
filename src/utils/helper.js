const chalk = require('chalk')
const inquirer = require('inquirer')

async function helper(config) {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: '选择部署的项目: ',
      choices: config.map(i => ({key: i.name, name: i.name, value: i.name }))
    },
    {
      type: 'input',
      name: 'host',
      message: '输入部署的服务器: ',
      default: config.length > 0 ? config[0].ssh.host : 'localhost',
      when: answer => answer.project,
      validate: value => {
        const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
        if(reg.test(value)) {
          return true
        }
        return '请输入正确的服务器ip'
      }
    },
    {
      type: 'input',
      name: 'port',
      message: '请输入主机端口: ',
      default: config.length > 0 ? config[0].ssh.port > 0 ? config[0].ssh.port: 22 : 22,
      when: answer => answer.host,
      validate: value => {
        if(value > 0 && value <= 65535) {
          return true
        }
        return '请输入正确的端口号'
      }
    },
    {
      type: 'input',
      name: 'username',
      message: '输入主机用户名: ',
      default: config.length && config[0].ssh.username ||'root',
      when: answer => answer.host
    },
    {
      type: 'password',
      name: 'password',
      message: '输入主机密码: ',
      when: answer => answer.username
    },
    {
      type: 'confirm',
      name: 'backup',
      message: '是否开启远程备份? ',
      default: true,
      when: answer => answer.project
    }
  ]).catch(err => {
    if(err.isTtyError) {
      console.log(chalk.red('inquirer不能在此环境中使用'))
    } else {
      console.log(chalk.red(err))
    }
  })
  const RESULT_CONFIG = {
    name: answer.project,
    ssh: {
      host: answer.host,
      port: answer.port,
      username: answer.username,
      password: answer.password
    },
    openBackup: answer.backup
  }
  const SELECTED_CONFIG = config.find(i => i.name === RESULT_CONFIG.name)
  return Object.assign({}, SELECTED_CONFIG, RESULT_CONFIG)
}

module.exports = helper