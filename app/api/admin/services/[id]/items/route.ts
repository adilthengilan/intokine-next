// src/app/api/admin/services/[id]/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const serviceId = params.id;
  const { name, desc } = await req.json();

  if (!name || !desc) {
    return NextResponse.json(
      { error: "name and desc required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.serviceItem.aggregate({
    where: { serviceId },
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.serviceItem.create({
    data: { serviceId, name, desc, order: nextOrder },
  });

  return NextResponse.json({ item });
}
