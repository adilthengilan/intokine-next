// src/app/admin/content/page.tsx
import Link from "next/link";

import { cookies } from "next/headers";

import {
  Image as ImageIcon,
  Users,
  ListChecks,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    href: "/admin/content/branding",
    title: "Services",
    desc: "Manage featured images and titles displayed in the App Branding section.",
    icon: ImageIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/admin/content/run-categories",
    title: "Service Categories",
    desc: "Configure category tiles with icons, images, labels and descriptions.",
    icon: ListChecks,
    color: "from-green-500 to-emerald-500",
  },
  {
    href: "/admin/content/coaches",
    title: "Coaches",
    desc: "Create and update coach profiles with photos, roles, and social links.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/admin/content/testimonials",
    title: "Testimonials",
    desc: "Showcase runner reviews and feedback with names, quotes and avatars.",
    icon: MessageSquare,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function ContentHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Content Dashboard</h2>
        <p className="text-gray-300">
          Manage all your website content from one centralized location
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${c.color} mb-4`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black">
                {c.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {c.desc}
              </p>

              <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-black">
                <span>Manage</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
