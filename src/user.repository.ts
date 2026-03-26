import type { Prisma } from "../generated/prisma/client.js";
import prisma from "./prisma.js";

// Create User
export const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

// Get Users
export const getUsers = async () => {
  return prisma.user.findMany();
};

// Count USER (get total how many users we have in database )
export const countUsers = () => {
  return prisma.user.count();
};

// Get User By Id
export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

// Update Users
export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({ where: { id }, data });
};

// Delete User
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
