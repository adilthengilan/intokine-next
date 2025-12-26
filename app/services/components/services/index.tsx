// app/services/components/services/index.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "./service-card";

type Service = {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  image: string;
  items: Array<{ name: string; desc: string }>;
  color: string;
};

export default function ModernServices() {
  const sp = useSearchParams();
  const cat = sp.get("cat");

  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const url = cat
          ? `/api/services?cat=${encodeURIComponent(cat)}`
          : "/api/services";
        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) setItems(json?.items ?? []);
      } catch (e) {
        console.error("Failed to load services", e);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cat]);

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden grain-overlay">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-small" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-header tracking-wider text-white mb-6">
            SERVICES
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Pick a category, then choose the service that matches your goal.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading services...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">
            No services yet for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {items.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
