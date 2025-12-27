// src/app/api/admin/experiences/[id]/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const experienceId = params.id;
  const { name, desc, order } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const maxOrder = await prisma.experienceItem.aggregate({
    where: { experienceId },
    _max: { order: true },
  });

  const nextOrder =
    typeof order === "number" ? order : (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.experienceItem.create({
    data: {
      experienceId,
      name,
      desc: desc || "",
      order: nextOrder,
    },
  });

  return NextResponse.json({ item });
}
