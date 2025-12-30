// src/app/api/admin/locations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const {
    city,
    place,
    time,
    description,
    tz,
    mapLink,
    imageUrl,
    order,
    published,
  } = await req.json();

  const item = await prisma.location.update({
    where: { id },
    data: {
      ...(city !== undefined ? { city } : {}),
      ...(place !== undefined ? { place } : {}),
      ...(time !== undefined ? { time } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(tz !== undefined ? { tz } : {}),
      ...(mapLink !== undefined ? { mapLink } : {}),
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
  await prisma.location.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
