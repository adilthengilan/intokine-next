// src/app/api/admin/experiences/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.experience.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    publicId,
    layout,
    order,
    published = true,
  } = await req.json();

  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const maxOrder = await prisma.experience.aggregate({ _max: { order: true } });
  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.experience.create({
    data: {
      title,
      subtitle: subtitle || null,
      description: description || null,
      imageUrl: imageUrl || null,
      publicId: publicId || null,
      layout: layout === "right" ? "right" : "left",
      order: nextOrder,
      published,
    },
  });

  return NextResponse.json({ item });
}
