const fs = require('fs')
const archiver = require('archiver')

function compress(config, localFile) {
  return new Promise((resolve, reject) => {
    console.log('------- 正在压缩文件 -------')
    let output = fs.createWriteStream(localFile)
    const archive = archiver('tar', {
      gzip: config.openGzip,
      gzipOptions: {
        zlib: {
          level: 9
        }
      }
    })
    output
      .on('close', () => {
        resolve(console.log('------- 压缩完成。共计 ' + (archive.pointer() / 1024 / 1024).toFixed(3) + 'MB -------'))
      })
      .on('error', err => {
        reject(console.error('压缩失败 ', err))
      })
    archive.pipe(output)
    archive.directory(config.targetDir, config.targetName)
    archive.finalize()
  })
}

module.exports = compress