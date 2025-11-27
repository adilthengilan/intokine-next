"use client";

import HeroSection from "../hero-section";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { Timeline } from "@/components/ui/timeline";
import "./globals.css";
import { motion } from "framer-motion";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import Chatbot from "../components/chatbot";
import AppBrandingSection from "@/components/app-branding-section";
import { CoachesSection } from "@/components/coaches-section";
import RunCategoriesSection from "@/components/run-categories-section";
import { AppPromotionSection } from "@/components/app-promotion-section";
import { FeaturesSection } from "@/components/features-section";
import { PremiumTestimonials } from "@/components/premium-testimonials";
import { SportsTrackingSection } from "@/components/sports-tracking-section";
import LocationsSection from "@/components/locations-section";
import { prisma } from "@/lib/prisma";

export default function Page() {
  const missionStatement =
    "Founded on the belief that true wellness comes from balance — Intokine bridges the worlds of performance training and human development.We blend ancient movement practices with modern training science to build not only stronger bodies but also resilient, adaptable, and self-aware individuals.";

 const timelineEntries = [
  {
    id: 1,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RJ3iTXUn5SUexF6nHMZYhMoQLNCboK.png",
    alt: "Zaki – The Intokine Wellness System",
    title: "ZAKI – The Intokine Wellness System",
    description: `
Zaki is our flagship holistic wellness program — a complete journey of physical, mental, and emotional transformation.

Combining fitness, mindfulness, nutrition, and mindset coaching, Zaki helps you reconnect with your body, reset your habits, and restore balance in your everyday life.

Includes:
• Physical fitness training & mobility practice
• Personalized nutrition & recovery guidance
• Mental health and emotional resilience sessions
• Lifestyle structure & goal alignment support

Outcome: A grounded, stronger, and more self-aware version of you — living with clarity and purpose.
    `,
    layout: "left" as const,
  },

  {
    id: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LN9OPh9hw0b9rwSPRSslHoejcfoKHe.png",
    alt: "Calisthenics Training",
    title: "Calisthenics Training",
    description: `
Master your own bodyweight through strength, control, and creativity.

Our Calisthenics Program builds functional strength, mobility, and coordination — from fundamentals to advanced bodyweight skills.

Focus Areas:
• Progressive bodyweight strength
• Core stability and endurance
• Movement flow and balance

Outcome: Power, precision, and full control over your body.
    `,
    layout: "right" as const,
  },

  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1FdGyjVpWQANGzsDWpoPIvF5SVI2za.png",
    alt: "Martial Arts",
    title: "Martial Arts",
    description: `
Discipline the mind, condition the body, and find your flow through martial practice.

We blend traditional and modern martial arts — including kickboxing, kung fu, and combat movement — to develop both physical resilience and mental sharpness.

Focus Areas:
• Striking, defense, and movement flow
• Mind-body coordination
• Emotional control and confidence

Outcome: A warrior mindset built on discipline, focus, and respect.
    `,
    layout: "left" as const,
  },

  {
    id: 4,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RJ3iTXUn5SUexF6nHMZYhMoQLNCboK.png",
    alt: "Animal Flow",
    title: "Animal Flow",
    description: `
Animal Flow is a ground-based bodyweight movement system that blends quadrupedal locomotion, mobility drills, positional isometrics, and fluid transitions to build strength, stability, and body control.

It develops full-body coordination and proprioception.

• Builds core stability and hip/shoulder resilience through load-bearing positions.
• Improves mobility and joint health in functional ranges.
• Trains movement efficiency and fluidity rather than isolated muscles.
    `,
    layout: "right" as const,
  },

  {
    id: 5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LN9OPh9hw0b9rwSPRSslHoejcfoKHe.png",
    alt: "Functional Movement Training",
    title: "Functional Movement Training",
    description: `
Move better to live better.

This program focuses on improving your everyday movement efficiency, posture, and joint stability — blending training science with human movement principles.

Focus Areas:
• Mobility, balance, and coordination
• Injury prevention & posture correction
• Real-world performance movement

Outcome: Enhanced functionality and freedom of motion in all aspects of life.
    `,
    layout: "left" as const,
  },

  {
    id: 6,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1FdGyjVpWQANGzsDWpoPIvF5SVI2za.png",
    alt: "Strength & Conditioning",
    title: "Strength & Conditioning",
    description: `
Engineered for athletes and everyday performers alike.

Our Strength & Conditioning Program builds endurance, power, and athletic capacity — the foundation of high-level physical performance.

Focus Areas:
• Power development and hypertrophy
• Endurance and conditioning systems
• Recovery optimization

Outcome: Peak strength, improved stamina, and high-performance capability.
    `,
    layout: "right" as const,
  },

  {
    id: 7,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RJ3iTXUn5SUexF6nHMZYhMoQLNCboK.png",
    alt: "Mental Health Support",
    title: "Mental Health Support",
    description: `
True strength starts within.

Our Mental Health Support program integrates emotional awareness, mindset training, and stress management to help you build resilience, focus, and peace of mind.

Focus Areas:
• Emotional intelligence & mindfulness
• Stress reduction and self-awareness
• Goal alignment and motivation systems

Outcome: A calmer, more focused, and mentally balanced you.
    `,
    layout: "left" as const,
  },

  {
    id: 8,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LN9OPh9hw0b9rwSPRSslHoejcfoKHe.png",
    alt: "Ventures Development Training",
    title: "Ventures Development Training",
    description: `
Train not just for the body — but for life.

This Intokine module develops leadership, creativity, and performance in real-world ventures — ideal for athletes, entrepreneurs, and community leaders.

Focus Areas:
• Leadership and purpose-driven growth
• Teamwork, communication, and innovation
• Resilience and adaptability

Outcome: A mindset built for progress — professionally and personally.
    `,
    layout: "right" as const,
  },

  {
    id: 9,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1FdGyjVpWQANGzsDWpoPIvF5SVI2za.png",
    alt: "Nutrition & Lifestyle Coaching",
    title: "Nutrition & Lifestyle Coaching",
    description: `
Fuel your movement with precision.

Our Nutrition Program teaches you how to eat, recover, and live for long-term vitality — no crash diets, just conscious nourishment.

Focus Areas:
• Personalized nutrition planning
• Performance-based eating strategies
• Recovery and lifestyle optimization

Outcome: Sustainable health and energy that supports your training and life goals.
    `,
    layout: "left" as const,
  },
];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Location Section */}
      <LocationsSection />

      {/* App Branding Section */}
      <AppBrandingSection />

      {/* Mission Statement Section with Grid Background */}
      <section
        id="mission"
        className="relative min-h-screen flex items-center justify-center py-20 bg-white"
      >
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    viewport={{ once: false, margin: '-100px' }}
    className="text-4xl md:text-6xl tracking-wider mb-12 text-gray-900"
    style={{ fontFamily: 'Swiss721BT Bold Condensed, sans-serif', fontWeight: 700 }}
  >
    About Intokine
  </motion.h2>

  <TextGradientScroll
    text={missionStatement}
    className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800"
    // style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
    type="word"
    textOpacity="soft"
  />
</div>

        </motion.div>
      </section>

      {/* Run Categories Section */}
      <RunCategoriesSection />

      {/* Timeline Section */}
      <section id="community" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">
                Experiences
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                At Intokine, we don’t just train.
We redefine how you move, think, and live.
              </p>
            </motion.div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* Coaches Section */}
      <CoachesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Sports Tracking Section */}
      <SportsTrackingSection />

      {/* App Promotion Section */}
      <AppPromotionSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-center mb-16"
          >
            {/* <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              See what our{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                RUNNERS
              </span>{" "}
              say.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Real stories from real runners who found their stride with Wadada
              Run Club.
            </p> */}
          </motion.div>

          <PremiumTestimonials />
        </div>
      </section>

      {/* Smooth Scroll Hero with CTA Overlay */}
      <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={4500}
          desktopImage="/images/runners-motion-blur.png"
          mobileImage="/images/runners-motion-blur.png"
          initialClipPercentage={40}
          finalClipPercentage={80}
        />
      </section>
      {/* <Chatbot /> */}
    </div>
  );
}
