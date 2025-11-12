"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"

export function CoachesSection() {
  const coaches = [
    {
      name: "Marcus Johnson",
      specialty: "Marathon Training",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Williams",
      specialty: "Speed & Sprint",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "James Chen",
      specialty: "Trail Running",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Amara Okonkwo",
      specialty: "Recovery & Wellness",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ]

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const getParallaxStyle = (index: number) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - 400, 2) + Math.pow(mousePosition.y - 300, 2))
    const angle = Math.atan2(mousePosition.y - 300, mousePosition.x - 400)

    const offset = 30 * Math.cos(angle + (index * Math.PI) / 2)
    const offsetY = 30 * Math.sin(angle + (index * Math.PI) / 2)

    return {
      transform: `translate(${offset * 0.5}px, ${offsetY * 0.5}px)`,
    }
  }

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-white overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-grid-subtle opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">EXPERT COACHES</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from world-class coaches dedicated to your success
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              className="flex flex-col group relative"
              style={getParallaxStyle(index)}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden h-80 mb-4 cursor-pointer"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <img
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Coach info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {coach.name}
                  </h3>
                  <p className="text-sm font-semibold text-red-300">{coach.specialty}</p>
                </div>
              </div>

              {/* Book button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                style={{
                  boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)",
                }}
              >
                Book Session
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
