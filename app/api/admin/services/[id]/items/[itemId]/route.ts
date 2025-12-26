// src/app/api/admin/services/items/[itemId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;
  const body = await req.json();
  const { name, desc, order } = body;

  const item = await prisma.serviceItem.update({
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
  await prisma.serviceItem.delete({ where: { id: params.itemId } });
  return NextResponse.json({ ok: true });
}
