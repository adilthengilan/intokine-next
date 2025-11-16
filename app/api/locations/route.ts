// // src/app/api/locations/route.ts
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


// src/app/api/locations/route.ts

// ⛔ Prevent Next.js from prerendering this API route
// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const items = await prisma.location.findMany({
//       where: { published: true },
//       orderBy: { order: "asc" },
//       select: {
//         id: true,
//         city: true,
//         place: true,
//         time: true,
//         description: true,
//         order: true,
//       },
//     });

//     return NextResponse.json({ items });
//   } catch (error: any) {
//     console.error("API Error /api/locations:", error);
//     return NextResponse.json(
//       { error: "Failed to load locations" },
//       { status: 500 }
//     );
//   }
// }
