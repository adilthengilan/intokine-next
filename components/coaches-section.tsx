// components/coaches-section.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useInView } from "framer-motion";

type Coach = {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  order: number;
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

export function CoachesSection() {
  const [items, setItems] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/coaches", {
          cache: "no-store",
          signal: ac.signal,
        });
        const json = await res.json();
        if (!alive) return;
        setItems(Array.isArray(json.items) ? json.items : []);
      } catch {
        if (!ac.signal.aborted) setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  const coaches = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 } as any,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 } as any,
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-6 py-2 bg-black text-white text-sm tracking-widest rounded-full"
          >
            ELITE COACHING
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
            EXPERT COACHES
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Transform your performance with world-class expertise
          </p>
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 rounded-[10px] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : coaches.length === 0 ? (
          <p className="text-center text-gray-500">No coaches yet.</p>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.id}
                variants={itemVariants}
                whileHover={{ y: -20, scale: 1.02 }}
                className="flex flex-col group relative"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div
                  className="relative rounded-[10px] overflow-hidden h-[28rem] cursor-pointer bg-black shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  style={{
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12), 0 5px 15px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 40px 100px rgba(0, 0, 0, 0.35), 0 20px 50px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.12), 0 5px 15px rgba(0, 0, 0, 0.08)";
                  }}
                >
                  {/* Image with enhanced effects */}
                  <motion.img
                    src={cldFill(coach.imageUrl, 600, 800)}
                    alt={coach.name}
                    className="w-full h-full object-cover filter grayscale"
                    style={{
                      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    animate={{
                      scale: hoveredIndex === index ? 1.15 : 1,
                      filter: hoveredIndex === index ? "grayscale(0%)" : "grayscale(100%)",
                    }}
                    loading="lazy"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-[10px] border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"
                  />

                  {/* Corner accent - top right */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    {/* Top badge */}
                    <motion.div
                      className="self-start bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : -20,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <span className="text-white text-xs font-semibold tracking-wider uppercase">
                        {coach.specialty}
                      </span>
                    </motion.div>

                    {/* Bottom content */}
                    <div className="space-y-4">
                      {/* Decorative line */}
                      <motion.div
                        className="w-16 h-0.5 bg-white"
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredIndex === index ? "4rem" : "0rem",
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Name */}
                      <div className="space-y-2">
                        <motion.h3
                          className="text-3xl font-light tracking-wide text-white uppercase"
                          animate={{
                            y: hoveredIndex === index ? -8 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {coach.name}
                        </motion.h3>

                        {/* Subtitle appears on hover */}
                        <motion.p
                          className="text-sm text-white/70 tracking-widest uppercase"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            y: hoveredIndex === index ? 0 : 10,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Available for Consultation
                        </motion.p>
                      </div>

                      {/* CTA Arrow/Icon on hover */}
                      <motion.div
                        className="flex items-center gap-3 text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          x: hoveredIndex === index ? 0 : -20,
                        }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                      >
                        <span className="text-sm font-medium tracking-wider uppercase">
                          Book Now
                        </span>
                        <motion.svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{
                            x: hoveredIndex === index ? [0, 8, 0] : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: hoveredIndex === index ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Number indicator - bottom left */}
                  <motion.div
                    className="absolute bottom-8 left-8 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      borderColor: hoveredIndex === index ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Floating indicator */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? [0, -8, 0] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    y: {
                      duration: 1.5,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut",
                    },
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}