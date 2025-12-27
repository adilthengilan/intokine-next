// src/app/api/admin/experiences/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const {
    title,
    subtitle,
    description,
    imageUrl,
    publicId,
    layout,
    order,
    published,
  } = await req.json();

  const item = await prisma.experience.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(subtitle !== undefined ? { subtitle } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(publicId !== undefined ? { publicId } : {}),
      ...(layout !== undefined ? { layout } : {}),
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
  await prisma.experience.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
