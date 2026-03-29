import z from "zod";

export const createUserSchema = z.object({
  phone: z.string().max(20),
  password: z.string().min(6),
  name: z.string().max(100),
  nationality: z.enum(["Pakistan", "Turkiye"]),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format (YYYY-MM-DD)",
  }),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
