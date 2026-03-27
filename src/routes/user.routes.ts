import type { FastifyInstance } from "fastify";
import { createUserSchema, updateUserSchema } from "../dto/user.dto.js";
import * as service from "../services/user.services.js";
import { asyncHandler } from "../common/middleware/asyncHandler.js";

export default async function userRoutes(app: FastifyInstance) {
  // CREATE
  app.post(
    "/users",
    asyncHandler(async (req, reply) => {
      const parsed = createUserSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;
      const result = await service.createUserService(parsed.data);

      return reply.status(201).send(result);
    }),
  );

  // GET ALL
  app.get(
    "/users",
    asyncHandler(async (req) => {
      const { page = "1", limit = "10" } = req.query as any;

      return await service.getUsersService(Number(page), Number(limit));
    }),
  );

  // GET BY ID
  app.get(
    "/users/:id",
    asyncHandler(async (req, reply) => {
      const id = (req.params as any).id;
      return await service.getUserByIdService(id);
    }),
  );

  // PATCH (Partial Update)
  app.patch(
    "/users/:id",
    asyncHandler(async (req, reply) => {
      const id = (req.params as any).id;
      const parsed = updateUserSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;
      return await service.updateUserService(id, parsed.data);
    }),
  );

  // PUT (Full Update)
  app.put(
    "/users/:id",
    asyncHandler(async (req, reply) => {
      const id = (req.params as any).id;
      const parsed = createUserSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;
      return await service.replaceUserService(id, parsed.data);
    }),
  );
  // DELETE
  app.delete(
    "/users/:id",
    asyncHandler(async (req) => {
      const id = (req.params as any).id;
      return await service.deleteUserService(id);
    }),
  );
}
