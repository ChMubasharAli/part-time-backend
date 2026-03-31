import type { FastifyRequest, FastifyReply } from "fastify";
import redisClient from "../../config/redis";
import { env } from "../../config/env";

export const rateLimitMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const ip = req.ip || req.socket.remoteAddress || "unkonwn";
  const key = `rate-limit:${ip}`;

  try {
    const current = await redisClient.incr(key);
    if (current === 1) {
      await redisClient.expire(key, Math.ceil(env.WINDOW_MS / 1000));
    }

    // check if limit is exceed
    if (current > env.RATE_LIMIT) {
      throw new Error("Too many requests, please try again later.");
    }
  } catch (error) {
    console.error("Rate limit error:", error);
  }
};
