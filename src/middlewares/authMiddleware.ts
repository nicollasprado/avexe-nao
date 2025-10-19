import { apiService } from "@/services/ApiService";
import { jwtService } from "@/services/JwtService";
import { setRefreshTokenInCookies } from "@/utils/setRefreshTokenInCookies";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    // this isnt necessarily an error, just means user isnt logged in
    return NextResponse.json(null, { status: 203 });
  }

  let payload = await jwtService.verifyToken(token);

  if (!payload) {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(null, { status: 401 });
    }

    const newTokens = await jwtService.refreshToken(refreshToken);

    if (!newTokens) {
      const res = NextResponse.json(null, { status: 401 });
      setRefreshTokenInCookies(res, "", 0);
      return res;
    }

    apiService.setAccessToken(newTokens.accessToken);
    setRefreshTokenInCookies(NextResponse.next(), newTokens.refreshToken);

    payload = await jwtService.verifyToken(newTokens?.refreshToken);
  }

  if (!payload) {
    return NextResponse.json(null, { status: 401 });
  }

  const userId = payload.userId;

  if (!userId) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 401 }
    );
  }

  const headers = new Headers(req.headers);
  headers.set("X-User-Id", userId);

  return NextResponse.next({
    request: {
      headers,
    },
  });
};
