import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hashPassword";
import { Prisma } from "~/app/generated/prisma";

export const usersSeed = async (): Promise<void> => {
  const usersData: Prisma.UsersCreateInput[] = [
    {
      name: "Joao Pedro",
      email: "jpedro@x.com",
      password: hashPassword("joaopedro"),
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
      name: "Caio Cesar da Silva",
      email: "ccs@x.com",
      password: hashPassword("caiocesar"),
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
