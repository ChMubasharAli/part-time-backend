import type { Prisma } from "../generated/prisma/client";
import prisma from "./db/prisma";

// Create User
export const createUser = async (data: Prisma.usersCreateInput) => {
  return prisma.users.create({ data });
};

// Get All Users
export const getAllUsers = async () => {
  return prisma.users.findMany();
};

// Update user
export const updateUser = async (id: string, data: Prisma.usersUpdateInput) => {
  return prisma.users.update({ where: { id }, data });
};

// Delete User
export const deleteUser = async (id: string) => {
  return prisma.users.delete({ where: { id } });
};
