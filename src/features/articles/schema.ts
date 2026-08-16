import { z } from "zod";

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters long")
    .max(120, "Title must be at most 120 characters long"),
  subtitle: z
    .string()
    .trim()
    .min(2, "Subtitle must be at least 2 characters long")
    .max(180, "Subtitle must be at most 180 characters long"),
  desc: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  votes: z.preprocess((value) => {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }

    return typeof value === "string" ? Number(value) : value;
  }, z.number().int("Votes must be a whole number").nonnegative("Votes must be >= 0")),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

export const articleServerSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  title: z.string(),
  subtitle: z.string(),
  desc: z.string(),
  votes: z.number().int().nonnegative(),
});

export type ArticleServer = z.infer<typeof articleServerSchema>;
