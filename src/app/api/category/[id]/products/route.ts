import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        equals: Number(id),
      },
    },
  });

  return NextResponse.json(products);
}
