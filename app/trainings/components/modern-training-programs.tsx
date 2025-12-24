"use client"

import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

interface ProgramCardProps {
  program: {
    id: string
    title: string
    subtitle: string
    image: string
    items: Array<{ name: string; desc: string }>
    color: string
  }
  index: number
}

function ProgramCard({ program, index }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-96 md:h-[450px] rounded-2xl overflow-hidden cursor-pointer grain-overlay"
    >
      {/* Image Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${program.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
      />

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-sm md:text-base font-bold tracking-widest text-gray-300 mb-2 uppercase">
            {program.subtitle}
          </p>
          <h3 className="text-3xl md:text-4xl font-header tracking-wider mb-4">{program.title}</h3>
        </motion.div>

        {/* Items List with stagger */}
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {program.items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 group/item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-white rounded-full mt-2 group-hover/item:scale-150 transition-transform" />
              <div>
                <p className="font-bold text-sm md:text-base">{item.name}</p>
                <p className="text-xs md:text-sm text-gray-200">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start px-6 py-2 bg-white text-black font-bold rounded-lg text-sm md:text-base hover:bg-gray-200 transition-colors"
        >
          Learn More
        </motion.button>
      </div>

      {/* Hover Overlay Effect */}
      <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}

export default function ModernTrainingPrograms() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const programs = [
    {
      id: "personal",
      title: "Personal Training",
      subtitle: "One-on-One Coaching",
      image: "/personal-trainer-one-on-one-coaching.jpg",
      items: [
        { name: "Online Personal Training", desc: "Real-time feedback from your dedicated coach" },
        { name: "Indoor Personal Training", desc: "State-of-the-art facility in Kingston & Miami" },
        { name: "Outdoor Personal Training", desc: "Street and trail running with expert guidance" },
      ],
      color: "from-blue-600 to-blue-900",
    },
    {
      id: "batch",
      title: "Batch Training",
      subtitle: "Group Running Sessions",
      image: "/running-group-training-outdoor.jpg",
      items: [
        { name: "Outdoor Batch Training", desc: "Group sessions in scenic locations" },
        { name: "Indoor Batch Training", desc: "Structured workouts for all levels" },
        { name: "Online Batch Training", desc: "Live sessions with community interaction" },
      ],
      color: "from-purple-600 to-purple-900",
    },
    {
      id: "ladies",
      title: "Ladies Programs",
      subtitle: "Designed for Women Runners",
      image: "/community-runners-celebration-finish-line.jpg",
      items: [
        { name: "Ladies Personal Training", desc: "Female coaches with sports science expertise" },
        { name: "Ladies Online Training", desc: "Flexible coaching with cycle optimization" },
        { name: "Ladies Batch Training", desc: "Female-only supportive community" },
      ],
      color: "from-pink-600 to-pink-900",
    },
    {
      id: "partner",
      title: "Partner Training",
      subtitle: "Train With Your Friend",
      image: "/indoor-gym-training-fitness.jpg",
      items: [
        { name: "Online Partner Training", desc: "Train remotely with accountability" },
        { name: "Indoor Partner Training", desc: "Competitive-inspired workouts" },
        { name: "Outdoor Partner Training", desc: "Adventure running together" },
      ],
      color: "from-green-600 to-green-900",
    },
    {
      id: "kids",
      title: "Kids Programs",
      subtitle: "Coming Soon",
      image: "/runners-motion-blur.png",
      items: [{ name: "Kids Training", desc: "Age-appropriate workouts for young runners" }],
      color: "from-orange-600 to-orange-900",
    },
  ]

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-black overflow-hidden grain-overlay">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-small" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-header tracking-wider text-white mb-6">TRAINING PROGRAMS</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Choose your path. Master your pace. Own your journey.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg md:text-xl text-gray-400 mb-8">Ready to transform your running journey?</p>
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
  )
}
