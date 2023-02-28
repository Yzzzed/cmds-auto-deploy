let upload = (() => {
  var _ref = _asyncToGenerator(function* (ssh, config, localFile, targetFile) {
    return new Promise(function (resolve, reject) {
      console.log('------- 开始上传文件 -------');
      handleRemoteSourceFile(ssh, config);
      ssh.putFile(localFile, config.deployDir + '/' + targetFile).then(_asyncToGenerator(function* () {
        resolve(console.log('------- 上传完成 -------'));
      }), function (err) {
        reject(console.error('上传失败, ', err));
      });
    });
  });

  return function upload(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

let handleRemoteSourceFile = (() => {
  var _ref3 = _asyncToGenerator(function* (ssh, config) {
    if (config.openBackup) {
      console.log('------- 已开启远端备份 -------');
      yield run(ssh, `
      if [ -d ${config.releaseDir} ];
      then mv ${config.releaseDir} ${config.backupPath}/${config.releaseDir}_${getTime()}
      fi
      `, config.deployDir);
    } else {
      console.log('------- 未开启远端备份 -------');
    }
  });

  return function handleRemoteSourceFile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const run = require('./command');
const getTime = require('./time');

module.exports = upload;