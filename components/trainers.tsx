"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram, Twitter, Linkedin, Award, Calendar, Users, Star } from "lucide-react"

export default function Trainers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const trainers = [
    {
      name: "John Smith",
      role: "Strength & Conditioning",
      image: "/john-smith-trainer.png",
      bio: "With over 10 years of experience, John specializes in strength training and athletic performance.",
      experience: "10+ years",
      specialties: ["Strength Training", "HIIT", "Sports Performance"],
      certifications: ["NASM CPT", "CSCS"],
      socials: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Sarah Johnson",
      role: "Yoga & Pilates Instructor",
      image: "/female-yoga-instructor.png",
      bio: "Sarah is a certified yoga instructor with a passion for helping clients achieve balance and flexibility.",
      experience: "8 years",
      specialties: ["Yoga", "Pilates", "Meditation"],
      certifications: ["RYT-500", "PMA-CPT"],
      socials: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Mike Wilson",
      role: "Boxing Coach",
      image: "/male-boxing-coach.png",
      bio: "Former professional boxer Mike brings his expertise to help clients improve their fitness through boxing.",
      experience: "12 years",
      specialties: ["Boxing", "Kickboxing", "Self-Defense"],
      certifications: ["NASM CPT", "USA Boxing Coach"],
      socials: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Emma Davis",
      role: "Nutrition Specialist",
      image: "/female-nutrition-coach.png",
      bio: "Emma combines her knowledge of nutrition and fitness to create holistic health plans for clients.",
      experience: "7 years",
      specialties: ["Nutrition Planning", "Weight Management", "Sports Nutrition"],
      certifications: ["RD", "CSSD"],
      socials: {
        instagram: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="relative bg-white py-20 overflow-hidden" ref={ref}>
      {/* Animated circles */}
      <div className="absolute top-20 right-10 w-36 h-36 rounded-full bg-[#FF7512]/5 animate-pulse"></div>
      <div
        className="absolute bottom-40 left-10 w-52 h-52 rounded-full bg-[#FF7512]/10 animate-pulse"
        style={{ animationDuration: "7s" }}
      ></div>
      <div
        className="absolute top-40 left-20 w-28 h-28 rounded-full bg-blue-500/5 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-44 h-44 rounded-full bg-blue-500/10 animate-pulse"
        style={{ animationDuration: "5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Meet Our Expert Trainers</h2>
          <div className="w-20 h-1 bg-[#FF7512] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our team of certified fitness professionals is dedicated to helping you achieve your fitness goals. With
            diverse specialties and years of experience, they'll guide you every step of the way.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group border border-gray-200"
            >
              <div className="relative overflow-hidden">
                <div className="h-80 relative">
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Hover overlay with bio */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white mb-4">{trainer.bio}</p>
                    <div className="flex space-x-4">
                      <a
                        href={trainer.socials.instagram}
                        className="bg-white/20 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href={trainer.socials.twitter}
                        className="bg-white/20 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                      >
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href={trainer.socials.linkedin}
                        className="bg-white/20 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-[#FF7512] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {trainer.experience}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#FF7512] transition-colors duration-300">
                  {trainer.name}
                </h3>
                <p className="text-[#FF7512] font-medium mb-3">{trainer.role}</p>

                {/* Specialties and certifications */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-[#FF7512] mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((specialty, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#FF7512] mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book button */}
              <div className="px-6 pb-6">
                <button className="w-full bg-gray-100 hover:bg-[#FF7512] hover:text-white text-gray-800 font-medium py-2 rounded-lg transition-colors duration-300">
                  Book a Session
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex items-center">
            <div className="w-14 h-14 rounded-full bg-[#FF7512]/10 flex items-center justify-center mr-4">
              <Calendar className="h-7 w-7 text-[#FF7512]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">15+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex items-center">
            <div className="w-14 h-14 rounded-full bg-[#FF7512]/10 flex items-center justify-center mr-4">
              <Award className="h-7 w-7 text-[#FF7512]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">20+</div>
              <p className="text-gray-600">Certified Trainers</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex items-center">
            <div className="w-14 h-14 rounded-full bg-[#FF7512]/10 flex items-center justify-center mr-4">
              <Users className="h-7 w-7 text-[#FF7512]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">1000+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
