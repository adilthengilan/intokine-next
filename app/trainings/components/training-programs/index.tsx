// app/trainings/components/training-programs/index.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/training-programs", {
          cache: "no-store",
        });
        const json = await res.json();
        if (!cancelled) setPrograms(json.items ?? []);
        console.log("✅ TRAININGS PAGE USING API", json.items);
      } catch (err) {
        console.error("❌ Failed to fetch training programs", err);
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
    <section className="relative py-20 md:py-32 bg-white overflow-hidden grain-overlay vignette">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-grid-subtle" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-wider text-black mb-6">
            TRAINING PROGRAMS
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Choose your path. Master your pace. Own your journey.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">Loading programs…</p>
        ) : programs.length === 0 ? (
          <p className="text-center text-gray-500">No programs found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {programs.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
