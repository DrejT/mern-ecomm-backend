require("dotenv").config();
const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_URL, {
  reconnectOnError(err) {
    // const targetError = "READONLY";
    if (err.message) {
      // Only reconnect when the error contains "READONLY"
      return true; // or `return 1;`
    }
  },
});

client
  .on("connect", () => console.log("redis connected"))
  .on("ready", () => console.log("redis is now ready"))
  .on("reconnecting", () => console.log("reconnecting redis"))
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("end", () => console.log("redis has stopped"));

module.exports = client;
