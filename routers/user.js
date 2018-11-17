const router = require('koa-router')();
const user = require('../contrillers/user');
const { validate, auth } = require('../middleware');
const { validate: v } = user;

const routers = router
  .get('/list', auth(), user.getUsers)
  .post('/login', validate(v.login), user.login)
  .post('/logout', user.logout)

module.exports = routers