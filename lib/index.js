let deploy = (() => {
  var _ref = _asyncToGenerator(function* () {
    const { ssh, connect } = sshServer;
    try {
      const SELECTED_CONFIG = yield helper(config);
      console.log(chalk.green('部署项目: ', SELECTED_CONFIG.name));
      const targetFile = filename(SELECTED_CONFIG);
      const localFile = path.join(__dirname, targetFile);
      yield compress(SELECTED_CONFIG, localFile);
      yield connect(SELECTED_CONFIG.ssh);
      yield upload(ssh, SELECTED_CONFIG, localFile, targetFile);
      yield unzip(ssh, SELECTED_CONFIG, targetFile);
      yield run(ssh, 'mv ' + SELECTED_CONFIG.targetName + ' ' + SELECTED_CONFIG.releaseDir, SELECTED_CONFIG.deployDir);
      yield run(ssh, 'rm -f ' + targetFile, SELECTED_CONFIG.deployDir);
      yield unlink(localFile, function (err) {
        if (err) throw err;
      });
      console.log(chalk.green('------- 部署成功 -------'));
    } catch (e) {
      console.log(chalk.red('部署出现错误: ', e));
    } finally {
      process.exit();
    }
  });

  return function deploy() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const path = require('path');
const { unlink } = require('fs');
const chalk = require('chalk');
const config = require(path.join(process.cwd(), 'deploy.config'));
const filename = require('./utils/filename');
const helper = require('./utils/helper');
const compress = require('./utils/compress');
const sshServer = require('./utils/ssh');
const upload = require('./utils/upload');
const run = require('./utils/command');
const unzip = require('./utils/unzip');

module.exports = deploy;