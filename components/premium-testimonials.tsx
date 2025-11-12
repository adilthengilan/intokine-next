"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function PremiumTestimonials() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const testimonials = [
    {
      id: 1,
      quote:
        "Wadada completely transformed my running journey. I went from occasional jogger to completing my first marathon in just 8 months!",
      name: "Sarah Chen",
      title: "Marathon Runner",
    },
    {
      id: 2,
      quote:
        "The coaching here is world-class. My 5K time improved by 3 minutes, and the community support keeps me motivated every single day.",
      name: "Michael Torres",
      title: "Competitive Runner",
    },
    {
      id: 3,
      quote:
        "I've tried many apps, but Wadada's community vibe is unmatched. Running together with this global family is the best decision I made.",
      name: "David Kim",
      title: "Community Leader",
    },
    {
      id: 4,
      quote:
        "From beginner to half-marathoner—Wadada made it possible. The personalized training plans are incredibly effective and motivating.",
      name: "Emma Rodriguez",
      title: "Aspiring Athlete",
    },
    {
      id: 5,
      quote:
        "The diversity of runners here is amazing. I found my tribe and discovered that running is so much more than just fitness.",
      name: "James Peterson",
      title: "Trail Enthusiast",
    },
    {
      id: 6,
      quote:
        "Wadada's AI coaching combined with real human support made all the difference. My PR improved faster than ever before.",
      name: "Priya Patel",
      title: "Speed Runner",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="relative py-24 bg-white">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">What Our Runners Say</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real runners who found their stride with Wadada Run Club.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-300/50">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br from-red-500 to-cyan-500 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="mb-6 text-4xl text-red-500 opacity-40">"</div>

                  {/* Quote Text */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">{testimonial.quote}</p>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full mb-6" />

                  {/* Author Info */}
                  <div>
                    <p className="font-semibold text-gray-900 text-base mb-1">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-cyan-500 shadow-lg hover:shadow-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </motion.button>
      )}
    </section>
  )
}

export default PremiumTestimonials
