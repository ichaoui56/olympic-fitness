"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides: Slide[] = [
    {
      id: 1,
      image: "/gym-slide-1.jpg",
      title: "IGNITE",
      subtitle: "TRANSFORMATION",
      description:
        "Discover fitness excellence at our premier gym. With top-notch equipment, expert trainers, and dynamic classes, we're committed to helping you reach your goals. Join us today and unleash your full potential!",
    },
    {
      id: 2,
      image: "/gym-slide-2.jpg",
      title: "ELEVATE",
      subtitle: "YOUR JOURNEY",
      description:
        "Push beyond your limits with our state-of-the-art facilities and personalized training programs. Our expert coaches will guide you through every step of your fitness journey to achieve remarkable results.",
    },
    {
      id: 3,
      image: "/gym-slide-3.jpg",
      title: "FORGE",
      subtitle: "YOUR STRENGTH",
      description:
        "Build more than just muscle at Olympic Fitness. Our community-focused approach helps you develop mental toughness, discipline, and the confidence to overcome any challenge in and out of the gym.",
    },
    {
      id: 4,
      image: "/gym-slide-4.jpg",
      title: "ACHIEVE",
      subtitle: "YOUR GOALS",
      description:
        "Whether you're just starting out or looking to take your fitness to the next level, our dedicated team is here to support you every step of the way. Set your goals, crush them, and set new ones.",
    },
  ]

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [isAnimating, slides.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [isAnimating, slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 7000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      zIndex: 0,
    }),
  }

  const textVariants = {
    initial: (direction: number) => ({
      y: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -20 : 20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  }

  const titleVariants = {
    initial: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -40 : 40,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  }

  const subtitleVariants = {
    initial: (direction: number) => ({
      y: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -60 : 60,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  }

  const buttonVariants = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.6,
      },
    },
    exit: {
      y: 30,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#e66a0f",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction} mode="sync" onExitComplete={handleAnimationComplete}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full bg-black"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={`Slide ${currentSlide + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`title-${slides[currentSlide].id}`}
                    custom={direction}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-6xl md:text-8xl font-bold mb-0 text-transparent"
                    style={{
                      WebkitTextStroke: "2px #FF7512",
                      color: "transparent",
                      lineHeight: "1.1",
                    }}
                  >
                    {slides[currentSlide].title}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`subtitle-${slides[currentSlide].id}`}
                    custom={direction}
                    variants={subtitleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-6xl md:text-8xl font-bold mb-6 text-transparent"
                    style={{
                      WebkitTextStroke: "2px #FF7512",
                      color: "transparent",
                      lineHeight: "1.1",
                    }}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.h2
                    key={`heading-${slides[currentSlide].id}`}
                    custom={direction}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                  >
                    & UNITE YOUR STRENGTH
                  </motion.h2>
                </AnimatePresence>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.p
                    key={`desc-${slides[currentSlide].id}`}
                    custom={direction}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-lg text-gray-200 mb-8 max-w-2xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.button
                    key={`button-${slides[currentSlide].id}`}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    className="bg-[#FF7512] text-white font-bold py-3 px-8 flex items-center"
                  >
                    JOIN NOW
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 flex space-x-2 z-20">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 transition-all duration-300 border border-[#FF7512]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 transition-all duration-300 border border-[#FF7512]"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setDirection(index > currentSlide ? 1 : -1)
              setCurrentSlide(index)
              setIsAnimating(true)
            }}
            disabled={isAnimating}
            className={`h-2 w-8 transition-all duration-300 ${
              currentSlide === index ? "bg-[#FF7512]" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
