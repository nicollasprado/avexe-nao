import IAuthUser from "@/interfaces/IAuthUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const user: IAuthUser | null = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) {
    const res = NextResponse.json({ error: "User not found" }, { status: 404 });
    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1,
      sameSite: "lax",
      priority: "high",
      path: "/api/auth/refresh",
    });
    return res;
  }

  return NextResponse.json(user, { status: 200 });
}
