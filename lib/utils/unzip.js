let unzip = (() => {
  var _ref = _asyncToGenerator(function* (ssh, config, targetFile) {
    let command = '';
    if (config.archiveFormat === 'tar') {
      command += 'tar ';
      if (config.openGzip) {
        command += '-xzf ';
      } else {
        command += '-xvf ';
      }
    }
    if (config.archiveFormat === 'zip') {
      command += 'unzip ';
    }
    command += targetFile;
    console.log(chalk.green('------- 开始解压 -------'));
    try {
      yield run(ssh, command, config.deployDir);
      console.log(chalk.green('------- 解压成功 -------'));
    } catch (err) {
      console.log(chalk.red(err));
    }
  });

  return function unzip(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chalk = require('chalk');
const run = require('./command');

module.exports = unzip;