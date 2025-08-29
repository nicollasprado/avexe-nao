import prisma from "@/lib/prisma";
import { Prisma } from "../generated/prisma";

export const orderProductSeed = async () => {
  const orders = await prisma.order.findMany();
  const products = await prisma.product.findMany({
    include: {
      toppings: true,
    },
  });

  const orderProductsData: Prisma.OrderProductCreateInput[] = [
    {
      quantity: 1,
      order: {
        connect: {
          id: orders[0].id,
        },
      },
      product: {
        connect: {
          id: products[0].id,
        },
      },
      toppings: {
        connect: [
          {
            id: products[0].toppings[0].id,
          },
        ],
      },
    },
    {
      quantity: 2,
      order: {
        connect: {
          id: orders[1].id,
        },
      },
      product: {
        connect: {
          id: products[1].id,
        },
      },
      toppings: {
        connect: [
          {
            id: products[1].toppings[0].id,
          },
          {
            id: products[1].toppings[1].id,
          },
        ],
      },
    },
    {
      quantity: 1,
      order: {
        connect: {
          id: orders[1].id,
        },
      },
      product: {
        connect: {
          id: products[3].id,
        },
      },
      toppings: {
        connect: {
          id: products[3].toppings[0].id,
        },
      },
    },
    {
      quantity: 3,
      order: {
        connect: {
          id: orders[2].id,
        },
      },
      product: {
        connect: {
          id: products[2].id,
        },
      },
      toppings: {
        connect: {
          id: products[2].toppings[0].id,
        },
      },
    },
    {
      quantity: 1,
      order: {
        connect: {
          id: orders[2].id,
        },
      },
      product: {
        connect: {
          id: products[1].id,
        },
      },
      toppings: {
        connect: [
          {
            id: products[1].toppings[0].id,
          },
          {
            id: products[1].toppings[1].id,
          },
        ],
      },
    },
    {
      quantity: 1,
      order: {
        connect: {
          id: orders[2].id,
        },
      },
      product: {
        connect: {
          id: products[0].id,
        },
      },
      toppings: {
        connect: {
          id: products[0].toppings[0].id,
        },
      },
    },
  ];

  for (const orderProduct of orderProductsData) {
    await prisma.orderProduct.create({ data: orderProduct });
  }
};
