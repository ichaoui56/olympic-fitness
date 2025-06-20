"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useScroll, motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import OurProcess from "@/components/our-process"
import Schedule from "@/components/schedule"
import Pricing from "@/components/pricing"
import BMICalculator from "@/components/bmi-calculator"
import Trainers from "@/components/trainers"
import Footer from "@/components/footer"
import AnimatedCursor from "@/components/animated-cursor"
import MotivationalTicker from "@/components/motivational-ticker-v2"
import WhatWeOffer from "@/components/what-we-offer"
import AnimatedCircles from "@/components/animated-circles"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const bmiRef = useRef<HTMLDivElement>(null)
  const trainersRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const offset = windowHeight * 0.3 // 30% of viewport height

      // Define sections in the exact order they appear in the DOM
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "process", ref: processRef },
        { id: "schedule", ref: scheduleRef },
        { id: "bmi", ref: bmiRef },
        { id: "pricing", ref: pricingRef },
        { id: "trainers", ref: trainersRef },
        { id: "contact", ref: contactRef },
      ]

      // Find the active section based on scroll position
      let currentSection = "home"

      for (const section of sections) {
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop
          const sectionHeight = section.ref.current.offsetHeight
          const sectionBottom = sectionTop + sectionHeight

          // Check if the section is in view (considering the offset)
          if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionBottom) {
            currentSection = section.id
            break
          }
        }
      }

      // Special case for the last section (contact)
      const lastSection = sections[sections.length - 1]
      if (lastSection.ref.current) {
        const lastSectionTop = lastSection.ref.current.offsetTop
        if (scrollPosition + offset >= lastSectionTop) {
          currentSection = lastSection.id
        }
      }

      setActiveSection(currentSection)
    }

    // Initial call
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      about: aboutRef,
      process: processRef,
      schedule: scheduleRef,
      bmi: bmiRef,
      pricing: pricingRef,
      trainers: trainersRef,
      contact: contactRef,
    }

    const ref = sectionRefs[sectionId]
    if (ref.current) {
      // Calculate offset for fixed navbar
      const navbarHeight = 80
      const elementPosition = ref.current.offsetTop - navbarHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  // Animation variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <main className="relative bg-black overflow-hidden">
      {/* Subtle accent glows */}
      <div className="accent-glow accent-glow-1"></div>
      <div className="accent-glow accent-glow-2"></div>
      <AnimatedCircles />
      <AnimatedCursor />
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <motion.section
        ref={homeRef}
        id="home"
        className="min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Hero />
        <MotivationalTicker />
        <WhatWeOffer />
      </motion.section>

      <motion.section
        ref={aboutRef}
        id="about"
        className="py-20 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInRight}
      >
        <About />
      </motion.section>

      <motion.section
        ref={processRef}
        id="process"
        className="bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <OurProcess />
      </motion.section>

      <motion.section
        ref={scheduleRef}
        id="schedule"
        className="py-20 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInLeft}
      >
        <Schedule />
      </motion.section>

      <motion.section
        ref={bmiRef}
        id="bmi"
        className="bg-white py-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInRight}
      >
        <BMICalculator />
      </motion.section>

      <motion.section
        ref={pricingRef}
        id="pricing"
        className="py-20 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Pricing />
      </motion.section>

      <motion.section
        ref={trainersRef}
        id="trainers"
        className="bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInLeft}
      >
        <Trainers />
      </motion.section>

      <motion.section
        ref={contactRef}
        id="contact"
        className="bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Footer scrollToSection={scrollToSection} />
      </motion.section>
    </main>
  )
}
