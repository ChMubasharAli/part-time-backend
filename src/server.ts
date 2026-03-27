import fastify from "fastify";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./common/middleware/errorHandler";

dotenv.config();

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

const port = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server is running at http://localhost:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
