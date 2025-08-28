import prisma from "@/lib/prisma";
import { Prisma } from "../generated/prisma";

export const storeSeed = async (): Promise<void> => {
  const storeData: Prisma.StoreCreateInput = {
    name: "Se Avexe Não",
    startWeekday: "MONDAY",
    endWeekday: "SATURDAY",
    startHour: 13,
    endHour: 22,
    logoUrl: "logo.jpg",
    bannerUrl: "bg.jpg",
  };

  await prisma.store.create({ data: storeData });
};
