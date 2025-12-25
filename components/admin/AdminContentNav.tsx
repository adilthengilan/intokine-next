// src/components/admin/AdminContentNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Image as ImageIcon,
  Users,
  ListChecks,
  MapPinned,
  MessageSquare,
  LayoutDashboard,
  Layers,
} from "lucide-react";

const SECTIONS = [
  { href: "/admin/content", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content/branding", label: "Services", icon: ImageIcon },
  {
    href: "/admin/content/training-programs",
    label: "Training Programs",
    icon: Layers,
  },
  {
    href: "/admin/content/run-categories",
    label: "Run Categories",
    icon: ListChecks,
  },
  { href: "/admin/content/coaches", label: "Coaches", icon: Users },
  {
    href: "/admin/content/testimonials",
    label: "Testimonials",
    icon: MessageSquare,
  },
  { href: "/admin/content/locations", label: "Locations", icon: MapPinned },
];

export default function AdminContentNav() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 bg-white md:bg-transparent">
      <div className="md:sticky md:top-6">
        <div className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider px-3">
          Content Management
        </div>
        <nav className="space-y-1">
          {SECTIONS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-black text-white shadow-sm"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
