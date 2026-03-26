import bcrypt from "bcrypt";
import * as repo from "../user.repository";
import type { CreateUserInput, UpdateUserInput } from "../dto/user.dto.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { skip } from "node:test";

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
export const getUsersService = async () => {
  return repo.getUsers();
};

// GET BY ID
export const getUserByIdService = async (id: string) => {
  const user = await repo.getUserById(id);
  if (!user) throw new Error("User not found");
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

  return repo.updateUser(id, updateData);
};

// FULL UPDATE (PUT)

export const replaceUserService = async (id: string, data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return repo.updateUser(id, {
    passportNumber: data.passportNumber ?? null,
    phone: data.phone ?? null,
    passwordHash: hashedPassword,
    name: data.name ?? null,
    nationality: data.nationality ?? null,
    gender: data.gender ?? null,
    dob: data.dob ? new Date(data.dob) : null,
  });
};

// Delete user service
export const deleteUserService = async (id: string) => {
  return repo.deleteUser(id);
};
