import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/appError";
import z, { ZodError } from "zod";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(error);

  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send({ success: false, message: error.message });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      message: "Validation failed",
      details: z.treeifyError(error), // Zod error details
    });
  }

  return reply
    .status(500)
    .send({ success: false, message: "Internal server error" });
}
