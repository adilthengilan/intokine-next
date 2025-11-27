"use client"

import { motion, Variants } from "framer-motion"
import { Zap, Target, Activity, TrendingUp, Heart, Timer } from "lucide-react"

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  }

  const floatingVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as any },
    },
  }

  // Updated feature cards for Intokine
  const featureCards = [
    { icon: Activity, text: "Skill Development", description: "Learn and enhance new skills interactively" },
    { icon: Zap, text: "Smart Course Insights", description: "Track your progress and achievements in real-time" },
    { icon: Target, text: "Personalized Learning", description: "Courses and guidance tailored to your goals" },
  ]

  // Updated metric cards for Intokine
  const metricCards = [
    {
      title: "Courses",
      stats: [
        { label: "Completed", value: "12", icon: TrendingUp as any },
        { label: "Ongoing", value: "3", icon: Target as any },
        { label: "Upcoming", value: "2", icon: Timer as any },
      ],
      position: "top-4 left-4",
      delay: 0.2,
      gradient: "from-red-500/10 to-orange-500/10",
      border: "border-red-500/30",
      value: undefined,
      unit: undefined,
      subtitle: undefined,
      icon: undefined,
    },
    {
      title: "Learning Hours",
      value: "42",
      unit: "hrs",
      subtitle: "This Week",
      position: "top-4 right-4",
      delay: 0.4,
      gradient: "from-pink-500/10 to-red-500/10",
      border: "border-pink-500/30",
      icon: Heart as any,
      stats: undefined,
    },
    {
      title: "Skill Progress",
      stats: [
        { label: "Python", value: "80%" },
        { label: "Design", value: "65%" },
      ],
      position: "bottom-4 left-4",
      delay: 0.6,
      gradient: "from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-500/30",
      value: undefined,
      unit: undefined,
      subtitle: undefined,
      icon: undefined,
    },
    {
      title: "Certifications",
      value: "5",
      unit: "",
      subtitle: "Earned",
      position: "bottom-4 right-4",
      delay: 0.8,
      gradient: "from-green-500/10 to-emerald-500/10",
      border: "border-green-500/30",
      stats: undefined,
      icon: undefined,
    },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-red-100/40 to-orange-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Elite badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-2 bg-black text-white text-xs tracking-widest rounded-full font-semibold"
            >
              SMART TRACKING
            </motion.div>

            <div className="space-y-6">
              <motion.h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                THE FUTURE OF SPORTS TRACKING TODAY
              </motion.h2>
              <motion.p className="text-xl text-gray-600 leading-relaxed font-light">
                Intokine helps you learn smarter, track your course progress, and achieve your skill goals efficiently with
                interactive dashboards and real-time insights.
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-[10px] font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div variants={containerVariants} className="space-y-4 pt-6">
              {featureCards.map((card, idx) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ 
                      x: 8,
                    }}
                    className="flex items-center gap-5 p-5 rounded-[10px] bg-white/80 backdrop-blur-sm border border-gray-200/60 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-gradient-to-br from-red-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-base">{card.text}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{card.description}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Athlete Image with Floating Cards */}
          <motion.div 
            variants={itemVariants} 
            className="relative h-full min-h-[600px] flex items-center justify-center"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="relative w-full h-[500px] rounded-[10px] overflow-hidden"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/intokine-learning-dashboard.jpg"
                alt="Intokine app dashboard for tracking skill development"
                className="w-full h-full object-cover filter brightness-95"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent" 
                   style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
            </motion.div>

            {/* Floating Metric Cards */}
            {metricCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={floatingVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                }}
                viewport={{ once: false, margin: "-100px" }}
                className={`absolute ${card.position} w-52 p-5 rounded-[10px] bg-white/95 backdrop-blur-xl border ${card.border} cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Header with icon */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">{card.title}</p>
                  {card.icon && (() => {
                    const CardIcon = card.icon;
                    return (
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                        <CardIcon className="w-4 h-4 text-gray-700" />
                      </div>
                    );
                  })()}
                </div>

                {/* Large value display */}
                {card.value && (
                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                      <span className="text-sm text-gray-500 font-medium">{card.unit}</span>
                    </div>
                    {card.subtitle && (
                      <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>
                    )}
                  </div>
                )}

                {/* Stats list */}
                {card.stats && (
                  <div className="space-y-2.5">
                    {card.stats.map((stat: any, i: number) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {StatIcon && <StatIcon className="w-3.5 h-3.5 text-gray-500" />}
                            <span className="text-xs text-gray-600 font-medium">{stat.label}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Decorative gradient line */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-[10px] bg-gradient-to-r ${card.gradient}`}
                  style={{ opacity: 0.3 }}
                />
              </motion.div>
            ))}

            {/* Pulse indicator */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
