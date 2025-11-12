// src/components/run-categories-section.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

type Category = { id: string; title: string; imageUrl: string; order: number };

function cldFill(url: string, w: number, h: number) {
  try {
    if (!url.includes("/upload/")) return url;
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`
    );
  } catch {
    return url;
  }
}

export default function RunCategoriesSection() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/run-categories", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        console.log("RunCategories /api/run-categories items =", json.items);
        setItems(Array.isArray(json.items) ? json.items : []);
      } catch (err: any) {
        if (alive) setError(err?.message || "Failed to load categories");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      y: 120,
      x: index % 4 === 0 || index % 4 === 2 ? -100 : 100,
      rotateZ: index % 2 === 0 ? -20 : 20,
      scale: 0.7,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14, duration: 0.9 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            RUN CATEGORIES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect running style for your goals and fitness level
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <p className="text-center text-red-600">Failed to load: {error}</p>
        )}

        {/* Empty state */}
        {!loading && !error && categories.length === 0 && (
          <p className="text-center text-gray-500">No categories yet.</p>
        )}

        {/* Data */}
        {!loading && !error && categories.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                custom={index}
                variants={itemVariants}
                className="flex flex-col group relative rounded-2xl overflow-hidden"
              >
                <div
                  className="relative h-64 group cursor-pointer"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                >
                  <img
                    src={cldFill(category.imageUrl, 768, 512)}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
