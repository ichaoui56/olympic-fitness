"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  useEffect(() => {
    // Add event listeners for interactive elements
    const handleMouseEnter = () => setCursorVariant("hover")
    const handleMouseLeave = () => setCursorVariant("default")

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  }

  // This is the small dot that follows the cursor exactly
  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: {
        type: "spring",
        mass: 0.1,
      },
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: {
        type: "spring",
        mass: 0.1,
      },
    },
  }

  return (
    <>
      {/* Outer circle */}
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-[#FF7512] fixed top-0 left-0 pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
      />

      {/* Inner dot */}
      <motion.div
        className="w-2 h-2 rounded-full bg-[#FF7512] fixed top-0 left-0 pointer-events-none z-50"
        variants={dotVariants}
        animate={cursorVariant}
      />
    </>
  )
}
