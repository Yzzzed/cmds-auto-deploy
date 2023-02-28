let helper = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    try {
      const UNIQUE_CONFIG = [...new Set(config.map(function (c) {
        return c.name;
      }))];
      if (UNIQUE_CONFIG.length !== config.length) throw new Error('项目name不唯一');

      const answer = yield inquirer.prompt([{
        type: 'list',
        name: 'project',
        message: '选择部署的项目: ',
        choices: config.map(function (i) {
          return { key: i.name, name: i.name, value: i.name };
        })
      }, {
        type: 'input',
        name: 'host',
        message: '输入部署的服务器: ',
        default: config.length > 0 ? config[0].ssh.host : 'localhost',
        when: function (answer) {
          return answer.project;
        },
        validate: function (value) {
          const reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
          if (reg.test(value)) {
            return true;
          }
          return '请输入正确的服务器ip';
        }
      }, {
        type: 'input',
        name: 'port',
        message: '请输入主机端口: ',
        default: config.length > 0 ? config[0].ssh.port > 0 ? config[0].ssh.port : 22 : 22,
        when: function (answer) {
          return answer.host;
        },
        validate: function (value) {
          if (value > 0 && value <= 65535) {
            return true;
          }
          return '请输入正确的端口号';
        }
      }, {
        type: 'input',
        name: 'username',
        message: '输入主机用户名: ',
        default: config.length && config[0].ssh.username || 'root',
        when: function (answer) {
          return answer.host;
        }
      }, {
        type: 'password',
        name: 'password',
        message: '输入主机密码: ',
        when: function (answer) {
          return answer.username;
        }
      }, {
        type: 'confirm',
        name: 'backup',
        message: '是否开启远程备份? ',
        default: true,
        when: function (answer) {
          return answer.project;
        }
      }]).catch(function (err) {
        if (err.isTtyError) {
          console.log(chalk.red('inquirer不能在此环境中使用'));
        } else {
          console.log(chalk.red(err));
        }
      });
      const RESULT_CONFIG = {
        name: answer.project,
        ssh: {
          host: answer.host,
          port: answer.port,
          username: answer.username,
          password: answer.password
        },
        openBackup: answer.backup
      };
      const SELECTED_CONFIG = config.find(function (i) {
        return i.name === RESULT_CONFIG.name;
      });
      return Object.assign({}, SELECTED_CONFIG, RESULT_CONFIG);
    } catch (error) {
      console.log(chalk.red(error));
    }
  });

  return function helper(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = helper;