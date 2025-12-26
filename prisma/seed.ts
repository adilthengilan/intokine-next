// prisma/seed.ts
import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.serviceItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.runCategory.deleteMany();

  const categories = await prisma.runCategory.createMany({
    data: [
      {
        title: "Strength & Conditioning",
        description: "Build strength, endurance, and athletic performance.",
        publicId: "mock/run-categories/strength",
        imageUrl:
          "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=1400&q=60",
        order: 0,
        published: true,
      },
      {
        title: "Speed & Agility",
        description: "Explosive speed drills, agility work, and mechanics.",
        publicId: "mock/run-categories/speed",
        imageUrl:
          "https://images.unsplash.com/photo-1526401485004-2aa7f3ccf04b?auto=format&fit=crop&w=1400&q=60",
        order: 1,
        published: true,
      },
      {
        title: "Endurance Training",
        description: "Aerobic base, tempo runs, intervals and recovery.",
        publicId: "mock/run-categories/endurance",
        imageUrl:
          "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1400&q=60",
        order: 2,
        published: true,
      },
    ],
  });

  const cats = await prisma.runCategory.findMany({ orderBy: { order: "asc" } });

  const strength = cats[0]!;
  const speed = cats[1]!;
  const endurance = cats[2]!;

  async function createServiceWithItems(opts: {
    categoryId: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    color: string;
    order: number;
    published?: boolean;
    items: Array<{ name: string; desc: string }>;
  }) {
    const service = await prisma.service.create({
      data: {
        categoryId: opts.categoryId,
        title: opts.title,
        subtitle: opts.subtitle,
        imageUrl: opts.imageUrl,
        color: opts.color,
        order: opts.order,
        published: opts.published ?? true,
      },
    });

    await prisma.serviceItem.createMany({
      data: opts.items.map((it, idx) => ({
        serviceId: service.id,
        name: it.name,
        desc: it.desc,
        order: idx,
      })),
    });

    return service;
  }

  await createServiceWithItems({
    categoryId: strength.id,
    title: "Athlete Strength Program",
    subtitle: "Build real-world strength for runners.",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=60",
    color: "from-black to-gray-700",
    order: 0,
    items: [
      {
        name: "Full-body strength",
        desc: "Compound lifts + runner-specific work.",
      },
      { name: "Injury prevention", desc: "Stability + mobility protocols." },
      { name: "Progress tracking", desc: "Weekly progression checkpoints." },
    ],
  });

  await createServiceWithItems({
    categoryId: strength.id,
    title: "Mobility + Core Reset",
    subtitle: "Fix tightness, improve running posture.",
    imageUrl:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=60",
    color: "from-purple-500 to-pink-500",
    order: 1,
    items: [
      { name: "Hip mobility", desc: "Open hips to improve stride efficiency." },
      { name: "Core control", desc: "Better posture, less lower-back load." },
      { name: "Recovery flow", desc: "Short routines for post-run recovery." },
    ],
  });

  await createServiceWithItems({
    categoryId: speed.id,
    title: "Speed Mechanics Clinic",
    subtitle: "Improve form, cadence and foot strike.",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=60",
    color: "from-green-500 to-emerald-500",
    order: 0,
    items: [
      {
        name: "Sprint drills",
        desc: "A/B skips, high knees, posture corrections.",
      },
      { name: "Cadence tuning", desc: "Find your efficient step rate." },
      { name: "Video feedback", desc: "Quick analysis & corrections." },
    ],
  });

  await createServiceWithItems({
    categoryId: speed.id,
    title: "Agility + Acceleration",
    subtitle: "Explosive start + directional control.",
    imageUrl:
      "https://images.unsplash.com/photo-1526679490707-3ca12cbe86d9?auto=format&fit=crop&w=1400&q=60",
    color: "from-blue-500 to-cyan-500",
    order: 1,
    items: [
      {
        name: "Acceleration work",
        desc: "0–20m explosiveness and drive phase.",
      },
      {
        name: "Agility patterns",
        desc: "Quick feet drills + reaction training.",
      },
      { name: "Power sessions", desc: "Plyometrics + sprint strength." },
    ],
  });

  await createServiceWithItems({
    categoryId: endurance.id,
    title: "Half Marathon Builder",
    subtitle: "Structured plan + coaching support.",
    imageUrl:
      "https://images.unsplash.com/photo-1518081461904-9e463f4aaef8?auto=format&fit=crop&w=1400&q=60",
    color: "from-gray-800 to-black",
    order: 0,
    items: [
      { name: "Weekly plan", desc: "Base + tempo + intervals balanced." },
      { name: "Long run strategy", desc: "Fueling + pacing guidance." },
      { name: "Recovery optimization", desc: "Sleep + mobility + deloads." },
    ],
  });

  await createServiceWithItems({
    categoryId: endurance.id,
    title: "Beginner 5K Kickstart",
    subtitle: "Start running safely, build confidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1400&q=60",
    color: "from-indigo-500 to-purple-500",
    order: 1,
    items: [
      { name: "Walk-run plan", desc: "Simple progression for new runners." },
      {
        name: "Breathing basics",
        desc: "Comfortable pacing and effort control.",
      },
      {
        name: "Form fundamentals",
        desc: "Posture, arm swing, foot placement.",
      },
    ],
  });

  console.log("✅ Mock data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
