import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove headers that could identify AI or editor tooling
  ["made-with", "x-made-with"].forEach((name) => {
    response.headers.delete(name);
  });

  return response;
}
