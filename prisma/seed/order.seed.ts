import prisma from "@/lib/prisma";
import { Prisma } from "../generated/prisma";

export const orderSeed = async (): Promise<void> => {
  const users: Prisma.UsersGetPayload<{ include: { addresses: true } }>[] =
    await prisma.users.findMany({
      include: { addresses: true },
    });
  const products = await prisma.product.findMany({
    include: {
      toppings: true,
    },
  });

  const ordersData: Prisma.OrderCreateInput[] = [
    {
      method: "CARD",
      status: "CONFIRMED",
      price: products[0].price,
      description: "Não colocar muito complemento pois quero mais light",
      user: {
        connect: {
          id: users[0].id,
        },
      },
      address: {
        connect: {
          id: users[0].addresses[0].id,
        },
      },
    },
    {
      method: "MONEY",
      status: "PREPARING",
      price: products[0].price + products[1].price,
      user: {
        connect: {
          id: users[1].id,
        },
      },
      address: {
        connect: {
          id: users[1].addresses[0].id,
        },
      },
    },
    {
      method: "MONEY",
      status: "FINISHED",
      description: "Prestar atenção na quantidade de açai",
      price: products[0].price + products[1].price + products[2].price,
      user: {
        connect: {
          id: users[0].id,
        },
      },
      address: {
        connect: {
          id: users[0].addresses[1].id,
        },
      },
    },
  ];

  for (const order of ordersData) {
    await prisma.order.create({ data: order });
  }
};
