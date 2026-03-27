import type { FastifyRequest, FastifyReply } from "fastify";

export const asyncHandler = (
  fn: (req: FastifyRequest, reply: FastifyReply) => Promise<any>,
) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      return await fn(req, reply);
    } catch (error) {
      throw error; // Fastify automatically sends it to global error handler
    }
  };
};
