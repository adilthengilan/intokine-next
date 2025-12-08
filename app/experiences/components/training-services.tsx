"use client";

import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function TrainingServices() {
  const services = [
    {
      id: "personal",
      title: "Personal Training",
      subtitle: "One-on-one coaching tailored to your goals",
      items: [
        {
          name: "Online Personal Training",
          description:
            "Train remotely with real-time feedback from your dedicated coach. Perfect for flexible schedules and personalized attention regardless of location.",
          details:
            "Includes weekly video calls, custom training plans, nutrition guidance, and progress tracking through our app.",
        },
        {
          name: "Offline Indoor Personal Training",
          description:
            "Private coaching sessions in our state-of-the-art indoor training facility. Access to premium equipment and climate-controlled environment.",
          details:
            "Located in Kingston and Miami. Includes strength training, speed work, and recovery protocols designed specifically for runners.",
        },
        {
          name: "Offline Outdoor Personal Training",
          description:
            "Experience training where it matters most - on the streets and trails. Feel the real-world conditions with expert guidance.",
          details:
            "Routes through scenic areas with elevation work, tempo training, and natural terrain running. Available year-round.",
        },
      ],
    },
    {
      id: "batch",
      title: "Batch Training",
      subtitle: "Group training for community building and motivation",
      items: [
        {
          name: "Offline Outdoor Batch Training",
          description:
            "Group running sessions on scenic routes and trails. Build community while pushing your limits together.",
          locations: [
            "Kingston: Hope Gardens Park (Tuesdays & Thursdays, 6 AM & 4 PM)",
            "Negril: Seven Mile Beach (Saturdays, 7 AM)",
            "Montego Bay: Hip Strip (Wednesdays, 5:30 PM)",
          ],
          details:
            "Mixed ability groups, experienced coaches, and post-run community gathering.",
        },
        {
          name: "Offline Indoor Batch Training",
          description:
            "Group training sessions in our facility with structured workouts for all levels.",
          locations: [
            "Kingston Indoor Studio: Speed & strength focused (Mon/Wed/Fri, 6 AM & 5 PM)",
            "Miami Indoor Studio: Interval & endurance work (Tues/Thurs, 6 AM & 4 PM)",
          ],
          details:
            "Climate-controlled, state-of-the-art equipment, certified coaches, and supportive community.",
        },
        {
          name: "Online Batch Training",
          description:
            "Join live group training sessions from anywhere. Interactive coaching with real-time adjustments.",
          details:
            "Sunday 8 AM EST - Long run coaching session (60-90 min). Tuesday & Thursday 6:30 AM EST - Speed work sessions (45 min). Full community chat and accountability partners.",
        },
      ],
    },
    {
      id: "ladies",
      title: "Ladies Specialized Training",
      subtitle: "Programs designed for women runners by women coaches",
      items: [
        {
          name: "Ladies Offline Personal Training",
          description:
            "One-on-one coaching specifically designed for women runners. Focus on injury prevention, hormonal cycle optimization, and confidence building.",
          details:
            "Female coaches with expertise in women's sports science. Includes pelvic floor health, bone density, and recovery strategies.",
        },
        {
          name: "Ladies Online Personal Training",
          description:
            "Flexible online coaching with female specialists. Track your cycle, optimize performance, and get personalized advice.",
          details:
            "Monthly nutrition plans, yoga & mobility work, mental performance coaching, and 24/7 support via messaging.",
        },
        {
          name: "Ladies Indoor Batch Training",
          description:
            "Group training exclusively for women in a supportive, empowering environment.",
          locations: [
            "Kingston: Monday & Wednesday, 5:30 PM - Strength & power focus",
            "Miami: Tuesday & Thursday, 6:30 AM - Mixed distances",
          ],
          details:
            "Female-only sessions, experienced women coaches, mentorship opportunities, and strong community.",
        },
      ],
    },
    {
      id: "partner",
      title: "Partner Based Training",
      subtitle: "Train with a partner and stay accountable together",
      items: [
        {
          name: "Online Partner Training",
          description:
            "Train with a friend or family member remotely. Shared coaching, accountability, and motivation.",
          details:
            "Duo discount pricing, synchronized workouts, joint progress tracking, and couple/friend challenges.",
        },
        {
          name: "Offline Indoor Partner Training",
          description:
            "Train side-by-side with a partner in our facility. Competition-inspired workouts with personalized coaching.",
          details:
            "Partner-specific warmups and cool-downs, competitive intervals, and performance comparisons.",
        },
        {
          name: "Offline Outdoor Partner Training",
          description:
            "Run together on the roads and trails with coaching for both runners.",
          details:
            "Synchronized pacing, relay-style workouts, hill repeats together, and adventure running.",
        },
      ],
    },
    {
      id: "kids",
      title: "Kids Training Programs",
      subtitle: "Building the next generation of runners",
      items: [
        {
          name: "Coming Soon",
          description:
            "We're developing comprehensive training programs for young runners aged 8-18.",
          details:
            "Programs will include fun, age-appropriate workouts, injury prevention, and confidence building. Sign up to our newsletter for updates.",
        },
      ],
    },
  ];
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="relative py-20 bg-white">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
            TRAINING PROGRAMS
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the perfect training approach for your lifestyle and goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="border-l-4 border-gray-900 pl-6">
                <h3 className="text-3xl md:text-4xl font-black tracking-wider text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600">
                  {service.subtitle}
                </p>
              </div>

              <Accordion
                type="single"
                collapsible
                className="bg-gray-50 rounded-lg border border-gray-200 px-6"
              >
                {service.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${service.id}-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline group">
                      <div className="text-left">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                          {item.description}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-700">
                      <div className="space-y-4 mt-4 bg-white rounded p-4">
                        {item.locations && (
                          <div>
                            <h5 className="font-bold text-gray-900 mb-3">
                              Locations & Schedule:
                            </h5>
                            <ul className="space-y-2">
                              {item.locations.map((location, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-gray-900 font-bold mr-3">
                                    •
                                  </span>
                                  <span>{location}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2">
                            What's Included:
                          </h5>
                          <p className="text-gray-700 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Ready to start your journey with Wadada Run Club?
          </p>
          <a
            href="#join"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-bold tracking-wider hover:bg-gray-800 transition-colors duration-300"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
