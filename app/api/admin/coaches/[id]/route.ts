// src/app/api/admin/coaches/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const { name, specialty, description, publicId, imageUrl, order, published } =
    body;

  const item = await prisma.coach.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(specialty !== undefined ? { specialty } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(publicId !== undefined ? { publicId } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(order !== undefined ? { order } : {}),
      ...(published !== undefined ? { published } : {}),
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.coach.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
