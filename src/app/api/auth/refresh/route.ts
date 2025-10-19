import { apiService } from "@/services/ApiService";
import { jwtService } from "@/services/JwtService";
import { setRefreshTokenInCookies } from "@/utils/setRefreshTokenInCookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const tokens = await jwtService.refreshToken(token);

  if (!tokens) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const res = NextResponse.json({ token: tokens.accessToken }, { status: 200 });

  apiService.setAccessToken(tokens.accessToken);
  setRefreshTokenInCookies(res, tokens.refreshToken);

  return res;
}
