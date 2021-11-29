function run(ssh, command, path) {
  // 检测执行rm -rf xxx 防止rm -rf *等
  const rmGroup = ['/', '*', '/*', '.', '']
  if(command.indexOf('rm -rf') > 0 && rmGroup.includes(command.split('rm -rf')[1].trim())) {
    throw Error(`禁止使用命令: '${command}'`)
  }
  return new Promise((resolve, reject) => {
    ssh.execCommand(command, {
      cwd: path
    }).then(res => {
      if(res.stderr) {
        reject(console.error('命令执行发生错误: ' + res.stderr))
        process.exit()
      } else {
        resolve(console.log(command + '\n ------- ' + '执行完成 -------'))
      }
    })
  })
}

module.exports = run