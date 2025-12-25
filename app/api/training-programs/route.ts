// src/app/api/training-programs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.trainingProgram.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: {
      items: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json({
    items: items.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      image: p.imageUrl,
      color: p.color,
      items: p.items.map((it) => ({ name: it.name, desc: it.desc })),
    })),
  });
}
