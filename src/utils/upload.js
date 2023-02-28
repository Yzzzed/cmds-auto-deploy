const run = require('./command')
const getTime = require('./time')

async function upload(ssh, config, localFile, targetFile) {
  return new Promise((resolve, reject) => {
    console.log('------- 开始上传文件 -------')
    handleRemoteSourceFile(ssh, config)
    ssh.putFile(localFile, config.deployDir + '/' + targetFile).then(async () => {
      resolve(console.log('------- 上传完成 -------'))
    }, err => {
      reject(console.error('上传失败, ', err))
    })
  })
}

async function handleRemoteSourceFile(ssh, config) {
  if(config.openBackup) {
    console.log('------- 已开启远端备份 -------')
    await run(
      ssh,
      `
      if [ -d ${config.releaseDir} ];
      then mv ${config.releaseDir} ${config.backupPath}/${config.releaseDir}_${getTime()}
      fi
      `,
      config.deployDir
    )
  } else {
    console.log('------- 未开启远端备份 -------')
  }
}

module.exports = upload