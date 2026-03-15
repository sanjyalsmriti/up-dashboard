import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

export type NewPostFormData = z.infer<typeof newPostSchema>;
