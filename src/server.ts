import { env } from "./config/env"; //this will run validatiaon
import { connectRedis } from "./config/redis";
import redisClient from "./config/redis";

import fastify from "fastify";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./common/middleware/errorHandler";
import prisma from "./config/db";

const app = fastify();
app.register(userRoutes);

// Health check
app.get("/health", async (_, reply) => {
  return reply
    .status(200)
    .send({ success: true, message: "Hello I am working" });
});

// global erro handler
app.setErrorHandler(errorHandler);

const port = env.PORT;

const start = async () => {
  try {
    // connect to redis
    await connectRedis();

    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

// Gracefull shutdown Optional but recomended

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  await redisClient.quit();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
