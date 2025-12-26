// src/app/api/admin/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.service.findMany({
    orderBy: { order: "asc" },
    include: {
      category: { select: { id: true, title: true } },
      items: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    categoryId,
    title,
    subtitle,
    imageUrl,
    color,
    published = true,
  } = body;

  if (!categoryId || !title || !subtitle || !imageUrl) {
    return NextResponse.json(
      { error: "categoryId, title, subtitle, imageUrl required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.service.aggregate({
    where: { categoryId },
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.service.create({
    data: {
      categoryId,
      title,
      subtitle,
      imageUrl,
      color: color || "from-gray-800 to-black",
      published,
      order: nextOrder,
    },
  });

  return NextResponse.json({ item });
}
