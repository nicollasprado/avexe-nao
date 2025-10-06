import { ProductNotFoundError } from "@/erros/ProductNotFoundError";
import ICartProduct from "@/interfaces/ICartProduct";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { capitalize } from "@/utils/capitalize";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const cartProducts: ICartProduct[] = await req.json();

    if (!cartProducts || cartProducts.length === 0) {
      return NextResponse.json(
        { error: "No products in the cart" },
        { status: 400 }
      );
    }

    const line_items = await Promise.all(
      cartProducts.map(async (cartProduct) => {
        const toppingsNames = cartProduct.toppings
          .map((t) => t.name)
          .join(", ");

        const description = toppingsNames
          ? `${capitalize(toppingsNames)}`
          : "Sem adicionais";

        const productInstance = await prisma.product.findFirst({
          where: {
            id: cartProduct.product.id,
          },
        });

        if (!productInstance) {
          throw new ProductNotFoundError(cartProduct.product.id);
        }

        return {
          quantity: cartProduct.quantity,
          price_data: {
            currency: "brl",
            unit_amount: productInstance.price,
            product_data: {
              name: cartProduct.product.name,
              description,
              metadata: { toppings: JSON.stringify(cartProduct.toppings) },
            },
          },
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url! }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
