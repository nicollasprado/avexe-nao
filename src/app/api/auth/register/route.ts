import IRegisterUserDTO from "@/interfaces/dtos/IRegisterUserDTO";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hashPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as IRegisterUserDTO;

  const { firstName, lastName, email, password } = body;

  const errors: string[] = [];

  if (!firstName) errors.push("First name is required");
  if (!lastName) errors.push("Last name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (password && password.length < 8)
    errors.push("Password must be at least 8 characters long");

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const isEmailInUse = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (isEmailInUse) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const newUser = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      password: passwordHash,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;

  return NextResponse.json(userWithoutPassword, { status: 201 });
}
