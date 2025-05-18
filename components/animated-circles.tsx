"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCircle {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  color: string
  opacity: number
}

export default function AnimatedCircles() {
  const [circles, setCircles] = useState<AnimatedCircle[]>([])

  useEffect(() => {
    // Generate random circles
    const generateCircles = () => {
      const newCircles: AnimatedCircle[] = []
      const colors = ["#FF7512", "#0051FF", "#FF7512", "#0051FF"]

      for (let i = 0; i < 15; i++) {
        newCircles.push({
          id: i,
          size: Math.random() * 200 + 50, // 50-250px
          x: Math.random() * 100, // 0-100%
          y: Math.random() * 100, // 0-100%
          duration: Math.random() * 20 + 10, // 10-30s
          delay: Math.random() * 5, // 0-5s
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.08 + 0.02, // 0.02-0.1
        })
      }

      setCircles(newCircles)
    }

    generateCircles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            backgroundColor: circle.color,
            opacity: circle.opacity,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
