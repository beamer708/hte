import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  // Sign out of NextAuth session and clear the beta cookie
  const session = await getServerSession(authOptions);
  void session; // session used for context only; NextAuth handles sign-out via its own route

  const response = NextResponse.redirect(
    new URL("/shutdown", process.env.NEXTAUTH_URL ?? "http://localhost:3000")
  );

  // Clear the beta access cookie
  response.cookies.set("beta_access", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
