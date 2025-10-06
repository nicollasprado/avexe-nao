import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hashPassword";
import { Prisma } from "../generated/prisma";

export const usersSeed = async (): Promise<void> => {
  const usersData: Prisma.UsersCreateInput[] = [
    {
      firstName: "Joao",
      lastName: "Pedro",
      email: "jpedro@x.com",
      password: await hashPassword("joaopedro"),
      addresses: {
        createMany: {
          data: [
            {
              description: "Avenida abcde",
              number: "123",
              complement: "Bloco A, apartamento 1",
              reference: "Atras do mercado saojose",
            },
            {
              description: "Rua FGH",
              number: "321",
            },
          ],
        },
      },
    },
    {
      firstName: "Caio",
      lastName: "Cesar",
      email: "ccs@x.com",
      password: await hashPassword("caiocesar"),
      addresses: {
        create: {
          description: "Rua dos Amigos",
          number: "789A",
          reference: "Casa azul",
        },
      },
    },
  ];

  for (const user of usersData) {
    await prisma.users.create({ data: user });
  }
};
