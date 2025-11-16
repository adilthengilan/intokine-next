"use client"

import { motion, Variants, Easing } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Feature {
  id: number
  title: string
  description: string
  span?: "full" | "half" | "standard"
}

const features: Feature[] = [
  {
    id: 1,
    title: "Real-time Tracking",
    description: "Get deep insights into your running performance with comprehensive analytics and real-time tracking.",
    span: "full",
  },
  {
    id: 2,
    title: "Community Running",
    description: "Join group runs and connect with runners nearby.",
    span: "standard",
  },
  {
    id: 3,
    title: "Lightning Fast",
    description: "99.9% uptime guaranteed.",
    span: "half",
  },
  {
    id: 4,
    title: "Bank-level Security",
    description: "End-to-end encryption with compliance certifications for maximum security.",
    span: "half",
  },
  {
    id: 5,
    title: "Train Smarter Globally",
    description:
      "Access personalized training plans from world-class coaches and deploy workouts globally with our infrastructure.",
    span: "full",
  },
]

// Custom easing array typed as Framer Motion Easing
const customEase: Easing = [0.16, 1, 0.3, 1]

export function FeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: customEase,
      },
    },
  }

  const getSpanClass = (span?: string) => {
    switch (span) {
      case "full":
        return "col-span-1 md:col-span-2"
      case "half":
        return "col-span-1"
      default:
        return "col-span-1"
    }
  }

  return (
    <section ref={ref} className="relative py-20 bg-white">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
            POWERFUL FEATURES
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to take your running to the next level.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`group relative ${getSpanClass(
                feature.span
              )} rounded-2xl overflow-hidden cursor-pointer`}
            >
              {/* Glass Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Card Content */}
              <div className="relative p-8 md:p-12 min-h-64 flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl group-hover:border-red-200 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-red-100">
                {/* Top Section */}
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-cyan-100 mb-6 group-hover:shadow-md transition-all">
                    <span className="text-xs font-semibold tracking-widest bg-gradient-to-r from-red-600 to-cyan-600 bg-clip-text text-transparent">
                      FEATURE
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>
                </div>

                {/* Bottom Section */}
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-cyan-100 opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-300 pointer-events-none -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
