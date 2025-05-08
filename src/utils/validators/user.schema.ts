// src/utils/validators/user.schema.ts
import { z } from 'zod';

// export const SignupSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });



export const SignupSchema = z.object({

  name: z.string().nonempty("Name is required").min(3, "Name  length must be at least 3 characters"),
  email: z
    .string().nonempty("Email is required")
    .min(5, "Email must be at least 5 characters long")
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid format (e.g. user@example.com)"
    ),

  password: z
    .string().nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be no more than 64 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
});



export const LoginSchema = z.object({
  email: z
  .string().nonempty("Email is required")
  .min(5, "Email must be at least 5 characters long")
  .email("Invalid email address")
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid format (e.g. user@example.com)"
  ),

password: z
  .string().nonempty("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must be no more than 64 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  });