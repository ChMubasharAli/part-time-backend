import type { CreateUserInput, UpdateUserInput } from "../dto/user.dto";
import bcrypt from "bcrypt";
import * as repo from "../user.repository";
import type { Prisma } from "../../generated/prisma/client";

// Create User Service
export const createUserService = async (data: CreateUserInput) => {
  // STEP-1 Hash password
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

// Gett All Users service
export const getAllUsersService = async () => {
  return repo.getAllUsers();
};

// Update User Services
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

// Delete user service
export const deleteUserService = async (id: string) => {
  return repo.deleteUser(id);
};
