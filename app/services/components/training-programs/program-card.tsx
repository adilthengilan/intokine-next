// app/services/components/training-programs/program-card.tsx
"use client";

import { motion } from "framer-motion";

interface ProgramCardProps {
  program: {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    items: Array<{ name: string; desc: string }>;
    color: string;
  };
  index: number;
}

export default function ProgramCard({ program, index }: ProgramCardProps) {
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
          <h3 className="text-3xl md:text-4xl font-black tracking-wider mb-4">
            {program.title}
          </h3>
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
  );
}
