# cmds-auto-deploy
<img src="https://img.shields.io/npm/l/cmds-auto-deploy" alt="license"> <img src="https://img.shields.io/github/package-json/v/Yzzzed/cmds-auto-deploy" alt="version"> <img src="https://img.shields.io/github/last-commit/Yzzzed/cmds-auto-deploy" alt="last-commit"> <img src="https://img.shields.io/npm/dt/cmds-auto-deploy" alt="downloads">

使用nodejs实现的一个自动部署工具。

查看英文文档：[_English_](../README.md)
# 使用方法
* 执行命令。

  ```shell
  $ npm i cmds-auto-deploy --save-dev
  ```
* 在项目根目录创建一个js文件：deploy.config.js。
* 以下面的格式编辑deploy.config.js。

  ```js
  const config = [
    {
      name: 'project-dev', // 工程名称
      ssh: {
        host: 'localhost', // 服务器 ip
        port: 22, // 服务器端口
        username: 'root', // 用户名
        password: '', // 密码
        privateKey: '', // 使用私钥登录 不用为空就行
        passphrase: '' // 同上
      },
      targetDir: 'D:/mycode/myproject/dist', // [绝对路径] & 压缩目标路径
      targetName: 'dist', // 压缩文件名 会根据这个值生成相应的压缩文件 dist.zip dist.tar等 *有些许bug 建议保持dist*
      archiveFormat: 'tar', // [tar || zip] 压缩格式
      openBackup: true, // 开启远程备份
      openGzip: true, // 使用tar压缩时是否开启gzip
      backupPath: '/root/backupTest', // 远程备份目录
      deployDir: '/root/uploadTest', //  远程发布目录
      releaseDir: 'dist' // 远程发布文件夹名
    },
    ...
  ]

  module.exports = config
  ```
* 添加一条scripts命令到package.json。
  ```json
  {
    ...
    "scripts": {
      "deploy": "cmds-deploy"
    }
  }
  ```
* 项目build打包之后执行命令。
  ```shell
  npm run deploy
  ```