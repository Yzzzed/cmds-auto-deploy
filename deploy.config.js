const config = [
  {
    name: 'project-dev',
    ssh: {
      host: 'localhost', // ssh服务器地址
      port: 22,
      username: 'root', // ssh 用户名
      password: '', // ssh 密码
      privateKey: '', // ssh私钥(不使用此方法时请勿填写， 注释即可)
      passphrase: '' // ssh私钥对应解密密码(不存在设为''即可)
    },
    targetDir: 'D:/mycode/mydeploy/dist', // 目标压缩目录 npm run build打包生成的目录 (使用绝对路径) 相对路径需要优化
    targetName: 'dist', // 目标压缩文件 生成dist.tar或者dist.zip 与压缩文件里的文件夹同名
    archiveFormat: 'tar', // 压缩格式
    openBackup: true, // 是否开启远端备份
    openGzip: true, // 使用tar压缩时是否开启gzip
    backupPath: '/root/backupTest', // 远端备份目录
    deployDir: '/root/uploadTest', // 远端目录
    releaseDir: 'web' // 远程发布目录
  }
]

module.exports = config