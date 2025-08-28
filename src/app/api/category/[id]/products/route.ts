import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        equals: Number(id),
      },
    },
  });

  return NextResponse.json(products);
}
