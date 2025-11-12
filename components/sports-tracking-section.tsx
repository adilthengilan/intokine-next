"use client"

import { motion } from "framer-motion"
import { Zap, Target, Activity } from "lucide-react"

export function SportsTrackingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    },
    float: {
      y: [-10, 10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  const featureCards = [
    { icon: Activity, text: "Track Performance", description: "Monitor metrics to track progress" },
    { icon: Zap, text: "Real-Time Insights", description: "Get data instantly during workouts" },
    { icon: Target, text: "Personalized Goals", description: "Tailored plans based on your stats" },
  ]

  const metricCards = [
    {
      title: "Workout Summary",
      stats: ["142 Calories", "8.5 km", "32 min"],
      position: "top-0 left-0",
      delay: 0.1,
    },
    {
      title: "Nutrition",
      subtitle: "Protein Smoothie",
      score: "92/100",
      position: "top-1/2 right-0",
      delay: 0.3,
    },
    {
      title: "Performance",
      metrics: ["Heart Rate: 142 bpm", "Recovery: 8h Sleep"],
      position: "bottom-0 left-1/4",
      delay: 0.5,
    },
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.h2 className="text-5xl md:text-6xl font-black tracking-wider text-gray-900">
                The Future of Sports Tracking Today
              </motion.h2>
              <motion.p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Experience smarter, real-time performance insights with seamless tracking — empowering athletes to take
                control of their fitness every day.
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition-colors duration-300 w-fit"
            >
              Get Started Now
            </motion.button>

            {/* Feature Pills */}
            <motion.div variants={containerVariants} className="space-y-3 pt-4">
              {featureCards.map((card, idx) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-cyan-400 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{card.text}</p>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Athlete Image with Floating Cards */}
          <motion.div variants={itemVariants} className="relative h-full min-h-96 flex items-center justify-center">
            {/* Athlete Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/athlete-running-smartwatch-fitness-tracking.jpg"
                alt="Athlete checking performance metrics on smartwatch"
                className="w-full h-full object-cover"
              />
              {/* Soft glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Floating Metric Cards */}
            {metricCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={floatingVariants}
                initial="hidden"
                whileInView="visible"
                animate="float"
                transition={{ delay: card.delay }}
                viewport={{ once: false, margin: "-100px" }}
                className={`absolute ${card.position} w-44 p-4 rounded-xl glass-effect shadow-lg border border-white/20 backdrop-blur-md`}
              >
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">{card.title}</p>
                {card.stats && (
                  <div className="space-y-1">
                    {card.stats.map((stat, i) => (
                      <p key={i} className="text-sm font-bold text-gray-900">
                        {stat}
                      </p>
                    ))}
                  </div>
                )}
                {card.subtitle && (
                  <>
                    <p className="text-sm text-gray-600 mb-2">{card.subtitle}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">{card.score}</span>
                      <span className="text-xs text-gray-500">Health Score</span>
                    </div>
                  </>
                )}
                {card.metrics && (
                  <div className="space-y-2">
                    {card.metrics.map((metric, i) => (
                      <p key={i} className="text-xs text-gray-700">
                        {metric}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
