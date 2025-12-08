// src/components/run-categories-section.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  description?: string | null;
};

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
    const router = useRouter();
  
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/run-categories", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        console.log("RunCategories /api/run-categories items =", json.items);
        const arr = Array.isArray(json.items) ? json.items : [];
        setItems(arr);
        if (arr.length > 0) setSelectedId(arr[0].id);
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

  const activeCategory =
    (selectedId && categories.find((c) => c.id === selectedId)) ??
    categories[0] ??
    null;

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            CATEGORIES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reconnect with your body, mind, and lifestyle — blending fitness,
            nutrition, martial arts, and mindful practices.
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
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {categories.map((category, index) => {
                const isActive = category.id === selectedId;
                return (
                  <motion.div
                    key={category.id}
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ y: -16 }}
                    className="flex flex-col group relative"
                    onClick={() =>{
                      setSelectedId(category.id)
                      router.push('services/app')
                    }}
                  >
                    <div
                      className={`relative h-80 cursor-pointer overflow-hidden bg-black rounded-[10px] ${
                        isActive
                          ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 35px 90px rgba(0,0,0,0.4), 0 15px 40px rgba(0,0,0,0.25), 0 0 1px rgba(255,255,255,0.1) inset";
                        e.currentTarget.style.transform = "translateY(-8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Image with grayscale filter */}
                      <img
                        src={cldFill(category.imageUrl, 768, 512)}
                        alt={category.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                        loading="lazy"
                        style={{ mixBlendMode: "luminosity" }}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                      {/* Elegant border effect on hover */}
                      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[10px]" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        {/* Decorative line */}
                        <div className="w-12 h-px bg-white mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                        <h3 className="text-3xl font-light tracking-wider text-white uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {category.title}
                        </h3>

                        {/* Subtitle appears on hover */}
                        <p className="text-sm text-white/80 tracking-wide mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          EXPLORE COLLECTION
                        </p>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-white/0 border-r-transparent group-hover:border-t-white/10 transition-all duration-500" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Detail panel under grid */}
            {activeCategory && (
              <div className="mt-12 max-w-3xl mx-auto">
                <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-xl">
                  <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 mb-2">
                    CATEGORY SPOTLIGHT
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {activeCategory.title}
                  </h3>
                  {activeCategory.description ? (
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      {activeCategory.description}
                    </p>
                  ) : (
                    <p className="text-base text-gray-500">
                      Tap a category card above to explore how this track
                      supports your Intokine journey.
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
