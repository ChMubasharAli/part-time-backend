import type { FastifyInstance } from "fastify";
import { createUserSchema, updateUserSchema } from "../dto/user.dto.js";
import * as service from "../services/user.services.js";

export default async function userRoutes(app: FastifyInstance) {
  // CREATE
  app.post("/users", async (req, reply) => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) return reply.status(400).send(parsed.error);

    return service.createUserService(parsed.data);
  });

  // GET ALL
  app.get("/users", async () => {
    return service.getUsersService();
  });

  // GET BY ID
  app.get("/users/:id", async (req, reply) => {
    const id = (req.params as any).id;

    return service.getUserByIdService(id);
  });

  // PATCH (Partial Update)
  app.patch("/users/:id", async (req, reply) => {
    const id = (req.params as any).id;

    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);
    return service.updateUserService(id, parsed.data);
  });

  // PUT (Full Update)
  app.put("/users/:id", async (req, reply) => {
    const id = (req.params as any).id;
    console.log("Hello i am here in the routes folder ", id);
    const parsed = createUserSchema.safeParse(req.body);
    console.log("Parced Data is ", parsed);
    if (!parsed.success) return reply.status(400).send(parsed.error);
    return service.replaceUserService(id, parsed.data);
  });
  // DELETE
  app.delete("/users/:id", async (req) => {
    const id = (req.params as any).id;
    return service.deleteUserService(id);
  });
}
