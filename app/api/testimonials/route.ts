//src/app/api/testimonials/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      title: true,
      quote: true,
      imageUrl: true,
      order: true,
    },
  });
  return NextResponse.json({ items });
}
