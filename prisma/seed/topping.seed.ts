import prisma from "@/lib/prisma";
import { Prisma } from "~/app/generated/prisma";

export const toppingSeed = async (): Promise<void> => {
  const toppingsData: Prisma.ToppingCreateInput[] = [
    {
      name: "disquetes",
      pricePerUnit: 100,
    },
    {
      name: "chocoball",
      pricePerUnit: 150,
    },
    {
      name: "calda de chocolate",
      pricePerUnit: 50,
    },
  ];

  for (const topping of toppingsData) {
    await prisma.topping.create({ data: topping });
  }
};
