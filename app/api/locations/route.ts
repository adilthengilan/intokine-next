// src/app/api/locations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.location.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      city: true,
      place: true,
      time: true,
      description: true,
      order: true,
    },
  });
  return NextResponse.json({ items });
}
