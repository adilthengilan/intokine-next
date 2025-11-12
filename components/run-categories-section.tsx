"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function RunCategoriesSection() {
  const categories = [
    {
      id: 1,
      title: "Easy Runs",
      image: "/easy-running-pace-trail.jpg",
    },
    {
      id: 2,
      title: "Speed Work",
      image: "/fast-sprinting-athletic-run.jpg",
    },
    {
      id: 3,
      title: "Trail Running",
      image: "/trail-running-mountain-path.jpg",
    },
    {
      id: 4,
      title: "Tempo Runs",
      image: "/marathon-tempo-pace-running.jpg",
    },
  ]

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 120,
      x: (index: number) => {
        if (index % 4 === 0) return -100
        if (index % 4 === 1) return 100
        if (index % 4 === 2) return -100
        return 100
      },
      rotateZ: (index: number) => (index % 2 === 0 ? -20 : 20),
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        duration: 0.9,
      },
    },
  }

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
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">RUN CATEGORIES</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect running style for your goals and fitness level
          </p>
        </motion.div>

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
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Title at bottom inside card */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
