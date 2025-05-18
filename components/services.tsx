"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Dumbbell, Users, Heart, Clock, Award, Zap } from "lucide-react"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      icon: <Dumbbell className="h-10 w-10 text-white" />,
      title: "Strength Training",
      description:
        "Build muscle, increase strength, and boost your metabolism with our comprehensive strength training programs.",
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Group Classes",
      description:
        "Join our energetic group classes, from HIIT to yoga, designed to motivate and challenge you in a supportive environment.",
    },
    {
      icon: <Heart className="h-10 w-10 text-white" />,
      title: "Cardio Fitness",
      description:
        "Improve your heart health and endurance with our state-of-the-art cardio equipment and specialized programs.",
    },
    {
      icon: <Clock className="h-10 w-10 text-white" />,
      title: "24/7 Access",
      description:
        "Exercise on your schedule with round-the-clock access to our facilities, perfect for early birds and night owls alike.",
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Personal Training",
      description:
        "Get customized workout plans and one-on-one guidance from our certified personal trainers to reach your goals faster.",
    },
    {
      icon: <Zap className="h-10 w-10 text-white" />,
      title: "Nutrition Coaching",
      description:
        "Complement your fitness routine with expert nutrition advice tailored to your specific needs and goals.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="container mx-auto px-4 relative z-10" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <div className="w-20 h-1 bg-[#FF7512] mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-300">
          Discover our comprehensive range of fitness services designed to help you achieve your health and wellness
          goals.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
            className="bg-gray-900 rounded-lg p-6 shadow-md transition-all duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
