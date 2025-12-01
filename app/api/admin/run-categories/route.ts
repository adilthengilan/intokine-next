// src/app/api/admin/run-categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.runCategory.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const {
    title,
    publicId,
    imageUrl,
    order,
    published = true,
    description,
  } = await req.json();

  if (!title || !publicId || !imageUrl) {
    return NextResponse.json(
      { error: "title, publicId, imageUrl required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.runCategory.aggregate({
    _max: { order: true },
  });

  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.runCategory.create({
    data: {
      title,
      publicId,
      imageUrl,
      description: description ?? null,
      order: nextOrder,
      published,
    },
  });

  return NextResponse.json({ item });
}
