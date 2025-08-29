import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-auth")?.value;

  // agar cookie set nahi hai to login page pe redirect karo
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // ✅ sirf /admin ko protect karega
};
