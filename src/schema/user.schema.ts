import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email(),
});

export const UpdateUserSchema = z
  .object({
    name: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.name || data.email, {
    message: "At least one field (name or email) must be provided",
  });
