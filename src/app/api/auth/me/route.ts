import IAuthUser from "@/interfaces/IAuthUser";
import prisma from "@/lib/prisma";
import { jwtService } from "@/services/JwtService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    // this isnt necessarily an error, just means user isnt logged in
    return NextResponse.json(
      { status: "User not authenticated" },
      { status: 200 }
    );
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

  const user: IAuthUser | null = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
