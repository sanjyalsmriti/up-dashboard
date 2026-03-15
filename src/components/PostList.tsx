"use client";

import type { Post } from "@/types";

const POSTS_PER_PAGE = 10;

type PostListProps = {
  posts: Post[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function PostList({
  posts,
  currentPage,
  onPageChange,
}: PostListProps) {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div>
      <ul className="space-y-4">
        {pagePosts.map((post) => (
          <li
            key={post.id}
            className="border border-zinc-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-zinc-900">{post.title}</h3>
            <p className="text-sm text-zinc-600 mt-1">{post.body}</p>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 border-2 border-black rounded bg-white text-black disabled:opacity-50 hover:bg-black hover:text-white"
          >
            Previous
          </button>
          <span className="text-sm text-black font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 border-2 border-black rounded bg-white text-black disabled:opacity-50 hover:bg-black hover:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
