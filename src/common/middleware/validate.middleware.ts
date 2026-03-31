import type { FastifyRequest, FastifyReply } from "fastify";
import { ZodObject, ZodError } from "zod";
import { asyncHandler } from "./asyncHandler";
asyncHandler;

export const validate = (schema: ZodObject) => {
  return asyncHandler(async (req: FastifyRequest, reply: FastifyReply) => {
    await schema.parseAsync({
      body: req.body,
      quer: req.query,
      params: req.params,
    });
  });
};
