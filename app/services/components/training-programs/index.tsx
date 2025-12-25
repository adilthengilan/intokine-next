// app/services/components/training-programs/index.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProgramCard from "./program-card";

type Program = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  items: Array<{ name: string; desc: string }>;
  color: string;
};

export default function ModernTrainingPrograms() {
  const containerRef = useRef<HTMLElement>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/training-programs", {
          cache: "no-store",
        });
        const json = await res.json();
        const items = json?.items ?? [];
        if (!cancelled) setPrograms(items);
        console.log("✅ USING DYNAMIC TRAINING PROGRAMS");
      } catch (e) {
        console.error("Failed to load programs", e);
        if (!cancelled) setPrograms([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="training-programs"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-black overflow-hidden grain-overlay"
    >
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
            TRAINING PROGRAMS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Choose your path. Master your pace. Own your journey.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading programs...</p>
        ) : programs.length === 0 ? (
          <p className="text-center text-gray-400">No programs yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Ready to transform your running journey?
          </p>
          <motion.a
            href="#join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
