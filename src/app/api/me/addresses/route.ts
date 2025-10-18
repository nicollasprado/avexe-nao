import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");

  if (!userId) {
    return new Response(null, { status: 401 });
  }

  const userWithAddress = await prisma.users.findUnique({
    where: { id: userId },
    include: { addresses: { orderBy: { updatedAt: "desc" } } },
  });

  if (!userWithAddress) {
    return new Response(null, { status: 401 });
  }

  const addresses = userWithAddress.addresses;

  return new Response(JSON.stringify(addresses), {
    status: 200,
  });
}
