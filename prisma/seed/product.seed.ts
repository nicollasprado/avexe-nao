import prisma from "@/lib/prisma";
import { Category, Prisma, Topping } from "../generated/prisma";
import IStripeProductDTO from "@/interfaces/dtos/IStripeProductDTO";
import { stripeService } from "@/services/StripeService";
import StripeProductAlreadyExistsError from "@/erros/StripeProductAlreadyExistsError";

export const productSeed = async (): Promise<void> => {
  const categories: Category[] = await prisma.category.findMany();
  const toppings: Topping[] = await prisma.topping.findMany();

  const productsData: Prisma.ProductCreateInput[] = [
    {
      stripeProductId: "",
      stripePriceId: "",
      name: "Açaí 500ml",
      price: 1899,
      description: "Açaí de ótima qualidade, escolha até 5 acompanhamentos.",
      toppingsQt: 5,
      category: {
        connect: {
          id: categories[0].id,
        },
      },
      toppings: {
        connect: [
          {
            id: toppings[0].id,
          },
          {
            id: toppings[1].id,
          },
          {
            id: toppings[2].id,
          },
        ],
      },
    },
    {
      stripeProductId: "",
      stripePriceId: "",
      name: "Açaí 400ml",
      price: 1499,
      description: "Escolha até 2 acompanhamentos e uma cobertura.",
      toppingsQt: 3,
      category: {
        connect: {
          id: categories[1].id,
        },
      },
      toppings: {
        connect: [
          {
            id: toppings[0].id,
          },
          {
            id: toppings[1].id,
          },
        ],
      },
    },
    {
      stripeProductId: "",
      stripePriceId: "",
      name: "Açaí 300ml",
      price: 1199,
      toppingsQt: 3,
      category: {
        connect: {
          id: categories[1].id,
        },
      },
      toppings: {
        connect: [
          {
            id: toppings[2].id,
          },
        ],
      },
    },
    {
      stripeProductId: "",
      stripePriceId: "",
      name: "Açaí 250ml",
      price: 999,
      description: "escolha 1 acompanhamento e uma cobertura.",
      toppingsQt: 2,
      category: {
        connect: {
          id: categories[0].id,
        },
      },
      toppings: {
        connect: [
          {
            id: toppings[0].id,
          },
        ],
      },
    },
  ];

  for (const product of productsData) {
    const productInstance = await prisma.product.create({ data: product });

    try {
      const stripeProduct: IStripeProductDTO =
        await stripeService.createProduct(
          productInstance.name,
          productInstance.price
        );

      await prisma.product.update({
        where: { id: productInstance.id },
        data: {
          stripeProductId: stripeProduct.id,
          stripePriceId: stripeProduct.priceId,
        },
      });
    } catch (error) {
      if (error instanceof StripeProductAlreadyExistsError) {
        const stripeProduct: IStripeProductDTO =
          (await stripeService.getProductByName(
            productInstance.name
          )) as IStripeProductDTO;

        await prisma.product.update({
          where: { id: productInstance.id },
          data: {
            stripeProductId: stripeProduct.id,
            stripePriceId: stripeProduct.priceId,
          },
        });
      }
    }
  }
};
