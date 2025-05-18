"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function OurProcess() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const processSteps = [
    {
      id: "motivate",
      title: "MOTIVATE",
      description: "Find your inner strength and motivation with our supportive community and expert coaches.",
      image: "/process-motivate.png",
      alt: "Two women motivating each other during workout",
    },
    {
      id: "workout",
      title: "WORKOUT",
      description:
        "Follow our scientifically designed workout programs tailored to your specific goals and fitness level.",
      image: "/process-workout.png",
      alt: "Woman doing push-ups with dumbbells",
    },
    {
      id: "results",
      title: "RESULTS",
      description: "See real, measurable results as you transform your body and mind through consistent effort.",
      image: "/process-results.png",
      alt: "Woman showing fitness results at the gym",
    },
  ]

  return (
    <div className="relative bg-white py-20 overflow-hidden" ref={ref}>
      {/* Animated circles */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#FF7512]/5 animate-pulse"></div>
      <div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-[#FF7512]/10 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute top-40 right-40 w-24 h-24 rounded-full bg-blue-500/5 animate-pulse"
        style={{ animationDuration: "7s" }}
      ></div>
      <div
        className="absolute bottom-20 left-40 w-40 h-40 rounded-full bg-blue-500/10 animate-pulse"
        style={{ animationDuration: "5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h3 className="text-2xl text-[#FF7512] font-medium mb-4">Our Process</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-wider mb-8 text-black">
            CHANGE YOUR HABITS FOR BETTER
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-lg md:text-xl">
            A big change starts with a small step. Our expert team will create a special program following your health
            and body needs. Start it now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 50 : 0 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 50 : 0 }
              }
              transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
              className="relative z-10 mb-16 md:mb-0 group"
            >
              {/* Process step card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Image container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FF7512] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-3xl font-black mb-3 tracking-wider text-black">{step.title}</h3>
                  <div className="w-12 h-1 bg-[#FF7512] mb-4"></div>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connecting line for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-32 -right-4 w-8 border-t-2 border-dashed border-gray-300 z-0"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <button className="bg-[#FF7512] hover:bg-[#e66a0f] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            START YOUR JOURNEY TODAY
          </button>
        </motion.div>
      </div>
    </div>
  )
}
