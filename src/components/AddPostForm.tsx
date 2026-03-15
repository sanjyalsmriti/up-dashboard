"use client";

import { useState } from "react";
import { newPostSchema, type NewPostFormData } from "@/lib/postSchema";
import { saveLocalPost } from "@/lib/localPosts";

type AddPostFormProps = {
  userId: number;
  onAdded: () => void;
};

export default function AddPostForm({ userId, onAdded }: AddPostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof NewPostFormData, string>>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = newPostSchema.safeParse({ title, body });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewPostFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof NewPostFormData;
        if (!fieldErrors[path]) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    saveLocalPost(userId, { title: result.data.title, body: result.data.body });
    setTitle("");
    setBody("");
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="border border-zinc-200 rounded-lg p-4 bg-white mb-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-3">Add New Post</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-2 border-black rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-zinc-700 mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full border-2 border-black rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        />
        {errors.body && <p className="text-red-600 text-sm mt-1">{errors.body}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700"
      >
        Submit
      </button>
    </form>
  );
}
