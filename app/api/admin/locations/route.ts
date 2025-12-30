// src/app/api/admin/locations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.location.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const {
    city,
    place,
    time,
    description,
    tz,
    mapLink,
    imageUrl,
    order,
    published = true,
  } = await req.json();

  if (!city?.trim() || !place?.trim() || !time?.trim()) {
    return NextResponse.json(
      { error: "city, place, time are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.location.aggregate({ _max: { order: true } });
  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.location.create({
    data: {
      city,
      place,
      time,
      description: description || null,
      tz: tz || null,
      mapLink: mapLink || null,
      imageUrl: imageUrl || null,
      order: nextOrder,
      published,
    },
  });

  return NextResponse.json({ item });
}
