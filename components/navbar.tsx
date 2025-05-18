"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Menu } from "lucide-react"
import Sidebar from "./sidebar"

interface NavbarProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "process", label: "Process" },
    { id: "schedule", label: "Schedule" },
    { id: "pricing", label: "Pricing" },
    { id: "bmi", label: "BMI" },
    { id: "trainers", label: "Trainers" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-40 flex justify-center mt-0 ${isScrolled ? "mt-2.5" : ""}`}>
        <motion.header
          className={`
            transition-all duration-300 px-4 py-4 w-[90%] 
            ${
              isScrolled
                ? `
                ${
                  isMobile
                    ? "w-full rounded-none bg-gray-900/80 backdrop-blur-md shadow-md py-2"
                    : "w-[80%] rounded-b-[40px] bg-gray-900/50 bg- backdrop-blur-md shadow-md py-2 mt-2.5"
                }
              `
                : "bg-transparent"
            }
          `}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Navigation */}
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-[#FF7512]" />
              <span className="ml-2 text-xl font-bold">
                <span className="text-white">Olympic</span> <span className="text-[#FF7512]">Fitness</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative text-sm font-medium transition-colors hover:text-[#FF7512] ${
                    activeSection === link.id ? "text-[#FF7512]" : "text-white"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF7512]"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-white hover:bg-[#FF7512] text-gray-900 hover:text-white font-bold py-2 px-6 transition-colors duration-300">
                BECOME A MEMBER
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button className="text-white p-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
        scrollToSection={scrollToSection}
      />
    </>
  )
}
