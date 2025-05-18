"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  isHovered: boolean
  onHover: React.MouseEventHandler
  onLeave: React.MouseEventHandler
  index: number
}

const Feature = ({ icon, title, description, isHovered, onHover, onLeave, index }: FeatureProps) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-xs mx-auto"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative mb-8">
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-[#FF7512]/10 rounded-full -m-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className={`relative z-10 w-28 h-28 flex items-center justify-center`}>{icon}</div>
      </div>
      <h3
        className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isHovered ? "text-[#FF7512]" : "text-gray-800"}`}
      >
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default function WhatWeOffer() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      id: "trainers",
      icon: (
        <div className="w-24 h-24 relative">
          <Image
            src="/trainer-icon.png"
            alt="Skilled Trainers"
            width={96}
            height={96}
            className={`transition-all duration-300 ${hoveredFeature === "trainers" ? "filter brightness-100 sepia-[.25] hue-rotate-[340deg] saturate-[2]" : ""}`}
          />
        </div>
      ),
      title: "Skilled Trainers",
      description:
        "Pellentesque donec in sit placerat tellus. Morbi fermentum non egestas ipsum at commodo semper. Tempor.",
    },
    {
      id: "equipment",
      icon: (
        <div className="w-24 h-24 relative">
          <Image
            src="/equipment-icon.png"
            alt="Quality Equipment"
            width={96}
            height={96}
            className={`transition-all duration-300 ${hoveredFeature === "equipment" ? "filter brightness-100 sepia-[.25] hue-rotate-[340deg] saturate-[2]" : ""}`}
          />
        </div>
      ),
      title: "Quality Equipment",
      description: "Dui consequat ante lectus risus. Dictum ac sodales nunc etiam. Sit lectus diam a nullam egestas.",
    },
    {
      id: "showers",
      icon: (
        <div className="w-24 h-24 relative">
          <Image
            src="/shower-icon.png"
            alt="Shower Cabins"
            width={96}
            height={96}
            className={`transition-all duration-300 ${hoveredFeature === "showers" ? "filter brightness-100 sepia-[.25] hue-rotate-[340deg] saturate-[2]" : ""}`}
          />
        </div>
      ),
      title: "Shower Cabins",
      description:
        "Nam lorem viverra dui feugiat. Scelerisque senectus mi bibendum lacinia. Proin orci rhoncus amet risus.",
    },
    {
      id: "nutrition",
      icon: (
        <div className="w-24 h-24 relative">
          <Image
            src="/nutrition-icon.png"
            alt="Sport Nutrition"
            width={96}
            height={96}
            className={`transition-all duration-300 ${hoveredFeature === "nutrition" ? "filter brightness-100 sepia-[.25] hue-rotate-[340deg] saturate-[2]" : ""}`}
          />
        </div>
      ),
      title: "Sport Nutrition",
      description:
        "Ultrices duis massa massa nulla non aliquet lorem. Pellentesque dapibus eget scelerisque duis diam fames eu.",
    },
  ]

  return (
    <div className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Animated circles */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#FF7512]/5 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#FF7512]/10 animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>
      <div
        className="absolute top-40 left-20 w-24 h-24 rounded-full bg-blue-500/5 animate-pulse"
        style={{ animationDuration: "3s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl text-[#FF7512] font-medium mb-4">What We Offer</h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-black">
            THE BEST STANDARDS ANYWHERE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <Feature
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isHovered={hoveredFeature === feature.id}
              onHover={() => setHoveredFeature(feature.id)}
              onLeave={() => setHoveredFeature(null)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
