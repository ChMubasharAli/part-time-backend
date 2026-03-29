import type { Prisma } from "../generated/prisma/client.js";
import prisma from "./db/prisma.js";

// Create User
export const createUser = async (data: Prisma.usersCreateInput) => {
  return prisma.users.create({ data });
};

// Get Users
export const getUsers = async () => {
  return prisma.users.findMany();
};

// Count USER (get total how many users we have in database )
export const countUsers = () => {
  return prisma.users.count();
};

// Get User By Id
export const getUserById = (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};

// Update Users
export const updateUser = async (id: string, data: Prisma.usersUpdateInput) => {
  return prisma.users.update({ where: { id }, data });
};

// Delete User
export const deleteUser = async (id: string) => {
  return prisma.users.delete({
    where: { id },
  });
};
