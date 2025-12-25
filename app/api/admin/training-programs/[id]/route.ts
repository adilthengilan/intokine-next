// src/app/api/admin/training-programs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const { title, subtitle, imageUrl, color, order, published } = body;

  const item = await prisma.trainingProgram.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(subtitle !== undefined ? { subtitle } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(color !== undefined ? { color } : {}),
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

  await prisma.trainingProgram.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
