"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUsers } from "@/store/usersSlice";
import type { User } from "@/types";

function UserCard({ user }: { user: User }) {
  return (
    <li className="border border-zinc-200 rounded-lg p-4 bg-white shadow-sm">
      <p className="font-medium text-zinc-900">{user.name}</p>
      <p className="text-sm text-zinc-600">{user.email}</p>
      <p className="text-sm text-zinc-500 mt-1">Company: {user.company.name}</p>
      <Link
        href={`/users/${user.id}`}
        className="inline-block mt-3 px-4 py-2 bg-zinc-900 text-white text-sm rounded hover:bg-zinc-700"
      >
        View Posts
      </Link>
    </li>
  );
}

function filterUsers(users: User[], searchQuery: string): User[] {
  if (!searchQuery.trim()) return users;
  const q = searchQuery.trim().toLowerCase();
  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
}

export default function UserList({ searchQuery }: { searchQuery: string }) {
  const dispatch = useAppDispatch();
  const { users, apiIsLoading, apiError } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery),
    [users, searchQuery]
  );

  if (apiIsLoading) return <p className="text-zinc-600">Loading users...</p>;
  if (apiError) return <p className="text-red-600">{apiError}</p>;
  if (filteredUsers.length === 0)
    return <p className="text-zinc-600">No users found.</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
