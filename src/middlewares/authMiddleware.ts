import { jwtService } from "@/services/JwtService";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    // this isnt necessarily an error, just means user isnt logged in
    return NextResponse.json(null, { status: 203 });
  }

  const payload = await jwtService.verifyToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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
