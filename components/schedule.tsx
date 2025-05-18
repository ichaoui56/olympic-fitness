"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, Users, UserRound } from "lucide-react"

export default function Schedule() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [viewMode, setViewMode] = useState<"combined" | "mixed" | "women">("combined")
  const [expandedDay, setExpandedDay] = useState<string | null>(null)

  // Schedule data
  const scheduleData = [
    {
      day: "Monday",
      mixed: ["08:00H - 22:00H"],
      women: [],
    },
    {
      day: "Tuesday",
      mixed: ["08:00H - 17:00H", "20:00H - 22:00H"],
      women: ["17:00H - 20:00H"],
    },
    {
      day: "Wednesday",
      mixed: ["08:00H - 22:00H"],
      women: [],
    },
    {
      day: "Thursday",
      mixed: ["08:00H - 17:00H", "20:00H - 22:00H"],
      women: ["17:00H - 20:00H"],
    },
    {
      day: "Friday",
      mixed: ["08:00H - 22:00H"],
      women: [],
    },
    {
      day: "Saturday",
      mixed: ["09:00H - 17:00H"],
      women: ["17:00H - 19:00H"],
    },
    {
      day: "Sunday",
      mixed: ["09:00H - 13:00H"],
      women: [],
    },
  ]

  // Toggle expanded day for mobile view
  const toggleDay = (day: string) => {
    if (expandedDay === day) {
      setExpandedDay(null)
    } else {
      setExpandedDay(day)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="relative overflow-hidden py-20" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#FF7512] blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-600 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-[#FF7512] mr-3" />
            <h2 className="text-5xl md:text-6xl font-bold text-white">SCHEDULE</h2>
          </div>
          <div className="w-20 h-1 bg-[#FF7512] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Our gym is open throughout the week with dedicated hours for both mixed and women-only sessions. Find the
            perfect time to fit your workout into your busy schedule.
          </p>
        </motion.div>

        {/* Separate Filter Buttons */}
        <div className="flex justify-center mb-8 gap-3">
          {/* Combined View Button */}
          <button
            onClick={() => setViewMode("combined")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === "combined"
                ? "bg-[#FF7512] text-white border-2 border-[#FF7512]"
                : "bg-gray-800 text-white border-2 border-gray-700 hover:border-[#FF7512]"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 mr-2"></div>
            <span>All Hours</span>
          </button>

          {/* Mixed Only Button */}
          <button
            onClick={() => setViewMode("mixed")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === "mixed"
                ? "bg-[#FF7512] text-white border-2 border-[#FF7512]"
                : "bg-gray-800 text-white border-2 border-gray-700 hover:border-[#FF7512]"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Mixed</span>
          </button>

          {/* Women Only Button */}
          <button
            onClick={() => setViewMode("women")}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === "women"
                ? "bg-[#FF7512] text-white border-2 border-[#FF7512]"
                : "bg-gray-800 text-white border-2 border-gray-700 hover:border-[#FF7512]"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <span>Women</span>
          </button>
        </div>

        {/* Combined View */}
        {viewMode === "combined" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-7 gap-4"
          >
            {scheduleData.map((day) => (
              <motion.div
                key={day.day}
                variants={itemVariants}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                {/* Day header */}
                <div
                  className={`py-4 px-6 border-b border-gray-800 ${
                    day.women.length > 0 ? "bg-gradient-to-r from-blue-900/40 to-pink-900/40" : "bg-[#1a1a1a]"
                  }`}
                >
                  <h3 className="text-xl font-bold text-white text-center">{day.day}</h3>
                </div>

                {/* Hours */}
                <div className="p-5">
                  {/* Mixed hours */}
                  {day.mixed.length > 0 && (
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-400">Mixed Hours</span>
                      </div>
                      {day.mixed.map((hour, hourIndex) => (
                        <div
                          key={`mixed-${hourIndex}`}
                          className="flex items-center bg-blue-500/10 p-3 rounded-lg border-l-4 border-blue-500"
                        >
                          <Users className="text-blue-400 w-5 h-5 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">{hour}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Women only hours */}
                  {day.women.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                        <span className="text-sm text-gray-400">Women Only</span>
                      </div>
                      {day.women.map((hour, hourIndex) => (
                        <div
                          key={`women-${hourIndex}`}
                          className="flex items-center bg-pink-500/10 p-3 rounded-lg border-l-4 border-pink-500"
                        >
                          <UserRound className="text-pink-400 w-5 h-5 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">{hour}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* If no hours for the day */}
                  {day.mixed.length === 0 && day.women.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-gray-500">
                      <p>Closed</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mixed Hours Only View */}
        {viewMode === "mixed" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-7 gap-4"
          >
            {scheduleData.map((day) => (
              <motion.div
                key={`mixed-${day.day}`}
                variants={itemVariants}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                {/* Day header */}
                <div className="bg-[#1a1a1a] py-4 px-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white text-center">{day.day}</h3>
                </div>

                {/* Hours */}
                <div className="p-5">
                  {day.mixed.length > 0 ? (
                    <div className="space-y-3">
                      {day.mixed.map((hour, hourIndex) => (
                        <div
                          key={hourIndex}
                          className="flex items-center bg-blue-500/10 p-3 rounded-lg border-l-4 border-blue-500"
                        >
                          <Clock className="text-blue-400 w-5 h-5 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">{hour}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 text-gray-500">
                      <p>Closed</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Women Only View */}
        {viewMode === "women" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-7 gap-4"
          >
            {scheduleData.map((day) => (
              <motion.div
                key={`women-${day.day}`}
                variants={itemVariants}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                {/* Day header */}
                <div className="bg-[#1a1a1a] py-4 px-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white text-center">{day.day}</h3>
                </div>

                {/* Hours */}
                <div className="p-5">
                  {day.women.length > 0 ? (
                    <div className="space-y-3">
                      {day.women.map((hour, hourIndex) => (
                        <div
                          key={hourIndex}
                          className="flex items-center bg-pink-500/10 p-3 rounded-lg border-l-4 border-pink-500"
                        >
                          <Clock className="text-pink-400 w-5 h-5 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">{hour}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 text-gray-500">
                      <p>No women-only hours</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Weekly overview */}
        <div className="mt-16 bg-gray-900 p-6 rounded-xl max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <Calendar className="w-5 h-5 text-[#FF7512] mr-2" />
            Weekly Overview
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px]">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Day</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      Mixed Hours
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                      Women Only
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((day) => (
                  <tr key={`overview-${day.day}`} className="border-t border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">{day.day}</td>
                    <td className="py-3 px-4">
                      {day.mixed.length > 0 ? (
                        <div className="space-y-1">
                          {day.mixed.map((hour, idx) => (
                            <div key={idx} className="text-blue-400">
                              {hour}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">Closed</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {day.women.length > 0 ? (
                        <div className="space-y-1">
                          {day.women.map((hour, idx) => (
                            <div key={idx} className="text-pink-400">
                              {hour}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">No women-only hours</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download and share buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF7512] text-white px-6 py-3 rounded-full font-bold inline-flex items-center shadow-lg hover:bg-[#e66a0f] transition-colors duration-300"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Download Schedule
          </motion.button>
        </div>
      </div>
    </div>
  )
}
