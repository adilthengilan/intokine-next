// app/api/branding/features/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const feature = await prisma.brandingFeature.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                publicId: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!feature) {
            return NextResponse.json(
                { error: "Feature not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ feature });
    } catch (error) {
        console.error("Error fetching branding feature:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
