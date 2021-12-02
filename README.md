# cmds-auto-deploy
An auto deploy cli created by nodejs.
# Usage
* Run command.
  ```shell
  $ npm i cmds-auto-deploy --save-dev
  ```
* Create a js file `deploy.config.js` on your project root directory.
* Edit `deploy.config.js` like this.
  
  ```js
  const config = [
    {
      name: 'project-dev', // project name
      ssh: {
        host: 'localhost', // server ip
        port: 22,
        username: 'root', // username
        password: '', // password
        privateKey: '', // privateKey for login & set '' if not used
        passphrase: '' // passphrase for login & set '' if not used
      },
      targetDir: 'D:/mycode/myproject/dist', // [absolute path] & file that need to be compressed
      targetName: 'dist', // archive target name which will generate a archive file like dist.tar or dist.zip.  *bugs existed & dont change it*
      archiveFormat: 'tar', // [tar || zip] archive format
      openBackup: true, // if open backup on remote
      openGzip: true, // if open gzip while [archiveFormat] is tar
      backupPath: '/root/backupTest', // backup path on remote server
      deployDir: '/root/uploadTest', //  deploy path on remote server
      releaseDir: 'dist' // release directory name on remote server
    },
    ...
  ]
  ```
* Add script on your package.json.
  ```json
  {
    ...
    "scripts": {
      "deploy": "cmds-deploy"
    }
  }
  ```
* Build your project and run command.
  ```shell
  npm run deploy
  ```