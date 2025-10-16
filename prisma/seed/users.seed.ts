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
              cep: "12345678",
              street: "Avenida abcde",
              number: "123",
              neighborhood: "Centro",
              complement: "Bloco A, apartamento 1",
              reference: "Atras do mercado saojose",
            },
            {
              cep: "12345678",
              street: "Rua FGH",
              number: "321",
              neighborhood: "Natal",
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
          cep: "12345678",
          street: "Rua dos Amigos",
          number: "789A",
          neighborhood: "Parnamirim",
          reference: "Casa azul",
        },
      },
    },
  ];

  for (const user of usersData) {
    await prisma.users.create({ data: user });
  }
};
