import ICreateAddressDTO from "@/interfaces/dtos/ICreateAddressDTO";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ICreateAddressDTO = await req.json();

  const { cep, street, number, city, neighborhood, reference, complement } =
    data;

  const userId = req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const errors: string[] = [];

  if (!cep) errors.push("CEP é obrigatório");
  if (!street) errors.push("Rua é obrigatória");
  if (!number) errors.push("Número é obrigatório");
  if (!city) errors.push("Cidade é obrigatória");
  if (!neighborhood) errors.push("Bairro é obrigatório");

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const createdAddress = await prisma.address.create({
    data: {
      cep,
      street,
      number,
      city,
      neighborhood,
      complement,
      reference,
      userId,
    },
  });

  return NextResponse.json(createdAddress, { status: 201 });
}
