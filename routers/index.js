const Router = require('koa-router');

let router = new Router({
	prefix: '/gulu/api'
});
const user = require('./user.js');

router
  .use('/user', user.routes(), user.allowedMethods());

module.exports = router