const store = require('../utils/store');
const sessionCfg = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, // 这个是确定cookie的有效期，默认是一天
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, // 是否可以通过javascript来修改，设成true会更加安全
  signed: true,  // cookie的安全性 app.keys 必须设置
  rolling: false, // cookie有效期的更新策略
  renew: false, // cookie有效期的更新策略
  store, //传入一个用于session的外部存储
  autoCommit: true
};

module.exports = sessionCfg;