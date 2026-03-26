import fastify from "fastify";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = fastify();
app.register(userRoutes);

const port = Number(process.env.PORT) || 3000;

app.get("/health", async (_, reply) => {
  return reply
    .status(200)
    .send({ success: true, message: "Hello I am working" });
});

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is runnign at http://localhost:${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
