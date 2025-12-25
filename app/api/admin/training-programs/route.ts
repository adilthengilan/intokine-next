// src/app/api/admin/training-programs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.trainingProgram.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  });

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, subtitle, imageUrl, color, published = true } = body;

  if (!title || !subtitle || !imageUrl) {
    return NextResponse.json(
      { error: "title, subtitle, imageUrl required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.trainingProgram.aggregate({
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.trainingProgram.create({
    data: {
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
