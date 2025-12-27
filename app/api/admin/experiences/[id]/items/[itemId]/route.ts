// src/app/api/admin/experiences/items/[itemId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;
  const { name, desc, order } = await req.json();

  const item = await prisma.experienceItem.update({
    where: { id: itemId },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(desc !== undefined ? { desc } : {}),
      ...(order !== undefined ? { order } : {}),
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  await prisma.experienceItem.delete({ where: { id: params.itemId } });
  return NextResponse.json({ ok: true });
}
