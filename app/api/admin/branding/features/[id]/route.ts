// src/app/api/admin/branding/features/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const { title, publicId, imageUrl, order, published } = body;

  const item = await prisma.brandingFeature.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
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
  await prisma.brandingFeature.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
