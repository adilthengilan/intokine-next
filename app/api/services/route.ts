// src/app/api/services/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryId = url.searchParams.get("cat");

  const items = await prisma.service.findMany({
    where: {
      published: true,
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: { order: "asc" },
    include: {
      items: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json({
    items: items.map((s) => ({
      id: s.id,
      categoryId: s.categoryId,
      title: s.title,
      subtitle: s.subtitle,
      image: s.imageUrl,
      color: s.color,
      items: s.items.map((it) => ({ name: it.name, desc: it.desc })),
    })),
  });
}
