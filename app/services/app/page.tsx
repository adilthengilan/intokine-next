// app/services/app/page.tsx
"use client";

import { motion } from "framer-motion";
import TestimonialsSection from "@/components/testimonials-section";
import { Timeline } from "@/components/ui/timeline";
import CTASection from "@/components/cta-section";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import Chatbot from "../components/chatbot";
import LocationsSection from "@/components/locations-section";
import ModernTrainingPrograms from "../components/training-programs";
import Header from "../components/header";

export default function Page() {
  const timelineEntries = [
    {
      id: 1,
      image: "/running-group-training-outdoor.jpg",
      alt: "Outdoor training session with group",
      title: "Run Strong,",
      description:
        "Join our outdoor training sessions and build endurance with our expert coaches. Experience the freedom of running with a supportive community that pushes you to your limits.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/indoor-gym-training-fitness.jpg",
      alt: "Indoor training facility",
      title: "Train Smart.",
      description:
        "Our state-of-the-art indoor training facilities provide year-round access to structured workouts. Perfect for conditioning, speed work, and recovery sessions.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "/personal-trainer-one-on-one-coaching.jpg",
      alt: "Personal training coaching",
      title: "Achieve More.",
      description:
        "Get personalized coaching tailored to your goals. Our certified trainers create custom programs that maximize your performance and help you reach new personal records.",
      layout: "left" as const,
    },
    {
      id: 4,
      image: "/community-runners-celebration-finish-line.jpg",
      alt: "Community celebration",
      title: "Run Together.",
      description:
        "Be part of a global community of runners. Share experiences, celebrate victories, and grow together as we chase our running dreams.",
      layout: "right" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white grain-base">
      {/* Header Navigation */}
      <Header />

      <section className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden bg-black grain-overlay vignette">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/image.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-7xl font-header tracking-wider mb-4 text-balance">
              TRAIN YOUR WAY
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-wide text-gray-200">
              Choose the training style that fits your goals
            </p>
          </motion.div>
        </div>
      </section>

      <ModernTrainingPrograms />

      <LocationsSection />

      <section className="py-20 md:py-32 bg-white grain-overlay">
        <div className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-subheader tracking-wider text-black mb-6 text-balance">
              OUR JOURNEY
            </h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              From passion to excellence – explore the milestones that make
              Intokine Club special
            </p>
          </motion.div>
        </div>
        <Timeline entries={timelineEntries} />
      </section>

      {/* <TestimonialsSection /> */}

      <CTASection />

      {/* Smooth Scroll CTA */}
      <section id="join" className="relative grain-overlay">
        <SmoothScrollHero
          scrollHeight={1500}
          desktopImage="/images/runners-motion-blur.png"
          mobileImage="/images/runners-motion-blur.png"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>

      {/* <Chatbot /> */}
    </div>
  );
}
