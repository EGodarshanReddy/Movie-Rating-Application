import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  genre: z.string().min(1, "Genre is required"),
  releaseYear: z.number().int().min(1888, "Enter a valid year"),
  posterURL: z.string().url("Invalid poster URL")
});


export const reviewSchema = z.object({
    userId: z.string().uuid({ message: "Invalid userId format" }),
    movieId: z.string().uuid({ message: "Invalid movieId format" }),
    rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating cannot be more than 5" }),
    comment: z.string().optional(),
    createdAt: z.date().optional(), // optional because Prisma will default it to now()
  });