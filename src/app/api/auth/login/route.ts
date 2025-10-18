import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { jwtService } from "@/services/JwtService";
import { apiService } from "@/services/ApiService";

interface ILoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as ILoginBody;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const foundUser = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!foundUser) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, foundUser.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { accessToken, refreshToken } = await jwtService.generateTokens(
    foundUser.id
  );

  const res = NextResponse.json(
    {
      user: {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      },
      token: accessToken,
    },
    { status: 200 }
  );

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    sameSite: "lax",
    priority: "high",
    path: "/api/auth/refresh",
  });

  apiService.setAccessToken(accessToken);

  return res;
}
