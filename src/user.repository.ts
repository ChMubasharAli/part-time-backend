import type { Prisma } from "../generated/prisma/client";
import type { UpdateUserInput } from "./dto/user.dto";
import prisma from "./prisma";

// Create User
export const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

// Get All Users
export const getAllUsers = async () => {
  return prisma.user.findMany();
};

// Update user
export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({ where: { id }, data });
};

// Delete User
export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};
