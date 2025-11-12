"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  imageUrl?: string | null;
  order: number;
};

export function PremiumTestimonials() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        setItems(Array.isArray(json.items) ? json.items : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
            What Our Runners Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real runners who found their stride with Wadada
            Run Club.
          </p>
        </motion.div>

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-56 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-600 font-medium">No testimonials yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add some in Admin → Content → Testimonials
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sorted.map((t) => (
              <motion.div
                key={t.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-300/50">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br from-red-500 to-cyan-500 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-6 text-4xl text-red-500 opacity-40">
                      "
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
                      {t.quote}
                    </p>
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full mb-6" />
                    <div>
                      <p className="font-semibold text-gray-900 text-base mb-1">
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-sm">{t.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-cyan-500 shadow-lg hover:shadow-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </motion.button>
      )}
    </section>
  );
}

export default PremiumTestimonials;
