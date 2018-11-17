
const { User, sequelize } = require('../models');
const CryptoJS = require("crypto-js"); 
const _ = require('lodash');
const { jResponse, log } = require('../utils/index');
const { Op } = require('sequelize');
const Joi = require('joi');
// post ctx.request.body
// get ctx.query
const uAttrs = ['id', 'username', 'phone', 'gender', 'status'];

let userController = {
  async login(ctx, next){
    const { username, password, remember } = ctx.request.body;
    const user = await User.findOne({
      raw:true,
      where: {
        username,
        password: CryptoJS.MD5(password)+'',
        status:{ // status > 0
          [Op.gt]: 0
        }
      }
    });
    if(user){
      if(user.status === 2){
        ctx.body = jResponse(0, '用户被禁止了');

        return;
      }
      // 保存用户信息到session
      ctx.session = {
        userId: user.id,
        user: _.assign(user, {_maxAge:remember ? 7 * 24 * 3600 * 1000 :'session'}),
        isLogin: true,
      };
      ctx.body = jResponse(0, 'success', {
        user: _.pick(user, uAttrs)
      });
      log.operate('用户登录成功', ctx);
    }else {
      ctx.body = jResponse(0, '登录失败，请检查用户名和密码');
    }
  },
  async logout(ctx, next) {
    if (ctx.session) {
        ctx.session = null;
        log.operate('用户登出', ctx);
    }
    ctx.body = jResponse(0, '登出成功');
  },
  async getUsers(ctx, next) {
    const count = await sequelize.query('select count(*) as count from users',{ type: sequelize.QueryTypes.SELECT });
    const res = await sequelize.query('select * from users',{ type: sequelize.QueryTypes.SELECT });
    // const res = await User.findAll({
    //   attributes: ['id','username']
    // });
    // console.log(res);
    if(count){
      ctx.body = jResponse(0, 'success', {
        count,
        list: res
      });
    }else {
      ctx.body = jResponse(-1, '无符合条件的数据', {
        count: 0,
        list: []
      });
    }

  },
  // 参数校验
  validate: {
    login: {
      body: {
        username: Joi.string().regex(/^[a-zA-Z0-9_]{2,30}$/).required().error(new Error('用户名为数字，字母，下划线组合(2~30)')),
        password: Joi.string().regex(/^[a-zA-Z0-9_]{2,30}$/).required().error(new Error('密码为数字，字母，下划线组合(2~30)'))
      }
    }
  },
};

module.exports = userController;