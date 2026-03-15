"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPostsByUserId } from "@/store/postsSlice";
import { getLocalPosts } from "@/lib/localPosts";
import PostList from "@/components/PostList";
import type { Post } from "@/types";

export default function UserPostsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? parseInt(params.id, 10) : NaN;
  const userId = Number.isNaN(id) ? 0 : id;

  const dispatch = useAppDispatch();
  const { posts, postsLoading, postsError } = useAppSelector((state) => state.posts);

  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadLocalPosts = useCallback(() => {
    setLocalPosts(getLocalPosts(userId));
  }, [userId]);

  useEffect(() => {
    loadLocalPosts();
  }, [loadLocalPosts]);

  useEffect(() => {
    if (!userId) return;
    dispatch(loadPostsByUserId(userId));
  }, [userId, dispatch]);

  const apiPosts = userId ? posts[userId] ?? [] : [];
  const allPosts = [...localPosts, ...apiPosts];

  if (!userId) {
    return (
      <div className="min-h-screen bg-zinc-100 p-6">
        <p className="text-red-600">Invalid user id.</p>
        <Link href="/" className="text-zinc-600 hover:underline mt-2 inline-block">
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-zinc-600 hover:text-zinc-900 mb-4 inline-block"
        >
          ← Back to users
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">
          Posts for User #{userId}
        </h1>

        {postsLoading && (
          <p className="text-zinc-600 mb-4">Loading posts...</p>
        )}
        {postsError && (
          <p className="text-red-600 mb-4">{postsError}</p>
        )}
        {!postsLoading && !postsError && allPosts.length === 0 && (
          <p className="text-zinc-600">No posts yet.</p>
        )}
        {!postsLoading && !postsError && allPosts.length > 0 && (
          <PostList
            posts={allPosts}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
