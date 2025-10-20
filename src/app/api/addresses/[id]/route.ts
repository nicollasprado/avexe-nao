import IUpdateAddressDTO from "@/interfaces/dtos/IUpdateAddressDTO";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const address = await prisma.address.findUnique({
    where: { id },
  });

  if (!address) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  return NextResponse.json(address, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data: IUpdateAddressDTO = await req.json();
  const userId = await req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const address = await prisma.address.findUnique({
    where: { id },
  });

  if (!address) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  const isOwner = address.userId === userId;

  if (!isOwner) {
    return NextResponse.json(null, { status: 403 });
  }

  const updatedAddress = await prisma.address.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedAddress, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const address = await prisma.address.findUnique({
    where: { id },
  });

  if (!address) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  const isOwner = address.userId === userId;

  if (!isOwner) {
    return NextResponse.json(null, { status: 403 });
  }

  await prisma.address.delete({
    where: { id },
  });

  return NextResponse.json({ status: 204 });
}
