"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Page() {
  const [activeCategory, setActiveCategory] = useState(null)

  const timelineSteps = [
    {
      number: "01",
      title: "Your Journey Begins",
      content: "At Intokine Club, we believe fitness isn't one-size-fits-all. Whether you're chasing personal records, building endurance, or finding your community, we've designed programs that adapt to you."
    },
    {
      number: "02",
      title: "Our Approach",
      content: "We combine expert coaching, state-of-the-art facilities, and a supportive community to help you achieve more than you ever thought possible."
    },
    {
      number: "03",
      title: "Every Session Counts",
      content: "From sunrise outdoor runs to personalized training sessions, every program is crafted to push your limits while respecting your journey."
    },
    {
      number: "04",
      title: "Transform Your Life",
      content: "Join thousands of members who've transformed not just their fitness, but their entire lifestyle through dedication and community support."
    }
  ]

  const programs = [
    {
      id: 1,
      category: "OUTDOOR TRAINING",
      title: "Run Strong",
      image: "/running-group-training-outdoor.jpg",
      description: "Experience the freedom of running outdoors with our expert-led group sessions.",
      features: ["Group runs", "Trail running", "Endurance building", "Community support"],
      intensity: "Medium-High",
      duration: "60-90 min",
      iconImage: "/images/running-icon.png"
    },
    {
      id: 2,
      category: "INDOOR TRAINING",
      title: "Train Smart",
      image: "/indoor-gym-training-fitness.jpg",
      description: "Year-round access to cutting-edge facilities for structured strength and conditioning.",
      features: ["Strength training", "Speed work", "Recovery sessions", "Climate controlled"],
      intensity: "High",
      duration: "45-75 min",
      iconImage: "/images/strength-icon.png"
    },
    {
      id: 3,
      category: "PERSONAL COACHING",
      title: "Achieve More",
      image: "/personal-trainer-one-on-one-coaching.jpg",
      description: "One-on-one coaching tailored to your unique goals and current fitness level.",
      features: ["Custom programs", "Form analysis", "Goal setting", "Progress tracking"],
      intensity: "Customized",
      duration: "30-60 min",
      iconImage: "/images/coaching-icon.png"
    },
    {
      id: 4,
      category: "COMMUNITY RUNS",
      title: "Run Together",
      image: "/community-runners-celebration-finish-line.jpg",
      description: "Join a global community of runners who celebrate every milestone together.",
      features: ["Social runs", "Race prep", "Events & challenges", "Peer motivation"],
      intensity: "All Levels",
      duration: "30-120 min",
      iconImage: "/images/community-icon.png"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/image.png')`,
            filter: 'brightness(0.7)'
          }}
        />
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-header tracking-tight mb-6">
              TRAIN YOUR WAY
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 leading-relaxed">
              Choose the training style that fits your goals
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Timeline Introduction Section */}
        <section className="py-20 md:py-32 px-6 bg-white" aria-labelledby="intro-heading">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 id="intro-heading" className="text-5xl md:text-7xl font-header tracking-tight text-black mb-8">
                YOUR FITNESS,<br />YOUR RULES
              </h2>
              <div className="w-24 h-1 bg-black mx-auto" aria-hidden="true" />
            </motion.div>

            {/* Timeline */}
            <div className="relative" role="list" aria-label="Fitness journey timeline">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black/20 transform md:-translate-x-1/2" aria-hidden="true" />

              {timelineSteps.map((step, index) => (
                <motion.article
                  key={index}
                  role="listitem"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative mb-16 md:mb-24 ${
                    index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                  } md:w-1/2`}
                >
                  {/* Timeline Dot */}
                  <div 
                    className="absolute left-8 md:left-auto md:right-[-1.75rem] top-0 w-8 h-8 bg-black rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center transform md:translate-x-1/2"
                    aria-hidden="true"
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-neutral-50 p-8 border-l-4 border-black">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl md:text-6xl font-header text-black/10" aria-hidden="true">
                          {step.number}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-header tracking-tight text-black">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid Section */}
        <section className="py-20 bg-black px-6" aria-labelledby="programs-heading">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 id="programs-heading" className="text-4xl md:text-6xl font-header tracking-tight text-white mb-6">
                CHOOSE YOUR PATH
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Four distinct programs designed to meet you wherever you are in your fitness journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Training programs">
              {programs.map((program, index) => (
                <motion.article
                  key={program.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden bg-neutral-900 rounded-none cursor-pointer"
                  onMouseEnter={() => setActiveCategory(null)}
                  onMouseLeave={() => setActiveCategory(null)}
                  aria-labelledby={`program-${program.id}-title`}
                >
                  {/* Image Background */}
                  <div className="relative h-96 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${program.image})`,
                      }}
                      role="img"
                      aria-label={program.category || `${program.title} training session`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-6 left-6 w-16 h-16">
                      <img 
                        src={program.iconImage} 
                        alt={`${program.title} icon`}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <p className="text-sm font-bold tracking-widest text-gray-300 mb-2">
                        {program.category}
                      </p>
                      <h3 id={`program-${program.id}-title`} className="text-4xl font-header mb-4 tracking-tight">
                        {program.title}
                      </h3>
                      <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                        {program.description}
                      </p>
                      
                      {/* Details - Shown on hover */}
                      <div className={`transition-all duration-500 ${activeCategory === program.id ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                        <div className="border-t border-gray-600 pt-6 space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Intensity</span>
                            <span className="font-bold">{program.intensity}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Duration</span>
                            <span className="font-bold">{program.duration}</span>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-400 mb-3">What's Included:</p>
                            <ul className="grid grid-cols-2 gap-2" role="list">
                              {program.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full" aria-hidden="true" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-32 bg-white text-black px-6" aria-labelledby="benefits-heading">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 id="benefits-heading" className="text-4xl md:text-6xl font-header tracking-tight mb-6">
                WHY INTOKINE CLUB
              </h2>
              <div className="w-24 h-1 bg-black mx-auto" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12" role="list" aria-label="Club benefits">
              {[
                {
                  title: "Expert Coaching",
                  description: "Certified trainers with years of experience guiding athletes of all levels to reach their peak performance.",
                  iconImage: "/images/trophy-icon.png"
                },
                {
                  title: "Flexible Scheduling",
                  description: "Train on your terms with sessions available from dawn to dusk, seven days a week across all our locations.",
                  iconImage: "/images/clock-icon.png"
                },
                {
                  title: "Proven Results",
                  description: "Join thousands who've achieved their goals, from first 5K to ultramarathon, with our systematic approach.",
                  iconImage: "/images/chart-icon.png"
                }
              ].map((benefit, index) => (
                <motion.article
                  key={index}
                  role="listitem"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6">
                    <img 
                      src={benefit.iconImage} 
                      alt={`${benefit.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6 bg-black text-white" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 id="cta-heading" className="text-5xl md:text-7xl font-header tracking-tight mb-8">
                READY TO START?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Your journey to peak fitness begins with a single step. Join Intokine Club today 
                and discover what you're truly capable of achieving.
              </p>
              <button 
                className="bg-white text-black px-12 py-5 text-lg font-bold tracking-wider hover:bg-gray-100 transition-colors duration-300"
                aria-label="Join Intokine Club now"
              >
                JOIN NOW
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-header mb-4">INTOKINE CLUB</h3>
              <p className="text-gray-400 text-sm">
                Transform your fitness journey with expert coaching and community support.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <nav aria-label="Program links">
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#outdoor" className="hover:text-white transition-colors">Outdoor Training</a></li>
                  <li><a href="#indoor" className="hover:text-white transition-colors">Indoor Training</a></li>
                  <li><a href="#personal" className="hover:text-white transition-colors">Personal Coaching</a></li>
                  <li><a href="#community" className="hover:text-white transition-colors">Community Runs</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <nav aria-label="About links">
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#story" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#coaches" className="hover:text-white transition-colors">Meet the Coaches</a></li>
                  <li><a href="#locations" className="hover:text-white transition-colors">Locations</a></li>
                  <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="not-italic space-y-2 text-sm text-gray-400">
                <p>Email: info@intokineclub.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Follow us on social media</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Intokine Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}