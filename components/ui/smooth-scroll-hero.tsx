"use client"

import type * as React from "react"
import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { MapPin, Users, Calendar, Trophy, Phone, Mail, ChevronRight, Instagram, Facebook, Twitter, Linkedin, Heart } from "lucide-react"

interface SmoothScrollHeroProps {
  scrollHeight?: number
  desktopImage?: string
  mobileImage?: string
  initialClipPercentage?: number
  finalClipPercentage?: number
}

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Programs", href: "#" },
  { name: "Contact", href: "#" },
]

const services = [
  { name: "Personal Training", href: "#" },
  { name: "Nutrition Guidance", href: "#" },
  { name: "Group Classes", href: "#" },
  { name: "Wellness Workshops", href: "#" },
]

const SmoothScrollHeroWithFooter: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1875,
  desktopImage = "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80",
  mobileImage = "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  const backgroundSize = useTransform(scrollYProgress, [0, 0.7], ["170%", "100%"])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.2, 1])

  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  return (
    <>
      {/* Hero Section */}
      <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
        <motion.div
          className="sticky top-0 h-screen w-full bg-black overflow-hidden"
          style={{ clipPath, willChange: "transform" }}
        >
          {/* Desktop background */}
          <motion.div
            className="absolute inset-0 hidden md:block grayscale"
            style={{
              backgroundImage: `url(${desktopImage})`,
              backgroundSize,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              scale,
            }}
          />
          {/* Mobile background */}
          <motion.div
            className="absolute inset-0 md:hidden grayscale"
            style={{
              backgroundImage: `url(${mobileImage})`,
              backgroundSize,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              scale,
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* CTA Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <div className="text-center text-white max-w-4xl mx-auto px-6">

              {/* Main Heading */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-header tracking-wider mb-6 leading-none">
                WHERE MOVEMENT
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  MEETS MINDFULNESS
                </span>
              </h2>

              {/* Subheading */}
              <p className="text-lg md:text-xl lg:text-2xl font-header text-gray-200 mb-8 leading-relaxed font-medium">
                Intokine blends sports, martial arts, fitness, nutrition, psychology,
                <br className="hidden md:block" />
                and lifestyle design to help you reconnect with your highest potential.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">10K+</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">Transformed Lives</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">20+</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">Holistic Disciplines</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">365</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">Days of Growth</div>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">100%</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">Holistic Approach</div>
                </div>

              </div>

              {/* CTA Button */}
              <button className="font-bold text-xl tracking-wide px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white border-2 border-gray-900 hover:scale-105 transition-all duration-300 rounded-full">
                EXPLORE INTOKINE
              </button>

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">

          {/* CTA Glass Section */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 font-medium">
                  Join intokine and start your fitness journey today
                </p>
              </div>
              {/* <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button> */}
            </div>
          </div>

          {/* Footer Main */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Company Info */}
            <div className="space-y-6">
              <div>
                {/* <h3 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  IntoKine
                </h3> */}
                <img src="./images/intokine_full_name_logo.png" style={{ width: '200px' , height: 'auto'}}></img>
                <p className="text-sm text-gray-400 font-medium">
                  Healthy Fitness Team
                </p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering individuals to achieve their fitness goals through personalized training, nutrition guidance, and unwavering support.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 group"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 group"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {service.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Visit Us</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      123 Fitness Avenue, Health District, HD 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Call Us</p>
                    <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Email Us</p>
                    <p className="text-sm text-gray-400">hello@intokine.com</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2025 IntoKine. All rights reserved. Built with <Heart className="w-4 h-4 inline text-red-500 fill-red-500" /> by the Healthy Fitness Team
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default SmoothScrollHeroWithFooter
