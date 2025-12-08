"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const LOCATIONS = [
  {
    id: 1,
    name: "Kingston Hub",
    address: "123 Main Street, Kingston",
    phone: "+1 (876) 555-0101",
    email: "kingston@wadadarun.com",
    hours: "Mon-Sat: 6AM - 8PM, Sun: 7AM - 6PM",
    programs: ["Personal Training", "Batch Training", "Ladies Programs"],
    image: "/running-group-training-outdoor.jpg",
  },
  {
    id: 2,
    name: "Miami Facility",
    address: "456 Beach Ave, Miami, FL",
    phone: "+1 (305) 555-0202",
    email: "miami@wadadarun.com",
    hours: "Mon-Fri: 5AM - 9PM, Sat-Sun: 7AM - 7PM",
    programs: ["Personal Training", "Batch Training", "Partner Training"],
    image: "/indoor-gym-training-fitness.jpg",
  },
  {
    id: 3,
    name: "Online Platform",
    address: "Available Worldwide",
    phone: "+1 (876) 555-0303",
    email: "online@wadadarun.com",
    hours: "24/7 Access",
    programs: ["Online Personal Training", "Online Batch Training", "Online Partner Training"],
    image: "/community-runners-celebration-finish-line.jpg",
  },
]

export default function LocationsSection() {
  return (
    <section className="py-20 md:py-32 bg-black grain-overlay vignette">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-wider text-white mb-6 text-balance">
            FIND US ANYWHERE
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Train where it's convenient for you – in our state-of-the-art facilities or online
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {LOCATIONS.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden bg-gray-950 hover:shadow-2xl transition-all duration-300 grain-overlay border border-gray-800"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${location.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{location.name}</h3>

                <div className="space-y-4 mb-6">
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-300">{location.address}</p>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    <Phone className="w-5 h-5 text-white flex-shrink-0" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {location.phone}
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Mail className="w-5 h-5 text-white flex-shrink-0" />
                    <a
                      href={`mailto:${location.email}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {location.email}
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <Clock className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-300">{location.hours}</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="pt-4 border-t border-gray-700"
                >
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3">Available Programs</p>
                  <div className="flex flex-wrap gap-2">
                    {location.programs.map((program, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full"
                      >
                        {program}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Get Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
