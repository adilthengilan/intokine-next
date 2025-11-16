import { NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "123456";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ message: "Logged in" });
    // Set cookie manually
    res.headers.set(
      "Set-Cookie",
      `admin_session=true; Path=/; HttpOnly; Max-Age=${60 * 60}` // 1 hour
    );
    return res;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
