import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface TimelineEntry {
  id: number
  image: string
  alt: string
  title: string
  description: string
  layout: "left" | "right"
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop",
    alt: "Foundation",
    title: "The Beginning",
    description: "Our journey started with a vision to transform how people experience digital products. We believed in creating something meaningful.",
    layout: "left"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop",
    alt: "Growth",
    title: "Rapid Growth",
    description: "As our community expanded, we doubled down on innovation and user experience, establishing ourselves as leaders in the industry.",
    layout: "right"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop",
    alt: "Innovation",
    title: "Breaking Barriers",
    description: "We pushed boundaries and introduced groundbreaking features that set new standards. Our commitment to excellence drove every decision.",
    layout: "left"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop",
    alt: "Future",
    title: "The Future",
    description: "Looking ahead, we continue to evolve and adapt. Our mission remains clear: empower users and create lasting impact.",
    layout: "right"
  }
]

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const isLeft = entry.layout === "left"

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-20 md:mb-32">
      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block" />

      <div className="container mx-auto px-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isLeft ? 'md:text-right' : ''}`}>
          <div className={`relative ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
            <div className="sticky top-20">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100">
                <img
                  src={entry.image}
                  alt={entry.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>

          <div className={`relative ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-gray-900">
                  {entry.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-lg">
                  {entry.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TimelineScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-gray-900">Timeline</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Story</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
          >
            Our Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore the milestones that shaped our story and continue to drive our vision forward
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div ref={containerRef} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2 hidden md:block" />
          
          {timelineData.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of others who have transformed their vision into reality
            </p>
            <button className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}