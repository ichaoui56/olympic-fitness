"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function MotivationalTicker() {
  const [topWidth, setTopWidth] = useState(0)
  const [bottomWidth, setBottomWidth] = useState(0)

  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const topContentRef = useRef<HTMLDivElement>(null)
  const bottomContentRef = useRef<HTMLDivElement>(null)

  // Measure the width of the content to ensure seamless looping
  useEffect(() => {
    if (topContentRef.current && bottomContentRef.current) {
      setTopWidth(topContentRef.current.offsetWidth)
      setBottomWidth(bottomContentRef.current.offsetWidth)
    }
  }, [])

  // Top row phrases
  const topRowPhrases = ["STAY HUMBLE", "BE PROUD", "BELIEVE IN YOURSELF", "RISE UP", "NEVER GIVE UP", "TRAIN HARD"]

  // Bottom row phrases
  const bottomRowPhrases = [
    "PUSH YOUR LIMITS",
    "EXCEED YOUR EXPECTATIONS",
    "SWEAT NOW, SHINE LATER",
    "STRONGER EVERY REP",
    "PROUDER EVERY DAY",
  ]

  return (
    <div className="w-full overflow-hidden sticky top-0 z-30 shadow-xl">
      {/* Top row - moving right */}
      <div
        ref={topRowRef}
        className="bg-[#FF7512] text-white font-bold py-5 overflow-hidden whitespace-nowrap text-xl md:text-2xl"
      >
        <div className="inline-flex">
          <motion.div
            ref={topContentRef}
            animate={{
              x: [-topWidth, 0],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex"
          >
            {topRowPhrases.map((phrase, index) => (
              <span key={`top-1-${index}`} className="flex items-center mx-6">
                {phrase} <ChevronRight className="ml-3 h-8 w-8" />
              </span>
            ))}
          </motion.div>

          <motion.div
            animate={{
              x: [-topWidth, 0],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex"
          >
            {topRowPhrases.map((phrase, index) => (
              <span key={`top-2-${index}`} className="flex items-center mx-6">
                {phrase} <ChevronRight className="ml-3 h-8 w-8" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom row - moving left */}
      <div
        ref={bottomRowRef}
        className="bg-[#e6d7c3] text-gray-900 font-bold py-5 overflow-hidden whitespace-nowrap text-xl md:text-2xl"
      >
        <div className="inline-flex">
          <motion.div
            ref={bottomContentRef}
            animate={{
              x: [0, -bottomWidth],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex"
          >
            {bottomRowPhrases.map((phrase, index) => (
              <span key={`bottom-1-${index}`} className="flex items-center mx-6">
                <ChevronLeft className="mr-3 h-8 w-8" /> {phrase}
              </span>
            ))}
          </motion.div>

          <motion.div
            animate={{
              x: [0, -bottomWidth],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex"
          >
            {bottomRowPhrases.map((phrase, index) => (
              <span key={`bottom-2-${index}`} className="flex items-center mx-6">
                <ChevronLeft className="mr-3 h-8 w-8" /> {phrase}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Arrow components
function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
