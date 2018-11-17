const sequelize = require('../utils/db');

const importModel = (moduleName) => { return sequelize.import(`${__dirname}/${moduleName}`);}

// 定义模型
const User = importModel("user");
const Log = importModel("log");

module.exports = {
  sequelize,
  User,
  Log
}

