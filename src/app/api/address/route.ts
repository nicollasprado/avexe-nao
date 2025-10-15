import prisma from "@/lib/prisma";
import { jwtService } from "@/services/JwtService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return new Response(null, { status: 401 });
  }

  const tokenPayload = await jwtService.verifyToken(token);

  if (!tokenPayload) {
    return new Response(null, { status: 401 });
  }

  const userWithAddress = await prisma.users.findUnique({
    where: { id: tokenPayload.userId },
    include: { addresses: { orderBy: { updatedAt: "desc" } } },
  });

  if (!userWithAddress) {
    return new Response(null, { status: 401 });
  }

  if (userWithAddress.addresses.length === 0) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(userWithAddress.addresses), {
    status: 200,
  });
}
