// src/app/api/coaches/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.coach.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      specialty: true,
      description: true,
      imageUrl: true,
      order: true,
    },
  });

  return NextResponse.json({ items });
}
