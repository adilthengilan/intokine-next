// src/app/api/run-categories/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.runCategory.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      order: true,
      description: true,
    },
  });
  return NextResponse.json({ items });
}
