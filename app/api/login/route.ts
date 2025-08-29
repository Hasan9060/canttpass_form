import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const res = NextResponse.json({ success: true });
    // ✅ cookie set karna
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
