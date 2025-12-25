// src/app/api/admin/training-programs/[id]/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const programId = params.id;
  const { name, desc } = await req.json();

  if (!name || !desc) {
    return NextResponse.json(
      { error: "name and desc required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.trainingProgramItem.aggregate({
    where: { programId },
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.trainingProgramItem.create({
    data: { programId, name, desc, order: nextOrder },
  });

  return NextResponse.json({ item });
}
