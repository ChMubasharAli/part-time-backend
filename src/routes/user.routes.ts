import type { FastifyInstance } from "fastify";
import { createUserSchema, updateUserSchema } from "../dto/user.dto";
import * as service from "../services/user.services";

export default async function userRoutes(app: FastifyInstance) {
  // CREATE
  app.post("/users", async (req, reply) => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) return reply.status(400).send(parsed.error.message);

    return service.createUserService(parsed.data);
  });

  //   GET
  app.get("/users", async (_, reply) => {
    return service.getAllUsersService();
  });

  //   UPDATE
  app.patch("/users/:id", async (req, reply) => {
    const id = (req.params as any).id;
    const parsed = updateUserSchema.safeParse(req.body);

    if (!parsed.success) return reply.status(400).send(parsed.error.message);
    return service.updateUserService(id, parsed.data);
  });

  //   DELETE
  app.delete("/users/:id", async (req, reply) => {
    const id = (req.params as any).id;

    return service.deleteUserService(id);
  });
}
