// components/app-branding-section.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Feature = { id: string; title: string; imageUrl: string };

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

export default function AppBrandingSection() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/branding/features", {
          cache: "no-store",
        });
        const json = await res.json();
        setFeatures(json.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;
    const interval = setInterval(() => {
      const el = carouselRef.current!;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const next = scrollLeft + 400;
      if (next >= scrollWidth - clientWidth - 50) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setScrollPosition(0);
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
        setScrollPosition(next);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            WADADA RUN CLUB
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your Complete Running Companion
          </p>
        </div>

        {features.length === 0 ? (
          <p className="text-center text-gray-500">No branding items yet.</p>
        ) : (
          <>
            <div className="relative">
              <div
                ref={carouselRef}
                onScroll={() =>
                  setScrollPosition(carouselRef.current?.scrollLeft ?? 0)
                }
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-full md:w-96 snap-center"
                  >
                    <div
                      className="group h-72 rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:scale-105 relative"
                      style={{
                        boxShadow:
                          "0 20px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.04)",
                      }}
                    >
                      <img
                        src={cldFill(feature.imageUrl, 768, 512)}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
            </div>

            <div className="flex justify-center gap-2 mt-12">
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-2 rounded-full bg-gray-300 transition-all duration-300 cursor-pointer hover:bg-gray-400"
                  style={{
                    width:
                      scrollPosition >= index * 400 &&
                      scrollPosition < (index + 1) * 400
                        ? "24px"
                        : "8px",
                    backgroundColor:
                      scrollPosition >= index * 400 &&
                      scrollPosition < (index + 1) * 400
                        ? "#ef4444"
                        : "#d1d5db",
                  }}
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({
                        left: index * (384 + 32),
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
