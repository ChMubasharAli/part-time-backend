import type { Prisma } from "../generated/prisma/client";
import prisma from "./db/prisma.js";

// Create users
export const createUser = async (data: Prisma.usersCreateInput) => {
  return prisma.users.create({ data });
};

// Get userss
export const getUsers = async (skip: number, limit: number) => {
  return prisma.users.findMany({ skip, take: limit, orderBy: { id: "asc" } });
};

// Count users (get total how many userss we have in database )
export const countUsers = () => {
  return prisma.users.count();
};

// Get users By Id
export const getUsersById = (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};

// Update userss
export const updateUser = async (id: string, data: Prisma.usersUpdateInput) => {
  return prisma.users.update({ where: { id }, data });
};

// Delete users
export const deleteUser = async (id: string) => {
  return prisma.users.delete({
    where: { id },
  });
};
