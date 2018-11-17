const Redis = require('ioredis');
const redisCfg = require('../config/redis');
const redis = new Redis(redisCfg);

redis.on('error', err => {
  console.log(`[redis] ${err}`);
})

module.exports = redis;