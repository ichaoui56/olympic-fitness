"use client"

import { useEffect, useState } from "react"

export default function MotivationalTicker() {
  const [windowWidth, setWindowWidth] = useState(0)

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate animation duration based on screen width
  const getDuration = () => {
    return Math.max(30, windowWidth / 40)
  }

  return (
    <div className="w-full overflow-hidden top-0 z-30 shadow-xl">
      {/* Top row - moving right */}
      <div className="bg-[#FF7512] text-white font-bold py-4 md:py-5 overflow-hidden text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider flex">
        <div className="flex whitespace-nowrap animate-marquee-right">
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">STAY HUMBLE</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">BE PROUD</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">BELIEVE IN YOURSELF</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">RISE UP</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">NEVER GIVE UP</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">TRAIN HARD</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">STAY HUMBLE</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">BE PROUD</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">BELIEVE IN YOURSELF</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">RISE UP</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">NEVER GIVE UP</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <span className="mr-3">TRAIN HARD</span>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
        </div>
      </div>

      {/* Bottom row - moving left */}
      <div className="bg-[#e6d7c3] text-gray-900 font-bold py-4 md:py-5 overflow-hidden text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider flex">
        <div className="flex whitespace-nowrap animate-marquee-left">
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>PROUDER EVERY STEP</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>PUSH YOUR LIMITS</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>EXCEED YOUR EXPECTATIONS</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>SWEAT NOW, SHINE LATER</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>STRONGER EVERY REP</span>
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>PROUDER EVERY STEP</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>PUSH YOUR LIMITS</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>EXCEED YOUR EXPECTATIONS</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>SWEAT NOW, SHINE LATER</span>
          </div>
          <div className="flex items-center mx-4 md:mx-6">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-3" />
            <span>STRONGER EVERY REP</span>
          </div>
        </div>
      </div>

      {/* Add CSS for the animations */}
      <style jsx global>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite reverse;
        }
      `}</style>
    </div>
  )
}

// Arrow components
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
