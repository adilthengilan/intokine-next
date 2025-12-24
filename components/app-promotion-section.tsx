
"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MessageCircle, Send } from "lucide-react"

export function AppPromotionSection() {
  const [showContact, setShowContact] = useState(false)
  const [formData, setFormData] = useState({ email: "", phone: "", message: "" })
  const containerRef = useRef<HTMLDivElement>(null)

  const appImages = [
    "./images/app ui-1 (1).png",
    "./images/app ui-1 (2).png",
    "./images/app ui-1 (3).png",
    "./images/app ui-1 (4).png",
  ]

  const contactOptions = [
    { label: "Email", icon: Mail, href: "mailto:support@wadada.com" },
    { label: "WhatsApp", icon: MessageCircle, href: "#" },
    { label: "Phone", icon: Phone, href: "tel:+1234567890" },
    { label: "Discord", icon: MessageCircle, href: "#" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 bg-white overflow-hidden"
    >
      {/* Subtle gradient orbs - grayscale */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-gray-300/30 to-gray-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
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
        {/* Main Title */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-6 py-2 bg-black text-white text-xs tracking-widest rounded-full"
          >
            MOBILE APP
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Experience the{" "}
            <span className="text-gray-900">App</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Discover all the powerful features that make your running journey extraordinary
          </p>
        </motion.div>

        {/* App Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {appImages.map((image, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div 
                className="relative h-96 rounded-[10px] overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{
                  boxShadow: "0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 40px 100px rgba(0, 0, 0, 0), 0 20px 50px rgba(0, 0, 0, 0)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)";
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + idx * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={image || "/placeholder.svg?height=400&width=300&query=app-ui"}
                    alt={`App Screen ${idx + 1}`}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                </motion.div>
                
                {/* White border on hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-[10px] transition-all duration-500" />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-white/0 border-r-transparent group-hover:border-t-white/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <motion.div className="flex justify-center mb-24">
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold rounded-[10px] shadow-xl hover:shadow-2xl transition-all duration-300"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              Download App Now
            </span>
          </motion.button>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg mb-8 font-light">Want to know more?</p>
            
            {/* Animated Get In Touch Button */}
            <motion.button
              onClick={() => setShowContact(!showContact)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-[10px] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="relative px-12 py-5 bg-gradient-to-r from-gray-900 to-black text-white font-bold text-3xl rounded-[10px] border-2 border-white/10 shadow-2xl"
                animate={showContact ? {} : {
                  boxShadow: [
                    "0 0 20px rgba(0, 0, 0, 0.3)",
                    "0 0 40px rgba(0, 0, 0, 0.5)",
                    "0 0 20px rgba(0, 0, 0, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Get In Touch
                </motion.span>
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {showContact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Quick Contact Options */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Connect</h3>
                    {contactOptions.map((option, idx) => {
                      const Icon = option.icon;
                      return (
                        <motion.a
                          key={idx}
                          href={option.href}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          whileHover={{ x: 8, scale: 1.02 }}
                          className="group flex items-center gap-4 p-5 rounded-[10px] bg-white/90 backdrop-blur-xl border border-gray-300/60 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-lg">{option.label}</p>
                            <p className="text-sm text-gray-600">Connect instantly</p>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      );
                    })}
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-xl bg-white/90 border border-gray-300/60 rounded-[10px] p-8 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-[10px] border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-all duration-300 bg-white/70"
                          placeholder="your@email.com"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-[10px] border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-all duration-300 bg-white/70"
                          placeholder="+1 (555) 000-0000"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 rounded-[10px] border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-all duration-300 resize-none bg-white/70"
                          placeholder="Tell us how we can help..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold rounded-[10px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}