import prisma from "@/lib/prisma";
import { Category, Prisma, Topping } from "../generated/prisma";

export const productSeed = async (): Promise<void> => {
  const categories: Category[] = await prisma.category.findMany();
  const toppings: Topping[] = await prisma.topping.findMany();

  const productsData: Prisma.ProductCreateInput[] = [
    {
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
    await prisma.product.create({ data: product });
  }
};
