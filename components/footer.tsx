"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Dumbbell,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  ChevronRight,
  Heart,
  Send,
  Youtube,
  MessageCircle,
} from "lucide-react"

interface FooterProps {
  scrollToSection: (section: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }
  }

  const quickLinks = [
    { label: "Home", section: "home" },
    { label: "About", section: "about" },
    { label: "Process", section: "process" },
    { label: "Schedule", section: "schedule" },
    { label: "Pricing", section: "pricing" },
    { label: "Trainers", section: "trainers" },
  ]

  const footerLinks = [
    { label: "Careers", url: "#" },
    { label: "Privacy Policy", url: "#" },
    { label: "Terms & Conditions", url: "#" },
    { label: "FAQ", url: "#" },
    { label: "Blog", url: "#" },
  ]

  return (
    <footer ref={ref} className="relative overflow-hidden pt-20 pb-10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 z-0"></div>

      {/* Animated Circles */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FF7512]/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl"></div>

      {/* Animated Dots */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#FF7512] rounded-full animate-pulse"></div>
        <div
          className="absolute top-20 right-20 w-3 h-3 bg-[#FF7512] rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-10 left-1/4 w-2 h-2 bg-[#FF7512] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#FF7512] rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#FF7512] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section with Logo and Newsletter */}
        <div className="relative mb-16 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7512]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <Dumbbell className="h-10 w-10 text-[#FF7512]" />
                <span className="ml-3 text-3xl font-bold">
                  <span className="text-white">Olympic</span> <span className="text-[#FF7512]">Fitness</span>
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Transform your body, elevate your mind, and achieve your fitness goals with our state-of-the-art
                facilities and expert trainers.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300 group"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300 group"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300 group"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-[#FF7512] transition-colors duration-300 group"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FF7512]/10 rounded-full blur-xl"></div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-[#FF7512]" />
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-300 mb-6">
                  Get the latest updates, fitness tips, and exclusive offers directly to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-gray-900/70 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7512] pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bg-[#FF7512] text-white p-2 rounded-lg hover:bg-[#e66a0f] transition-colors duration-300"
                      aria-label="Subscribe"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-sm flex items-center"
                    >
                      <Heart className="h-4 w-4 mr-2" /> Thank you for subscribing!
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF7512]"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-gray-300 hover:text-[#FF7512] transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Useful Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF7512]"></span>
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-[#FF7512] transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF7512]"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3 mt-1">
                  <MapPin className="text-[#FF7512] h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Address</div>
                  <div className="text-white">123 Fitness Street, Gym City, GC 12345</div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3 mt-1">
                  <Phone className="text-[#FF7512] h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div className="text-white">(123) 456-7890</div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#FF7512]/20 p-2 rounded-lg mr-3 mt-1">
                  <Mail className="text-[#FF7512] h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div className="text-white">info@olympicfitness.com</div>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Opening Hours
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF7512]"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-[#FF7512] font-medium">6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Saturday</span>
                <span className="text-[#FF7512] font-medium">8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Sunday</span>
                <span className="text-[#FF7512] font-medium">8:00 AM - 6:00 PM</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <div className="flex items-center mb-2">
                <MessageCircle className="h-5 w-5 text-[#FF7512] mr-2" />
                <h4 className="text-white font-bold">Need Help?</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">Our support team is available 24/7 to answer your questions.</p>
              <a
                href="tel:1234567890"
                className="inline-flex items-center bg-[#FF7512] text-white px-4 py-2 rounded-lg hover:bg-[#e66a0f] transition-colors duration-300"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-400 mb-4 md:mb-0"
            >
              &copy; {new Date().getFullYear()} Olympic Fitness. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center"
            >
              <span className="text-gray-400 mr-2">Made with</span>
              <Heart className="h-4 w-4 text-[#FF7512] mx-1" />
              <span className="text-gray-400">for fitness enthusiasts</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
