"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Clock,
  ChevronRight,
  Dumbbell,
  ArrowRight,
  Camera,
  Play,
  Users,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
  scrollToSection: (section: string) => void
  activeSection: string
  navLinks: { id: string; label: string }[]
}

export default function Sidebar({ isOpen, onClose, isMobile, scrollToSection, activeSection, navLinks }: SidebarProps) {
  // Close sidebar when clicking a navigation item on mobile
  const handleNavClick = (section: string) => {
    scrollToSection(section)
    if (isMobile) {
      onClose()
    }
  }

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navLinksWithIcons = navLinks.map(link => ({
    ...link,
    icon: <ChevronRight className="h-4 w-4" />
  }))

  const galleryImages = [
    { id: 1, query: "modern gym equipment" },
    { id: 2, query: "group fitness class" },
    { id: 3, query: "weight training area" },
    { id: 4, query: "yoga studio space" },
    { id: 5, query: "gym cardio section" },
    { id: 6, query: "fitness boxing area" },
  ]

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-gradient-to-b from-gray-900 to-black text-white z-50 overflow-y-auto"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full">
              {/* Header with creative background */}
              <div className="relative">
                {/* Creative background elements */}
                <div className="absolute top-0 left-0 w-full h-40 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF7512]/30 to-black/80"></div>
                  <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#FF7512]/20 blur-xl"></div>
                  <div className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-[#FF7512]/10 blur-xl"></div>
                  <div className="absolute top-5 right-20 w-10 h-10 rounded-full bg-[#FF7512]/30 blur-md"></div>
                </div>

                {/* Logo and close button */}
                <div className="flex justify-between items-center p-6 relative z-10">
                  <div className="flex items-center">
                    <Dumbbell className="h-8 w-8 text-[#FF7512]" />
                    <span className="ml-2 text-xl font-bold">
                      <span className="text-white">Olympic</span> <span className="text-[#FF7512]">Fitness</span>
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white bg-gray-800/70 hover:bg-gray-700 rounded-full p-2 transition-colors duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                {isMobile ? (
                  // Mobile: Show navigation links
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4 relative text-left">
                      <span className="relative z-10">Navigation</span>
                      <span className="absolute bottom-0 left-0 h-1 w-12 bg-[#FF7512]"></span>
                    </h3>
                    <nav className="flex flex-col space-y-1">
                      {navLinksWithIcons.map((link) => (
                        <motion.button
                          key={link.id}
                          onClick={() => handleNavClick(link.id)}
                          className="flex items-center justify-between text-left py-3 px-4 text-lg font-medium transition-colors hover:bg-gray-800/70 hover:text-[#FF7512] rounded-lg group"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      ))}
                    </nav>
                  </div>
                ) : (
                  // Desktop: Show gym information
                  <div className="space-y-8">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-4 relative inline-block">
                        <span className="relative z-10">About Our Gym</span>
                        <span className="absolute bottom-0 left-0 h-1 w-12 bg-[#FF7512]"></span>
                      </h3>
                      <p className="text-gray-300 mb-8 leading-relaxed">
                        Olympic Fitness is a premier gym dedicated to helping you achieve your fitness goals. With
                        state-of-the-art equipment and expert trainers, we're committed to your transformation journey.
                      </p>
                    </div>

                    {/* Gallery with unique generated images */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 relative inline-block text-left">
                        <span className="relative z-10 flex items-center">
                          <Camera className="mr-2 h-5 w-5 text-[#FF7512]" />
                          Gallery
                        </span>
                        <span className="absolute bottom-0 left-0 h-1 w-12 bg-[#FF7512]"></span>
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {galleryImages.map((image) => (
                          <motion.div
                            key={image.id}
                            className="aspect-square overflow-hidden rounded-lg relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <img
                              src={`/abstract-geometric-shapes.png?height=150&width=150&query=${image.query}`}
                              alt={`Gym image ${image.id}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Play className="h-8 w-8 text-white opacity-80" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Classes - New Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 relative inline-block text-left">
                        <span className="relative z-10 flex items-center">
                          <Users className="mr-2 h-5 w-5 text-[#FF7512]" />
                          Featured Classes
                        </span>
                        <span className="absolute bottom-0 left-0 h-1 w-12 bg-[#FF7512]"></span>
                      </h3>

                      <div className="space-y-3">
                        {[
                          { name: "HIIT Training", time: "Mon & Wed, 6:00 PM" },
                          { name: "Yoga Flow", time: "Tue & Thu, 7:30 AM" },
                          { name: "Strength Circuit", time: "Fri, 5:30 PM" },
                        ].map((cls, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-[#FF7512] hover:bg-gray-800/80 transition-colors"
                          >
                            <div className="font-medium">{cls.name}</div>
                            <div className="text-sm text-gray-400">{cls.time}</div>
                          </div>
                        ))}

                        <button className="flex items-center text-[#FF7512] text-sm mt-2 hover:underline">
                          View all classes
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Location & Contact with improved styling */}
                    <div>
                      <h3 className="text-xl font-bold mb-6 relative inline-block text-left">
                        <span className="relative z-10 flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-[#FF7512]" />
                          Location & Contact
                        </span>
                        <span className="absolute bottom-0 left-0 h-1 w-12 bg-[#FF7512]"></span>
                      </h3>

                      <div className="space-y-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-lg border border-gray-700/30">
                        <div className="flex items-start">
                          <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3">
                            <MapPin className="text-[#FF7512] h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-gray-400 mb-1">Address</div>
                            <div>123 Fitness Street, Gym City, GC 12345</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3">
                            <Mail className="text-[#FF7512] h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-gray-400 mb-1">Email</div>
                            <div>info@olympicfitness.com</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3">
                            <Clock className="text-[#FF7512] h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-gray-400 mb-1">Open Hours</div>
                            <div>Mon - Fri: 6AM - 10PM</div>
                            <div>Sat - Sun: 8AM - 8PM</div>
                          </div>
                        </div>

                        <div className="flex justify-start mt-6">
                          <a
                            href="tel:1234567890"
                            className="bg-[#FF7512] rounded-full p-4 flex items-center hover:bg-[#e66a0f] transition-colors duration-300"
                          >
                            <Phone className="h-5 w-5 mr-2" />
                            <span className="text-lg font-bold">(123) 456-7890</span>
                          </a>
                        </div>
                      </div>

                      {/* Social Media Icons */}
                      <div className="flex space-x-3 mt-6">
                        <motion.a
                          href="#"
                          className="bg-gray-800/70 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                          whileHover={{ y: -3 }}
                        >
                          <Instagram className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="bg-gray-800/70 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                          whileHover={{ y: -3 }}
                        >
                          <Facebook className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="bg-gray-800/70 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                          whileHover={{ y: -3 }}
                        >
                          <Twitter className="h-5 w-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer (only on mobile) */}
              {isMobile && (
                <div className="p-6 border-t border-gray-800">
                  <div className="flex flex-col items-start">
                    <p className="text-gray-400 mb-4 text-left">Connect with us on social media</p>
                    <div className="flex space-x-4">
                      <motion.a
                        href="#"
                        className="bg-gray-800 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                        whileHover={{ y: -3 }}
                      >
                        <Instagram className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="bg-gray-800 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                        whileHover={{ y: -3 }}
                      >
                        <Facebook className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="bg-gray-800 p-2 rounded-full hover:bg-[#FF7512] transition-colors duration-300"
                        whileHover={{ y: -3 }}
                      >
                        <Twitter className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
