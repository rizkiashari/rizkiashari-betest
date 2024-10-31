const redis = require("redis");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

class Cache {
  constructor() {
    this.client = redis.createClient({ url: env.REDIS_URL });
    this.client.connect().catch(console.error);
  }

  async set(key, value, ttl = 3600) {
    await this.client.setEx(key, ttl, JSON.stringify(value));
  }

  async get(key) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }
}

module.exports = new Cache();
