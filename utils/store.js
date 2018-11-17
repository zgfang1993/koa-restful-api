const { STORE_TYPE } = require('../config/app');
const redis = require('./redis');
/*
 * {u_id: key}
 * {key: session}
 */
class Store {
  async get (key, maxAge) {
    const session = await redis.get(key); // key 1536917996808-UCIWJQxK-SxYg7oHRylwD4FjUb_Mwsyb
    return JSON.parse(session);
  }
  async set (key, sess, maxAge) {
    if(sess.userId){
      await redis.set(`u_${sess.userId}`, key); // sess-> session对象
      delete sess.userId;
    }
    maxAge =  typeof maxAge == 'number' ? maxAge : 3*36e5;
		await redis.set(key, JSON.stringify(sess),'PX',maxAge);
  }
  async destroy (key) {
    await redis.del(key);
  }
}
let store = {
  storage: {},
  get (key, maxAge) {
    return this.storage[key]
  },
  set (key, sess, maxAge) {
    this.storage[key] = sess
  },
  destroy (key) {
    delete this.storage[key];
  }
}
module.exports = STORE_TYPE === 2 ? store : new Store();