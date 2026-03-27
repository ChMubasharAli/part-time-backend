import bcrypt from "bcrypt";
import * as repo from "../user.repository";
import type { CreateUserInput, UpdateUserInput } from "../dto/user.dto";
import type { Prisma } from "../../generated/prisma/client.js";
import { NotFoundError } from "../common/errors/notFoundError";

// Create user service
export const createUserService = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return repo.createUser({
    passportNumber: data.passportNumber ?? null,
    phone: data.phone ?? null,
    passwordHash: hashedPassword,
    name: data.name ?? null,
    nationality: data.nationality ?? null,
    gender: data.gender ?? null,
    dob: data.dob ? new Date(data.dob) : null,
  });
};

// get users service
export const getUsersService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  console.log("Hello i am here");

  const users = await repo.getUsers(skip, limit);
  // console.log("Hello user is ", users);
  const total = await repo.countUsers();
  console.log("Total users are ", total);

  return {
    data: users,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

// GET BY ID
export const getUserByIdService = async (id: string) => {
  const user = await repo.getUserById(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

// Update User (PATCH style)
export const updateUserService = async (id: string, data: UpdateUserInput) => {
  const updateData: Prisma.UserUpdateInput = {};

  if (data.passportNumber !== undefined)
    updateData.passportNumber = data.passportNumber;
  if (data.phone !== undefined) updateData.phone = data.phone;

  if (data.name !== undefined) updateData.name = data.name;

  if (data.nationality !== undefined) updateData.nationality = data.nationality;

  if (data.gender !== undefined) updateData.gender = data.gender;

  if (data.dob !== undefined) updateData.dob = new Date(data.dob);

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await repo.updateUser(id, updateData);
  if (!updatedUser) throw new NotFoundError("Failed to update user");
  return updatedUser;
};

// FULL UPDATE (PUT)

export const replaceUserService = async (id: string, data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const updatedUser = await repo.updateUser(id, {
    passportNumber: data.passportNumber ?? null,
    phone: data.phone ?? null,
    passwordHash: hashedPassword,
    name: data.name ?? null,
    nationality: data.nationality ?? null,
    gender: data.gender ?? null,
    dob: data.dob ? new Date(data.dob) : null,
  });
  if (!updatedUser) throw new NotFoundError("Failed to update user");
  return updatedUser;
};

// Delete user service
export const deleteUserService = async (id: string) => {
  const deletedUser = await repo.deleteUser(id);
  if (!deletedUser) throw new NotFoundError("Failed to delete user");
  return deletedUser;
};
