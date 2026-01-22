// src/app/api/experiences/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.experience.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      subtitle: true,
      description: true,
      imageUrl: true,
      layout: true,
      order: true,
      items: {
        orderBy: { order: "asc" },
        select: { id: true, name: true, desc: true, order: true },
      },
    },
  });

  return NextResponse.json({ items });
}
