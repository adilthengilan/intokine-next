// src/components/locations-section.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, Clock, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type LocationItem = {
  id: string;
  city: string;
  place: string;
  time: string;
  description?: string | null;
  tz?: string | null;
  order: number;
};

export default function LocationsSection() {
  const [items, setItems] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load Mustica Pro font
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/mustica-pro';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/locations", { cache: "no-store" });
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

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items]
  );

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return sorted;
    const query = searchQuery.toLowerCase();
    return sorted.filter(
      (loc) =>
        loc.city.toLowerCase().includes(query) ||
        loc.place.toLowerCase().includes(query) ||
        loc.description?.toLowerCase().includes(query)
    );
  }, [sorted, searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center py-32 bg-white overflow-hidden" style={{ fontFamily: "'Mustica Pro', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Dark Grain Texture */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-black drop-shadow-2xl">
            FIND YOUR <span className="text-black border-b-4 border-black">LOCATION</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join runners worldwide at one of our community meet-ups
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, place, or description..."
              className="w-full pl-14 pr-14 py-5 rounded-full border-2 border-black bg-white text-black focus:border-black focus:outline-none focus:ring-4 focus:ring-black/10 transition-all placeholder:text-gray-500 text-lg shadow-lg hover:shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4 text-sm text-gray-600"
            >
              Found {filtered.length} location{filtered.length !== 1 ? "s" : ""}
            </motion.p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-48 rounded-3xl border-2 border-black/20 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-black/30"
          >
            <MapPin className="h-16 w-16 text-black/30 mx-auto mb-4" />
            <p className="text-black font-semibold text-lg mb-2">
              {searchQuery ? "No locations found" : "No locations yet"}
            </p>
            <p className="text-sm text-gray-600">
              {searchQuery
                ? "Try a different search term"
                : "Check back soon for upcoming meet-ups"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((loc) => (
              <motion.div
                key={loc.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="h-full border-2 border-white bg-black shadow-2xl hover:shadow-white/20 transition-all duration-300 group-hover:border-white overflow-hidden">
                  {/* Grain overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                    }} 
                  />

                  {/* White accent on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 p-8">
                    {/* Icon and City */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 border-2 border-white bg-white shadow-md">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors mb-1">
                          {loc.city}
                        </h3>
                        <p className="text-gray-400 font-medium">{loc.place}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-1 bg-white mb-4" />

                    {/* Time */}
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-white" />
                      <p className="text-white font-semibold">{loc.time}</p>
                    </div>

                    {/* Description */}
                    {loc.description && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {loc.description}
                      </p>
                    )}

                    {/* Timezone */}
                    {loc.tz && (
                      <p className="text-xs text-gray-500 font-mono mt-4 pt-4 border-t border-white/20">
                        {loc.tz}
                      </p>
                    )}
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