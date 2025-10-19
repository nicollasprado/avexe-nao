import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const address = await prisma.address.findUnique({
    where: { id },
  });

  if (!address) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  return NextResponse.json(address, { status: 200 });
}
