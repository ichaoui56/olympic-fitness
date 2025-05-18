"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Check,
  X,
  CreditCard,
  Calendar,
  TrendingDown,
  Award,
  Zap,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>("monthly")

  // Pricing data based on the provided information
  const plans = [
    {
      id: "single",
      name: "Single Session",
      price: 30,
      period: "per session",
      description: "Perfect for trying out our facilities",
      features: [
        { text: "Access to gym facilities", included: true },
        { text: "Musculation only", included: true },
        { text: "Valid for one day", included: true },
        { text: "No subscription fee", included: true },
        { text: "Group classes", included: false },
      ],
      icon: <Clock className="h-6 w-6" />,
      color: "blue",
      popular: false,
      savings: null,
      originalPrice: null,
      subscriptionFee: 0,
    },
    {
      id: "monthly",
      name: "Monthly",
      price: 200,
      period: "per month",
      description: "Our most flexible option",
      features: [
        { text: "Full access to gym facilities", included: true },
        { text: "All equipment usage", included: true },
        { text: "Unlimited group classes", included: true },
        { text: "Locker room access", included: true },
        { text: "Fitness assessment", included: true },
      ],
      icon: <Calendar className="h-6 w-6" />,
      color: "orange",
      popular: true,
      savings: 50,
      originalPrice: 250,
      subscriptionFee: 100,
    },
    {
      id: "quarterly",
      name: "Quarterly",
      price: 500,
      period: "per 3 months",
      description: "Great value for committed members",
      features: [
        { text: "Full access to gym facilities", included: true },
        { text: "All equipment usage", included: true },
        { text: "Unlimited group classes", included: true },
        { text: "Locker room access", included: true },
        { text: "Fitness assessment", included: true },
        { text: "No subscription fee", included: true },
      ],
      icon: <TrendingDown className="h-6 w-6" />,
      color: "green",
      popular: false,
      savings: 200,
      originalPrice: 700,
      subscriptionFee: 0,
    },
    {
      id: "semiannual",
      name: "Semi-Annual",
      price: 900,
      period: "per 6 months",
      description: "Serious savings for dedicated members",
      features: [
        { text: "Full access to gym facilities", included: true },
        { text: "All equipment usage", included: true },
        { text: "Unlimited group classes", included: true },
        { text: "Locker room access", included: true },
        { text: "Fitness assessment", included: true },
        { text: "1 personal training session/month", included: true },
        { text: "No subscription fee", included: true },
      ],
      icon: <Award className="h-6 w-6" />,
      color: "purple",
      popular: false,
      savings: 300,
      originalPrice: 1200,
      subscriptionFee: 0,
    },
    {
      id: "annual",
      name: "Annual",
      price: 1600,
      period: "per year",
      description: "Best value for committed fitness enthusiasts",
      features: [
        { text: "Full access to gym facilities", included: true },
        { text: "All equipment usage", included: true },
        { text: "Unlimited group classes", included: true },
        { text: "Locker room access", included: true },
        { text: "Quarterly fitness assessment", included: true },
        { text: "2 personal training sessions/month", included: true },
        { text: "Guest passes (2/month)", included: true },
        { text: "No subscription fee", included: true },
      ],
      icon: <Zap className="h-6 w-6" />,
      color: "gold",
      popular: false,
      savings: 400,
      originalPrice: 2000,
      subscriptionFee: 0,
    },
  ]

  const getColorClass = (color: string, element: "bg" | "text" | "border" | "from" | "to" | "shadow") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-500",
        border: "border-blue-500",
        from: "from-blue-500",
        to: "to-blue-600",
        shadow: "shadow-blue-500/20",
      },
      orange: {
        bg: "bg-[#FF7512]",
        text: "text-[#FF7512]",
        border: "border-[#FF7512]",
        from: "from-[#FF7512]",
        to: "to-[#e66a0f]",
        shadow: "shadow-[#FF7512]/20",
      },
      green: {
        bg: "bg-green-500",
        text: "text-green-500",
        border: "border-green-500",
        from: "from-green-500",
        to: "to-green-600",
        shadow: "shadow-green-500/20",
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-500",
        border: "border-purple-500",
        from: "from-purple-500",
        to: "to-purple-600",
        shadow: "shadow-purple-500/20",
      },
      gold: {
        bg: "bg-amber-500",
        text: "text-amber-500",
        border: "border-amber-500",
        from: "from-amber-500",
        to: "to-amber-600",
        shadow: "shadow-amber-500/20",
      },
    }

    return colorMap[color as keyof typeof colorMap][element]
  }

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="relative py-20 overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7512]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF7512]/10 rounded-full blur-3xl"></div>

      {/* Animated Circles */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-[#FF7512]/10 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-[#FF7512]/10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF7512]">
              Membership Plans
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7512] to-transparent"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-300 mt-6">
            Choose the perfect membership plan that fits your fitness goals and budget. All plans include access to our
            state-of-the-art facilities.
          </p>
        </motion.div>

        {/* Pricing Cards - New Creative Design */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-0 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${index === 0 ? "lg:rounded-l-2xl" : ""} ${
                index === plans.length - 1 ? "lg:rounded-r-2xl" : ""
              }`}
            >
              {/* Card Background with Gradient */}
              <div
                className={`h-full bg-gray-900/80 backdrop-blur-sm border-t-4 ${getColorClass(
                  plan.color,
                  "border",
                )} rounded-2xl lg:rounded-none ${index === 0 ? "lg:rounded-l-2xl" : ""} ${
                  index === plans.length - 1 ? "lg:rounded-r-2xl" : ""
                } overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "shadow-xl shadow-[#FF7512]/20 scale-105 z-10"
                    : "group-hover:shadow-lg group-hover:scale-[1.02] z-0"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-r from-[#FF7512] to-[#e66a0f] text-white px-6 py-1 rounded-full font-bold text-sm shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Plan Header */}
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColorClass(plan.color, "from")} ${getColorClass(
                        plan.color,
                        "to",
                      )} flex items-center justify-center mr-4 shadow-lg ${getColorClass(plan.color, "shadow")}`}
                    >
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-sm text-gray-400">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <div className="ml-2">
                        <span className="text-gray-400 text-lg">DH</span>
                        <div className="text-gray-400 text-sm">{plan.period}</div>
                      </div>
                    </div>

                    {/* Original Price & Savings */}
                    {plan.originalPrice && (
                      <div className="mt-2 flex items-center">
                        <span className="text-gray-400 text-sm line-through">{plan.originalPrice}DH</span>
                        <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <TrendingDown className="h-3 w-3 mr-1" /> Save {plan.savings}DH
                        </span>
                      </div>
                    )}

                    {/* Subscription Fee */}
                    {plan.subscriptionFee > 0 && (
                      <div className="mt-2 flex items-center text-amber-400 text-sm">
                        <CreditCard className="h-4 w-4 mr-1" /> +{plan.subscriptionFee}DH subscription fee
                      </div>
                    )}
                  </div>

                  {/* Features Preview (Desktop) */}
                  <div className="hidden lg:block">
                    <div className="space-y-3 mb-6">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          {feature.included ? (
                            <div className={`rounded-full p-1 ${getColorClass(plan.color, "bg")}/20 mr-2`}>
                              <Check className={`h-3 w-3 ${getColorClass(plan.color, "text")}`} />
                            </div>
                          ) : (
                            <div className="rounded-full p-1 bg-red-500/20 mr-2">
                              <X className="h-3 w-3 text-red-500" />
                            </div>
                          )}
                          <span className={feature.included ? "text-gray-300 text-sm" : "text-gray-500 text-sm"}>
                            {feature.text}
                          </span>
                        </div>
                      ))}

                      {plan.features.length > 3 && (
                        <div className="text-sm text-gray-400 flex items-center">
                          <span>+{plan.features.length - 3} more features</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Expandable Features */}
                  <div className="lg:hidden">
                    <div className="space-y-3 mb-6">
                      {expandedCard === plan.id
                        ? plan.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.05 }}
                              className="flex items-start"
                            >
                              {feature.included ? (
                                <div className={`rounded-full p-1 ${getColorClass(plan.color, "bg")}/20 mr-2`}>
                                  <Check className={`h-3 w-3 ${getColorClass(plan.color, "text")}`} />
                                </div>
                              ) : (
                                <div className="rounded-full p-1 bg-red-500/20 mr-2">
                                  <X className="h-3 w-3 text-red-500" />
                                </div>
                              )}
                              <span className={feature.included ? "text-gray-300 text-sm" : "text-gray-500 text-sm"}>
                                {feature.text}
                              </span>
                            </motion.div>
                          ))
                        : plan.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              {feature.included ? (
                                <div className={`rounded-full p-1 ${getColorClass(plan.color, "bg")}/20 mr-2`}>
                                  <Check className={`h-3 w-3 ${getColorClass(plan.color, "text")}`} />
                                </div>
                              ) : (
                                <div className="rounded-full p-1 bg-red-500/20 mr-2">
                                  <X className="h-3 w-3 text-red-500" />
                                </div>
                              )}
                              <span className={feature.included ? "text-gray-300 text-sm" : "text-gray-500 text-sm"}>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                    </div>

                    {plan.features.length > 2 && (
                      <button
                        onClick={() => toggleCard(plan.id)}
                        className="text-sm text-gray-400 flex items-center mb-6 hover:text-[#FF7512] transition-colors"
                      >
                        {expandedCard === plan.id ? (
                          <>
                            <span>Show less</span>
                            <ChevronUp className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          <>
                            <span>Show all {plan.features.length} features</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#FF7512] to-[#e66a0f] text-white shadow-lg shadow-[#FF7512]/20"
                        : `bg-gradient-to-r ${getColorClass(plan.color, "from")} ${getColorClass(
                            plan.color,
                            "to",
                          )} text-white shadow-lg ${getColorClass(plan.color, "shadow")}`
                    }`}
                  >
                    Choose Plan
                    <ChevronRight className="h-5 w-5 ml-1 opacity-70" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-800 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Compare All Features</h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px]">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-4 text-left text-gray-400">Feature</th>
                  {plans.map((plan) => (
                    <th key={`header-${plan.id}`} className="py-4 px-4 text-center">
                      <span className={`font-medium ${getColorClass(plan.color, "text")}`}>{plan.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Access to gym facilities */}
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300">Access to gym facilities</td>
                  {plans.map((plan) => (
                    <td key={`gym-${plan.id}`} className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  ))}
                </tr>

                {/* Equipment usage */}
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300">All equipment usage</td>
                  {plans.map((plan) => (
                    <td key={`equip-${plan.id}`} className="py-3 px-4 text-center">
                      {plan.id === "single" ? (
                        <div className="text-sm text-amber-400">Musculation only</div>
                      ) : (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Group classes */}
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300">Group classes</td>
                  {plans.map((plan) => (
                    <td key={`class-${plan.id}`} className="py-3 px-4 text-center">
                      {plan.id === "single" ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : (
                        <div className="text-sm text-green-500">Unlimited</div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Personal training */}
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300">Personal training sessions</td>
                  {plans.map((plan) => (
                    <td key={`pt-${plan.id}`} className="py-3 px-4 text-center">
                      {plan.id === "semiannual" ? (
                        <div className="text-sm text-green-500">1 per month</div>
                      ) : plan.id === "annual" ? (
                        <div className="text-sm text-green-500">2 per month</div>
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Subscription fee */}
                <tr>
                  <td className="py-3 px-4 text-gray-300">Subscription fee</td>
                  {plans.map((plan) => (
                    <td key={`fee-${plan.id}`} className="py-3 px-4 text-center">
                      {plan.subscriptionFee > 0 ? (
                        <div className="text-sm text-amber-400">{plan.subscriptionFee}DH</div>
                      ) : (
                        <div className="text-sm text-green-500">None</div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="inline-block relative mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF7512]">
              Ready to start your fitness journey?
            </h3>
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#FF7512] to-transparent"></div>
          </div>

          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Olympic Fitness today and take the first step toward achieving your fitness goals. Our team is ready to
            welcome you!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#FF7512] to-[#e66a0f] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-[#FF7512]/20 hover:shadow-xl hover:shadow-[#FF7512]/30 transition-all duration-300"
          >
            Join Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
