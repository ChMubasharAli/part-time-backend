import bcrypt from "bcrypt";
import * as repo from "../user.repository";
import type { CreateUserInput, UpdateUserInput } from "../dto/user.dto";
import type { Prisma } from "../../generated/prisma/client.js";
import { NotFoundError } from "../common/errors/notFoundError";
import { cacheService } from "../common/cache/cache.service.js";
import { CacheKeys } from "../common/cache/cache.keys.js";

// Create user service
export const createUserService = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await repo.createUser({
    phone: data.phone ?? null,
    password_hash: hashedPassword,
    name: data.name ?? null,
    nationality: data.nationality ?? null,
    gender: data.gender ?? null,
    dob: data.dob ?? new Date(data.dob),
  });

  // Invalidate all users list caches
  await cacheService.invalidate(CacheKeys.userListPattern());
  return user;
};

// get users service
export const getUsersService = async (page: number, limit: number) => {
  const cacheKey = CacheKeys.usersList(page, limit);

  // Try to get from cache
  const cached = await cacheService.get<{ data: any[]; meta: any }>(cacheKey);
  if (cached) {
    return cached;
  }

  // Not in cache, fetch from DB
  const skip = (page - 1) * limit;
  console.log("Hello i am here");

  const users = await repo.getUsers(skip, limit);
  const total = await repo.countUsers();
  console.log("Total users are ", total);

  const result = {
    data: users,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };

  // Store in cache with TTL (e.g., 60 seconds)
  await cacheService.set(cacheKey, result, 60);
  return result;
};

// GET BY ID
export const getUserByIdService = async (id: string) => {
  const cacheKey = CacheKeys.user(id);

  // Try cache
  const cached = await cacheService.get<any>(cacheKey);
  if (cached) {
    return cached;
  }

  // Not in cache, fetch from DB
  const user = await repo.getUserById(id);
  if (!user) throw new NotFoundError("User not found");

  // Store in cache with TTL
  await cacheService.set(cacheKey, user, 60);
  return user;
};

// Update User (PATCH style)
export const updateUserService = async (id: string, data: UpdateUserInput) => {
  const updateData: Prisma.usersUpdateInput = {};

  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.nationality !== undefined) updateData.nationality = data.nationality;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.dob !== undefined) updateData.dob = new Date(data.dob);
  if (data.password) {
    updateData.password_hash = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await repo.updateUser(id, updateData);
  if (!updatedUser) throw new NotFoundError("Failed to update user");

  // Invalidate specific user cache and all users list caches
  await cacheService.invalidate(CacheKeys.user(id));
  await cacheService.invalidate(CacheKeys.userListPattern());
  return updatedUser;
};

// FULL UPDATE (PUT)
export const replaceUserService = async (id: string, data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const updatedUser = await repo.updateUser(id, {
    phone: data.phone ?? null,
    password_hash: hashedPassword,
    name: data.name ?? null,
    nationality: data.nationality ?? null,
    gender: data.gender ?? null,
    dob: data.dob ?? new Date(data.dob),
  });
  if (!updatedUser) throw new NotFoundError("Failed to update user");

  // Invalidate specific user cache and all users list caches
  await cacheService.invalidate(CacheKeys.user(id));
  await cacheService.invalidate(CacheKeys.userListPattern());
  return updatedUser;
};

// Delete user service
export const deleteUserService = async (id: string) => {
  const deletedUser = await repo.deleteUser(id);
  if (!deletedUser) throw new NotFoundError("Failed to delete user");

  // Invalidate specific user cache and all users list caches
  await cacheService.invalidate(CacheKeys.user(id));
  await cacheService.invalidate(CacheKeys.userListPattern());
  return deletedUser;
};
