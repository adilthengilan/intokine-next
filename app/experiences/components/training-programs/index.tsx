"use client"

import { motion } from "framer-motion"
import ProgramCard from "./program-card"
import { TRAINING_PROGRAMS } from "./programs-data"

export default function ModernTrainingPrograms() {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden grain-overlay vignette">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-grid-subtle" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-wider text-black mb-6 text-balance">
            TRAINING PROGRAMS
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Choose your path. Master your pace. Own your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {TRAINING_PROGRAMS.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg md:text-xl text-gray-600 mb-8">Ready to transform your running journey?</p>
          <motion.a
            href="#join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-all duration-300"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
