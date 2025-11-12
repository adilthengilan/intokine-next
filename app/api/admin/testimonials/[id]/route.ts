// src/app/api/admin/testimonials/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { name, title, quote, publicId, order, published } = await req.json();

  const item = await prisma.testimonial.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(title !== undefined ? { title } : {}),
      ...(quote !== undefined ? { quote } : {}),
      ...(publicId !== undefined ? { publicId } : {}),
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
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
