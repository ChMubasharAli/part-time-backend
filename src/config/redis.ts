import { createClient } from "redis";
import { env } from "./env";

// crete redis client
const redisClient = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
});

redisClient.on("error", (error) => {
  console.error("❌ Redis Error:", error);
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connected");
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
