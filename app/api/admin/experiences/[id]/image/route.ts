// src/app/api/admin/experiences/[id]/image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { error: "Cloudinary env missing" },
      { status: 500 }
    );
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  body.append("folder", "intokine/experiences");

  const up = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body }
  );

  const data = await up.json();

  if (!up.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Upload failed" },
      { status: 500 }
    );
  }

  const item = await prisma.experience.update({
    where: { id },
    data: {
      imageUrl: data.secure_url,
      publicId: data.public_id,
    },
  });

  return NextResponse.json({ item });
}
