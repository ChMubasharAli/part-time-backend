import z from "zod";

export const createUserSchema = z.object({
  passportNumber: z.string().optional(),
  phone: z.string().max(20).optional(),
  password: z.string().min(6),
  name: z.string().optional(),
  nationality: z.enum(["PAKISTANI", "INDIAN", "AMERICAN", "OTHER"]).optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
});

export const updateUserSchema = z.object({
  passportNumber: z.string().optional(),
  phone: z.string().max(20).optional(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
  nationality: z.enum(["PAKISTANI", "INDIAN", "AMERICAN", "OTHER"]).optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
