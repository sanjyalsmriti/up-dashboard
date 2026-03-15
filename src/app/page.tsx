"use client";

import { useState } from "react";
import Link from "next/link";
import UserList from "@/components/UserList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">
          User & Posts Dashboard
        </h1>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or email..."
          />
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-900 text-sm"
          >
            Home
          </Link>
        </div>
        <UserList searchQuery={searchQuery} />
      </div>
    </div>
  );
}
