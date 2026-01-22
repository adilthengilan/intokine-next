// src/app/api/branding/features/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.brandingFeature.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { id: true, title: true, description: true, imageUrl: true },
  });
  return NextResponse.json({ items });
}
