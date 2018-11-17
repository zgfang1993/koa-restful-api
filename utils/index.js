
const { Log } = require('../models');
const jResponse = (ret, msg='', data) => {
  return {
    ret,
    msg,
    data,
  }
}
const log = {
  _log(cate, msg, ctx) {
    if(ctx.session && ctx.session.user){
      // 记录log数据
      Log.create({ description: `${cate}${msg}`, uid: ctx.session.user.id });
    }
  },
  create(msg, ctx) {
    this._log('【新增】', msg, ctx);
  },
  update(msg, ctx){
    this._log('【更新】', msg, ctx);
  },
  delete(msg, ctx){
    this._log('【删除】', msg, ctx);
  },
  query(msg, ctx){
    this._log('【查询】', msg, ctx);
  },
  operate(msg, ctx){
    this._log('【操作】', msg, ctx);
  }
};

module.exports = {
  jResponse,
  log
}