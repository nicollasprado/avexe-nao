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
              cep: "12345678911",
              street: "Avenida abcde",
              number: "123",
              city: "Parnamirim",
              neighborhood: "Nova Parnamirim",
              complement: "Bloco A, apartamento 1",
              reference: "Atras do mercado saojose",
            },
            {
              cep: "12345678911",
              street: "Rua FGH",
              number: "321",
              city: "Natal",
              neighborhood: "Ponta Negra",
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
          cep: "12345678911",
          street: "Rua dos Amigos",
          number: "789A",
          city: "Natal",
          neighborhood: "Candelária",
          reference: "Casa azul",
        },
      },
    },
  ];

  for (const user of usersData) {
    await prisma.users.create({ data: user });
  }
};
