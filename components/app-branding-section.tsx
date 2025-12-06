// components/app-branding-section.tsx
"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Feature = {
  id: string;
  title: string;
  imageUrl: string;
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

export default function AppBrandingSection() {
  const router = useRouter();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Load features from API ---
  useEffect(() => {
    let cancelled = false;

    const loadFeatures = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/branding/features", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error(
            "Failed to fetch /api/branding/features:",
            res.status,
            res.statusText
          );
          if (!cancelled) {
            setFeatures([]);
          }
          return;
        }

        const json = await res.json();
        const items = Array.isArray(json) ? json : json?.items ?? [];

        if (!cancelled) {
          setFeatures(items);
          if (items.length > 0) {
            setSelectedId(items[0].id);
          }
        }
      } catch (err) {
        console.error("Error loading branding features:", err);
        if (!cancelled) {
          setFeatures([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadFeatures();

    return () => {
      cancelled = true;
    };
  }, []);

  // --- Carousel auto-scroll + scroll tracking ---
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

  // Sync selected feature with scroll position so details + dots match
  useEffect(() => {
    if (!features.length) return;
    // 384 (w-96) + 32 (gap-8) approx per card width
    const approxWidth = 384 + 32;
    const index = Math.round(scrollPosition / approxWidth);
    const clamped = Math.max(0, Math.min(features.length - 1, index));
    const feature = features[clamped];
    if (feature && feature.id !== selectedId) {
      setSelectedId(feature.id);
    }
  }, [scrollPosition, features, selectedId]);

  const activeFeature =
    (selectedId && features.find((f) => f.id === selectedId)) ??
    features[0] ??
    null;

  if (loading) return null;

  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Subtle gradient background - works in B&W */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      {/* Animated subtle orbs - grayscale */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-gray-200/40 to-gray-300/40 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-gray-300/30 to-gray-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-gray-400/20 to-gray-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 px-8 py-3 rounded-full backdrop-blur-xl bg-white/60 border border-gray-300/60 shadow-lg"
          >
            <span className="text-sm font-semibold tracking-widest text-gray-800">
              EXPERIENCE THE APP
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
            Intokine
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Your Complete Fitness & Wellness Companion
          </p>
        </motion.div>

        {features.length === 0 ? (
          <p className="text-center text-gray-500">No branding items yet.</p>
        ) : (
          <>
            {/* Carousel */}
            <div className="relative">
              <div
                ref={carouselRef}
                onScroll={() =>
                  setScrollPosition(carouselRef.current?.scrollLeft ?? 0)
                }
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {features.map((feature, index) => {
                  const isSelected = feature.id === selectedId;
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.9, y: 50 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -15, scale: 1.02 }}
                      className="flex-shrink-0 w-full md:w-96 snap-center cursor-pointer"
                      onClick={() => { setSelectedId(feature.id)
    router.push(`pages/app`)}
                      }
                    >
                      <div
                        className={`group h-80 rounded-[10px] overflow-hidden relative bg-black ${
                          isSelected
                            ? "ring-2 ring-gray-900 ring-offset-2 ring-offset-gray-100"
                            : ""
                        }`}
                        style={{
                          boxShadow:
                            "0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)",
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 40px 100px rgba(0,0,0,0.3), 0 20px 50px rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)";
                        }}
                      >
                        {/* Image with grayscale effect */}
                        <img
                          src={cldFill(feature.imageUrl, 768, 640)}
                          alt={feature.title}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-115"
                          loading="lazy"
                        />

                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                        {/* Glass morphism overlay on hover */}
                        <div className="absolute inset-0 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Subtle white border on hover */}
                        <motion.div className="absolute inset-0 rounded-[10px] border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />

                        {/* Glass card for content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6" >
                          <motion.div
                            className="backdrop-blur-xl bg-white/20 border border-white/40 rounded-[10px] p-5 shadow-2xl"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {/* Decorative white line */}
                            <div className="w-16 h-1 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transform origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-500" />

                            <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                              {feature.title}
                            </h3>

                            {/* Short description inside card */}
                            {feature.description && (
                              <p className="mt-2 text-sm text-white/80 line-clamp-2 group-hover:line-clamp-4 transition-all duration-300">
                                {feature.description}
                              </p>
                            )}

                            {/* Animated icon on hover */}
                            <motion.div
                              className="mt-3 flex items-center gap-2 text-white/90"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                            >
                              <span className="text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Explore Feature
                              </span>
                              <motion.svg
                                className="w-5 h-5 opacity-0 group-hover:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{
                                  x: [0, 5, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </motion.svg>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Sparkle effect on corners */}
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Corner accent */}
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-white/0 border-l-transparent group-hover:border-t-white/20 transition-all duration-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-3 mt-12">
              {features.map((feature, index) => {
                const isActive = feature.id === selectedId;
                return (
                  <motion.div
                    key={feature.id}
                    className="rounded-full cursor-pointer backdrop-blur-sm border transition-all duration-300"
                    style={{
                      width: isActive ? "40px" : "12px",
                      height: "12px",
                      background: isActive
                        ? "linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(50, 50, 50, 0.9))"
                        : "rgba(200, 200, 200, 0.5)",
                      borderColor: isActive
                        ? "rgba(0, 0, 0, 0.5)"
                        : "rgba(150, 150, 150, 0.3)",
                      boxShadow: isActive
                        ? "0 4px 15px rgba(0, 0, 0, 0.3)"
                        : "none",
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (!carouselRef.current) return;
                      setSelectedId(feature.id);
                      carouselRef.current.scrollTo({
                        left: index * (384 + 32),
                        behavior: "smooth",
                      });
                    }}
                  />
                );
              })}
            </div>

            {/* Detail panel under carousel */}
            {activeFeature && (
              <div className="mt-10 max-w-3xl mx-auto">
                <div className="backdrop-blur-xl bg-white/80 border border-gray-200 rounded-2xl p-6 shadow-xl">
                  <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 mb-2">
                    FEATURE HIGHLIGHT
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {activeFeature.title}
                  </h3>
                  {activeFeature.description ? (
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      {activeFeature.description}
                    </p>
                  ) : (
                    <p className="text-base text-gray-500">
                      Tap on a screen above to see more about this part of the
                      Intokine app.
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
