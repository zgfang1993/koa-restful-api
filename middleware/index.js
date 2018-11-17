const _ = require('lodash');
const Joi = require('joi');

// 校验参数
let validate = (schema = {}) => {
  const { opt = {} } = schema;

  const options = _.defaultsDeep(opt, {
      allowUnknown: true,
  });
  return async(ctx, next) => {
      const defaultValidateKeys = ['body', 'query', 'params'];
      const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schema));
      const errors = [];

      needValidateKeys.find((item) => {
          const toValidateObj = item === 'body' ? ctx.request.body : ctx[item];

          const result = Joi.validate(toValidateObj, schema[item], options);

          if (result.error) {
              let err = result.error;

              if (err && err.message) {
                  errors.push({ message: err.message });
              } else if (err.details && err.details[0]) {
                  errors.push(err.details[0]);
              }
              return true;
          }


          _.assignIn(toValidateObj, result.value);
          return false;
      });

      if (errors.length !== 0) {
          const msg = errors[0].message.replace(/"/g, '');
          const error = new Error(msg);
          error.status = 400;
          throw error;
      }
      await next();
  };
}

// 校验权限
let auth = (authority)=>{
  return async(ctx, next) => {
    if(!ctx.session || (ctx.session && !ctx.session.isLogin)){
      const error = new Error('请先登录');
      error.status = 401;
      throw error;     
    }

    if(authority == 'admin' && !ctx.session.isAdmin){
      const error = new Error('权限不足');
      error.status = 403;
      throw error; 
    }
    
    await next();
  };
}

module.exports = {
  validate,
  auth,
};