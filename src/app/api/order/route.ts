import { ProductNotFoundError } from "@/errors/ProductNotFoundError";
import ICreateOrderDTO from "@/interfaces/dtos/ICreateOrderDTO";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const orderData: ICreateOrderDTO = await req.json();

  const errors: string[] = [];

  const { method, addressId, products, description } = orderData;

  if (!method) errors.push("Payment method is required");

  if (!products || products.length === 0) {
    errors.push("At least one product is required");
  }
  if (!addressId) errors.push("Address ID is required");

  if (errors.length > 0) {
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const refinedOrderProducts = await Promise.all(
        products.map(async (product) => {
          const foundProduct = await transaction.product.findFirst({
            where: { id: product.id },
            select: { price: true },
          });

          if (!foundProduct) {
            throw new ProductNotFoundError(product.id);
          }

          return {
            productId: product.id,
            quantity: product.quantity,
            price: foundProduct.price,
          };
        })
      );

      const totalPrice = refinedOrderProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      const order = await transaction.order.create({
        data: {
          price: totalPrice,
          method,
          status: "PENDING",
          userId,
          addressId,
          description: description || null,
        },
      });

      if (!order)
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );

      await transaction.orderProduct.createMany({
        data: refinedOrderProducts.map((product) => ({
          orderId: order.id,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
      });

      return { order, items: refinedOrderProducts };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
