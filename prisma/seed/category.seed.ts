import prisma from "@/lib/prisma";
import { Prisma } from "../generated/prisma";

export const categorySeed = async (): Promise<void> => {
  const categoriesData: Prisma.CategoryCreateInput[] = [
    {
      name: "Promoções",
    },
    {
      name: "Açaís",
    },
  ];

  for (const category of categoriesData) {
    await prisma.category.create({ data: category });
  }
};
