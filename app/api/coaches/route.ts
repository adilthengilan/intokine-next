// src/app/api/coaches/route.ts
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
      imageUrl: true,
      order: true,
    },
  });
  return NextResponse.json({ items });
}
