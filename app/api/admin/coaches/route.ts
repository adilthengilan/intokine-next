// src/app/api/admin/coaches/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.coach.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const {
    name,
    specialty,
    description,
    publicId,
    imageUrl,
    order,
    published = true,
  } = await req.json();

  if (!name || !specialty || !publicId || !imageUrl) {
    return NextResponse.json(
      { error: "name, specialty, publicId, imageUrl required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.coach.aggregate({ _max: { order: true } });
  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.coach.create({
    data: {
      name,
      specialty,
      description: description ?? null,
      publicId,
      imageUrl,
      order: nextOrder,
      published,
    },
  });

  return NextResponse.json({ item });
}
