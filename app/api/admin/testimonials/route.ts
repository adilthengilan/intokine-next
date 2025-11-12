// src/app/api/admin/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const {
    name,
    title,
    quote,
    publicId,
    order,
    published = true,
  } = await req.json();

  if (!name?.trim() || !title?.trim() || !quote?.trim()) {
    return NextResponse.json(
      { error: "name, title, quote are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.testimonial.aggregate({
    _max: { order: true },
  });
  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.testimonial.create({
    data: {
      name,
      title,
      quote,
      publicId,
      order: nextOrder,
      published,
    },
  });

  return NextResponse.json({ item });
}
