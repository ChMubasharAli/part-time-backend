import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

//jwt payload
type jwtPlayload = {
  id: string;
  name: string;
};

// Extent fasitfy Request (type-safe)
declare module "fastify" {
  interface FastifyRequest {
    user: jwtPlayload;
  }
}

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1] || "";
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwtPlayload;

    // Attach user info to request
    (req as any).user = decoded;
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};
