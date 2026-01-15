"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import CTASection from "@/components/cta-section";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import LocationsSection from "@/components/locations-section";
import ModernServices from "../components/services";
import Header from "../components/header";

export default function ServicesPageClient() {
  const timelineEntries = [
    {
      id: 1,
      image: "/running-group-training-outdoor.jpg",
      alt: "Outdoor training session with group",
      title: "Run Strong,",
      description:
        "Join our outdoor training sessions and build endurance with our expert coaches.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/indoor-gym-training-fitness.jpg",
      alt: "Indoor training facility",
      title: "Train Smart.",
      description:
        "Our state-of-the-art indoor training facilities provide year-round access.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "/personal-trainer-one-on-one-coaching.jpg",
      alt: "Personal training coaching",
      title: "Achieve More.",
      description:
        "Get personalized coaching tailored to your goals.",
      layout: "left" as const,
    },
    {
      id: 4,
      image: "/community-runners-celebration-finish-line.jpg",
      alt: "Community celebration",
      title: "Run Together.",
      description:
        "Be part of a global community of runners.",
      layout: "right" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white grain-base">
      <Header />

      {/* HERO */}
      <section className="relative h-96 md:h-screen flex items-center justify-center bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/image.png')` }}
        />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-header"
          >
            TRAIN YOUR WAY
          </motion.h1>
        </div>
      </section>

      <ModernServices />
      <LocationsSection />
      <Timeline entries={timelineEntries} />
      <CTASection />

      <section id="join">
        <SmoothScrollHero
          scrollHeight={1500}
          desktopImage="/images/runners-motion-blur.png"
          mobileImage="/images/runners-motion-blur.png"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>
    </div>
  );
}
