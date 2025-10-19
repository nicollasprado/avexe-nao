import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { jwtService } from "@/services/JwtService";
import { apiService } from "@/services/ApiService";
import { setRefreshTokenInCookies } from "@/utils/setRefreshTokenInCookies";

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

  setRefreshTokenInCookies(res, refreshToken);
  apiService.setAccessToken(accessToken);

  return res;
}
