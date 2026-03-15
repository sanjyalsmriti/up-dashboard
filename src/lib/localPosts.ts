import type { Post } from "@/types";

const KEY_PREFIX = "user_posts_";

export function getLocalPosts(userId: number): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_PREFIX + userId);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalPost(userId: number, post: Omit<Post, "id" | "userId">): void {
  const existing = getLocalPosts(userId);
  const newPost: Post = {
    ...post,
    userId,
    id: existing.length > 0 ? Math.max(...existing.map((p) => p.id)) + 1 : 1000 + userId,
  };
  existing.unshift(newPost);
  localStorage.setItem(KEY_PREFIX + userId, JSON.stringify(existing));
}
