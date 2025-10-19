import { NextResponse } from "next/server";

export const setRefreshTokenInCookies = (
  res: NextResponse,
  refreshToken: string,
  maxAge?: number
) => {
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAge ? maxAge : 7 * 24 * 60 * 60, // default 7 days
    sameSite: "lax",
    priority: "high",
    path: "/",
  });
};
