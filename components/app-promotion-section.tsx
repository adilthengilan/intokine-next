"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function AppPromotionSection() {
  const [showContact, setShowContact] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const appImages = [
    "/app-dashboard.png",
    "/app-training-interface.jpg",
    "/app-community-screen.jpg",
    "/app-profile-settings.jpg",
  ]

  const contactOptions = [
    { label: "Email", icon: "✉", href: "mailto:support@wadada.com" },
    { label: "WhatsApp", icon: "💬", href: "#" },
    { label: "Phone", icon: "☎", href: "tel:+1234567890" },
    { label: "Discord", icon: "🎮", href: "#" },
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 bg-white overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-cyan-50/30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Title */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 mb-6">
            Experience the{" "}
            <span className="text-transparent bg-gradient-to-r from-red-600 to-cyan-500 bg-clip-text">App</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover all the powerful features that make your running journey extraordinary
          </p>
        </motion.div>

        {/* App Showcase Grid - Glass Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {appImages.map((image, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-3xl overflow-hidden backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:bg-white/50 group-hover:border-white/60">
                {/* Floating animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + idx * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={image || "/placeholder.svg?height=400&width=300&query=app-ui"}
                    alt={`App Screen ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 to-cyan-500/20 blur-xl" />
              </div>

              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: ["0 0 0 rgba(239, 68, 68, 0)", "0 20px 40px rgba(239, 68, 68, 0.15)"],
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating Download Button */}
        <motion.div className="flex justify-center mb-24">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-full shadow-2xl backdrop-blur-md border border-red-400/50 transition-all duration-300"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            ⬇ Download App Now
          </motion.button>
        </motion.div>

        {/* Contact Section with Glass Effect */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg mb-6">Want to know more?</p>
            <motion.button
              onClick={() => setShowContact(!showContact)}
              className="text-3xl font-black text-gray-900 hover:text-red-600 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>

          {showContact && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {contactOptions.map((option, idx) => (
                <motion.a
                  key={idx}
                  href={option.href}
                  className="group relative rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: -50, rotate: -15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    transition: {
                      delay: idx * 0.12,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    },
                  }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  {/* Glass Effect Background */}
                  <div className="absolute inset-0 backdrop-blur-md bg-white/30 border border-white/50 group-hover:bg-white/50 group-hover:border-white/70 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative p-6 flex flex-col items-center justify-center h-full">
                    <motion.span
                      className="text-4xl mb-3"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: idx * 0.2,
                      }}
                    >
                      {option.icon}
                    </motion.span>
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors text-center">
                      {option.label}
                    </span>
                  </div>

                  {/* Hover Shadow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-cyan-500/0 group-hover:from-red-500/10 group-hover:to-cyan-500/10 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
