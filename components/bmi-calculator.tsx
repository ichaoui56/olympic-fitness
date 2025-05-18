"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Calculator,
  ChevronDown,
  Info,
  ArrowRight,
  Flame,
  Dumbbell,
  Apple,
  Beef,
  Wheat,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  BarChart3,
  Utensils,
  Scale,
  Heart,
  Activity,
  Sliders,
  Lock,
  Unlock,
  HelpCircle,
  Check,
} from "lucide-react"

// Activity level multipliers
const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary", description: "Limited exercise" },
  { value: 1.375, label: "Lightly Active", description: "Light exercise less than 3 days per week" },
  { value: 1.55, label: "Moderately Active", description: "Moderate exercise most days of the week" },
  { value: 1.725, label: "Very Active", description: "Hard exercise every day" },
  { value: 1.9, label: "Extra Active", description: "Strenuous exercise two or more times per day" },
]

// Goals and their calorie adjustments
const GOALS = [
  { value: "lose", label: "Lose Weight", adjustment: -500, description: "Calorie deficit for weight loss" },
  { value: "maintain", label: "Maintain Weight", adjustment: 0, description: "Balanced calories for maintenance" },
  { value: "gain", label: "Gain Weight", adjustment: 500, description: "Calorie surplus for weight gain" },
]

// Recommended macro ranges
const MACRO_RANGES = {
  protein: { min: 10, max: 35, default: 30 },
  carbs: { min: 45, max: 65, default: 50 },
  fat: { min: 20, max: 35, default: 20 },
}

// Default macro ratios
const DEFAULT_MACRO_RATIOS = {
  protein: MACRO_RANGES.protein.default,
  carbs: MACRO_RANGES.carbs.default,
  fat: MACRO_RANGES.fat.default,
}

export default function BMICalculator() {
  // Form inputs
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState(ACTIVITY_LEVELS[0].value)
  const [goal, setGoal] = useState(GOALS[0].value)

  // Macro ratios
  const [macroRatios, setMacroRatios] = useState(DEFAULT_MACRO_RATIOS)
  const [isEditingMacros, setIsEditingMacros] = useState(false)
  const [macroLock, setMacroLock] = useState<"protein" | "carbs" | "fat" | null>(null)

  // Results
  const [bmi, setBMI] = useState<number | null>(null)
  const [bmiCategory, setBMICategory] = useState("")
  const [bmr, setBMR] = useState<number | null>(null)
  const [tdee, setTDEE] = useState<number | null>(null)
  const [targetCalories, setTargetCalories] = useState<number | null>(null)
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>(null)

  // UI states
  const [isCalculated, setIsCalculated] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showActivityInfo, setShowActivityInfo] = useState(false)
  const [showGoalInfo, setShowGoalInfo] = useState(false)
  const [showMacroInfo, setShowMacroInfo] = useState(false)
  const [showRangeInfo, setShowRangeInfo] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Calculate BMI, BMR, TDEE
  const calculateMetrics = (e: React.FormEvent) => {
    e.preventDefault()

    if (!age || !height || !weight) return

    // Convert inputs to numbers
    const ageNum = Number.parseFloat(age)
    const heightInCm = Number.parseFloat(height)
    const weightInKg = Number.parseFloat(weight)
    const heightInMeters = heightInCm / 100

    // Calculate BMI
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
    setBMI(Number.parseFloat(calculatedBMI.toFixed(1)))

    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setBMICategory("Underweight")
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setBMICategory("Normal weight")
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setBMICategory("Overweight")
    } else {
      setBMICategory("Obesity")
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let calculatedBMR: number
    if (gender === "male") {
      calculatedBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum + 5
    } else {
      calculatedBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum - 161
    }
    setBMR(Math.round(calculatedBMR))

    // Calculate TDEE (Total Daily Energy Expenditure)
    const calculatedTDEE = Math.round(calculatedBMR * activityLevel)
    setTDEE(calculatedTDEE)

    // Calculate target calories based on goal
    const goalAdjustment = GOALS.find((g) => g.value === goal)?.adjustment || 0
    const calculatedTargetCalories = calculatedTDEE + goalAdjustment
    setTargetCalories(calculatedTargetCalories)

    setIsCalculated(true)
    setCurrentStep(1) // Move to macro customization step
  }

  // Calculate macronutrients based on target calories and ratios
  const calculateMacros = () => {
    if (!targetCalories) return

    const proteinCalories = targetCalories * (macroRatios.protein / 100)
    const carbsCalories = targetCalories * (macroRatios.carbs / 100)
    const fatCalories = targetCalories * (macroRatios.fat / 100)

    // Convert calories to grams (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
    const proteinGrams = Math.round(proteinCalories / 4)
    const carbsGrams = Math.round(carbsCalories / 4)
    const fatGrams = Math.round(fatCalories / 9)

    setMacros({
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
    })
  }

  // Update macros when ratios or target calories change
  useEffect(() => {
    if (targetCalories) {
      calculateMacros()
    }
  }, [macroRatios, targetCalories])

  // Handle macro ratio changes with locking mechanism
  const handleMacroChange = (macro: "protein" | "carbs" | "fat", value: number) => {
    // Ensure value is between 0 and 100
    value = Math.max(0, Math.min(100, value))

    // Create a copy of current ratios
    const newRatios = { ...macroRatios }
    newRatios[macro] = value

    // If we have a locked macro, adjust only the unlocked one
    if (macroLock && macroLock !== macro) {
      // Find the other unlocked macro
      const otherMacro = Object.keys(newRatios).find((key) => key !== macro && key !== macroLock) as
        | "protein"
        | "carbs"
        | "fat"

      // Calculate what's left after accounting for the changed macro and locked macro
      const remaining = 100 - value - newRatios[macroLock]
      newRatios[otherMacro] = Math.max(0, remaining)
    } else {
      // No locked macro, distribute the change proportionally between other macros
      const otherMacros = Object.keys(newRatios).filter((key) => key !== macro) as Array<"protein" | "carbs" | "fat">
      const totalOther = otherMacros.reduce((sum, key) => sum + newRatios[key], 0)

      // Calculate what's left for other macros
      const remaining = 100 - value

      // If there's nothing left or no other macros have value, set them to 0
      if (remaining <= 0 || totalOther <= 0) {
        otherMacros.forEach((key) => {
          newRatios[key] = 0
        })
      } else {
        // Distribute remaining proportionally
        otherMacros.forEach((key) => {
          const proportion = totalOther > 0 ? newRatios[key] / totalOther : 1 / otherMacros.length
          newRatios[key] = Math.round(remaining * proportion)
        })

        // Ensure we add up to exactly 100% by adjusting the first non-changed macro
        const sum = Object.values(newRatios).reduce((a, b) => a + b, 0)
        if (sum !== 100) {
          const diff = 100 - sum
          const adjustMacro = otherMacros[0]
          newRatios[adjustMacro] = Math.max(0, newRatios[adjustMacro] + diff)
        }
      }
    }

    setMacroRatios(newRatios)
  }

  // Toggle macro lock
  const toggleMacroLock = (macro: "protein" | "carbs" | "fat") => {
    if (macroLock === macro) {
      setMacroLock(null)
    } else {
      setMacroLock(macro)
    }
  }

  // Proceed to results after customizing macros
  const proceedToResults = () => {
    calculateMacros()
    setCurrentStep(2)
  }

  const resetCalculator = () => {
    setAge("")
    setGender("male")
    setHeight("")
    setWeight("")
    setActivityLevel(ACTIVITY_LEVELS[0].value)
    setGoal(GOALS[0].value)
    setMacroRatios(DEFAULT_MACRO_RATIOS)
    setMacroLock(null)
    setBMI(null)
    setBMICategory("")
    setBMR(null)
    setTDEE(null)
    setTargetCalories(null)
    setMacros(null)
    setIsCalculated(false)
    setCurrentStep(0)
  }

  const getBMIColor = () => {
    if (!bmi) return "text-gray-700"
    if (bmi < 18.5) return "text-blue-500"
    if (bmi >= 18.5 && bmi < 25) return "text-green-500"
    if (bmi >= 25 && bmi < 30) return "text-yellow-500"
    return "text-red-500"
  }

  const getHealthTip = () => {
    if (!bmiCategory) return ""

    switch (bmiCategory) {
      case "Underweight":
        return "Consider consulting with a nutritionist to develop a healthy weight gain plan."
      case "Normal weight":
        return "Great job! Maintain your healthy lifestyle with regular exercise and balanced nutrition."
      case "Overweight":
        return "Focus on increasing physical activity and making healthier food choices to reach a healthier weight."
      case "Obesity":
        return "Consider consulting with a healthcare professional to develop a comprehensive weight management plan."
      default:
        return ""
    }
  }

  // Increment/decrement macro values
  const adjustMacro = (macro: "protein" | "carbs" | "fat", amount: number) => {
    handleMacroChange(macro, macroRatios[macro] + amount)
  }

  // Check if macro is within recommended range
  const isMacroInRange = (macro: "protein" | "carbs" | "fat") => {
    const value = macroRatios[macro]
    const range = MACRO_RANGES[macro]
    return value >= range.min && value <= range.max
  }

  // Get color for macro based on whether it's in range
  const getMacroColor = (macro: "protein" | "carbs" | "fat") => {
    if (isMacroInRange(macro)) {
      return macro === "protein" ? "text-[#FF7512]" : macro === "carbs" ? "text-blue-500" : "text-green-500"
    }
    return "text-red-500"
  }

  // Get background color for macro based on whether it's in range
  const getMacroBgColor = (macro: "protein" | "carbs" | "fat") => {
    if (isMacroInRange(macro)) {
      return macro === "protein" ? "bg-[#FF7512]" : macro === "carbs" ? "bg-blue-500" : "bg-green-500"
    }
    return "bg-red-500"
  }

  return (
    <div className="relative bg-white py-20 overflow-hidden" ref={ref}>
      {/* Animated circles */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#FF7512]/5 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-[#FF7512]/10 animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>
      <div
        className="absolute top-40 left-40 w-20 h-20 rounded-full bg-blue-500/5 animate-pulse"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-40 right-40 w-32 h-32 rounded-full bg-blue-500/10 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Advanced Fitness Calculator</h2>
          <div className="w-20 h-1 bg-[#FF7512] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Calculate your BMI, daily calorie needs, and optimal macronutrient ratios based on your personal data and
            fitness goals.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {/* Progress Steps */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>

                {/* Step 1: Input */}
                <div
                  className={`flex flex-col items-center z-10 ${currentStep >= 0 ? "text-[#FF7512]" : "text-gray-500"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 0 ? "bg-[#FF7512] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Scale className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">Your Data</span>
                </div>

                {/* Step 2: Macro Customization */}
                <div
                  className={`flex flex-col items-center z-10 ${currentStep >= 1 ? "text-[#FF7512]" : "text-gray-500"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 1 ? "bg-[#FF7512] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Sliders className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">Customize</span>
                </div>

                {/* Step 3: Results */}
                <div
                  className={`flex flex-col items-center z-10 ${currentStep >= 2 ? "text-[#FF7512]" : "text-gray-500"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 2 ? "bg-[#FF7512] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">Results</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] flex flex-col md:flex-row">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="input-form"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full p-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                      <Calculator className="mr-2 h-6 w-6 text-[#FF7512]" />
                      Your Personal Information
                    </h3>

                    <form onSubmit={calculateMetrics} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age Input */}
                        <div>
                          <label htmlFor="age" className="block text-gray-700 mb-2 font-medium">
                            Age (years)
                          </label>
                          <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g., 30"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7512] text-gray-800"
                            required
                            min="15"
                            max="100"
                          />
                        </div>

                        {/* Gender Selection */}
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Gender</label>
                          <div className="flex space-x-4">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  gender === "male" ? "border-[#FF7512] bg-[#FF7512]" : "border-gray-300"
                                } mr-2 flex items-center justify-center`}
                              >
                                {gender === "male" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="text-gray-800">Male</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border ${
                                  gender === "female" ? "border-[#FF7512] bg-[#FF7512]" : "border-gray-300"
                                } mr-2 flex items-center justify-center`}
                              >
                                {gender === "female" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="text-gray-800">Female</span>
                            </label>
                          </div>
                        </div>

                        {/* Height Input */}
                        <div>
                          <label htmlFor="height" className="block text-gray-700 mb-2 font-medium">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g., 175"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7512] text-gray-800"
                            required
                            min="100"
                            max="250"
                          />
                        </div>

                        {/* Weight Input */}
                        <div>
                          <label htmlFor="weight" className="block text-gray-700 mb-2 font-medium">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="e.g., 70"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7512] text-gray-800"
                            required
                            min="30"
                            max="300"
                            step="0.1"
                          />
                        </div>
                      </div>

                      {/* Activity Level Selection */}
                      <div>
                        <div className="flex items-center mb-2">
                          <label htmlFor="activity" className="block text-gray-700 font-medium">
                            Activity Level
                          </label>
                          <button
                            type="button"
                            className="ml-2 text-gray-500 hover:text-[#FF7512]"
                            onClick={() => setShowActivityInfo(!showActivityInfo)}
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        </div>

                        {showActivityInfo && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                            <p className="font-medium mb-1">Activity Level Explained:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {ACTIVITY_LEVELS.map((level) => (
                                <li key={level.label}>
                                  <span className="font-medium">{level.label}:</span> {level.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <select
                          id="activity"
                          value={activityLevel}
                          onChange={(e) => setActivityLevel(Number.parseFloat(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7512] appearance-none bg-white text-gray-800"
                        >
                          {ACTIVITY_LEVELS.map((level) => (
                            <option key={level.label} value={level.value}>
                              {level.label} - {level.description}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>

                      {/* Goal Selection */}
                      <div>
                        <div className="flex items-center mb-2">
                          <label htmlFor="goal" className="block text-gray-700 font-medium">
                            Your Goal
                          </label>
                          <button
                            type="button"
                            className="ml-2 text-gray-500 hover:text-[#FF7512]"
                            onClick={() => setShowGoalInfo(!showGoalInfo)}
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        </div>

                        {showGoalInfo && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                            <p className="font-medium mb-1">Goal Explained:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {GOALS.map((goalItem) => (
                                <li key={goalItem.label}>
                                  <span className="font-medium">{goalItem.label}:</span> {goalItem.description} (
                                  {goalItem.adjustment > 0 ? "+" : ""}
                                  {goalItem.adjustment} calories)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-3">
                          {GOALS.map((goalItem) => (
                            <label
                              key={goalItem.value}
                              className={`
                                flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 transition-all
                                ${
                                  goal === goalItem.value
                                    ? "border-[#FF7512] bg-[#FF7512]/5"
                                    : "border-gray-200 hover:border-gray-300"
                                }
                              `}
                            >
                              <input
                                type="radio"
                                name="goal"
                                value={goalItem.value}
                                checked={goal === goalItem.value}
                                onChange={() => setGoal(goalItem.value)}
                                className="sr-only"
                              />
                              {goalItem.value === "lose" && <Flame className="h-6 w-6 mb-2 text-red-500" />}
                              {goalItem.value === "maintain" && <Activity className="h-6 w-6 mb-2 text-blue-500" />}
                              {goalItem.value === "gain" && <Dumbbell className="h-6 w-6 mb-2 text-green-500" />}
                              <span className="font-medium text-gray-800">{goalItem.label}</span>
                              <span className="text-xs text-gray-600 mt-1">
                                {goalItem.adjustment > 0 ? "+" : ""}
                                {goalItem.adjustment} cal
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          className="bg-[#FF7512] hover:bg-[#e66a0f] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>

                        {isCalculated && (
                          <button
                            type="button"
                            onClick={resetCalculator}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-all duration-300"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="macro-customization"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full p-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                      <Sliders className="mr-2 h-6 w-6 text-[#FF7512]" />
                      Customize Your Macronutrient Ratio
                    </h3>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-bold text-gray-800 mr-2">Daily Calorie Target</h4>
                          <span className="bg-[#FF7512]/10 text-[#FF7512] text-sm px-2 py-1 rounded-full">
                            {GOALS.find((g) => g.value === goal)?.label}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-[#FF7512]">
                          {targetCalories} <span className="text-sm font-normal text-[#FF7512]/70">calories</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700">
                          Based on your {gender === "male" ? "male" : "female"} profile (age: {age}, height: {height}cm,
                          weight: {weight}kg) and{" "}
                          {ACTIVITY_LEVELS.find((a) => a.value === activityLevel)?.label.toLowerCase()} lifestyle, we
                          recommend {targetCalories} calories per day to{" "}
                          {goal === "lose" ? "lose" : goal === "gain" ? "gain" : "maintain"} weight.
                        </p>
                      </div>
                    </div>

                    {/* Macro Ratio Customization */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-bold text-gray-800 mr-2">Macronutrient Distribution</h4>
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="text-gray-500 hover:text-[#FF7512] mr-2"
                              onClick={() => setShowMacroInfo(!showMacroInfo)}
                            >
                              <Info className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-[#FF7512]"
                              onClick={() => setShowRangeInfo(!showRangeInfo)}
                            >
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {showMacroInfo && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                          <p className="font-medium mb-1">Macronutrients Explained:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <span className="font-medium">Protein (4 calories/gram):</span> Essential for muscle
                              repair and growth.
                            </li>
                            <li>
                              <span className="font-medium">Carbohydrates (4 calories/gram):</span> Your body's primary
                              energy source.
                            </li>
                            <li>
                              <span className="font-medium">Fat (9 calories/gram):</span> Important for hormone
                              production and nutrient absorption.
                            </li>
                          </ul>
                        </div>
                      )}

                      {showRangeInfo && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                          <p className="font-medium mb-1">Recommended Ranges:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <span className="font-medium">Protein:</span> {MACRO_RANGES.protein.min}% -{" "}
                              {MACRO_RANGES.protein.max}% of total calories
                            </li>
                            <li>
                              <span className="font-medium">Carbohydrates:</span> {MACRO_RANGES.carbs.min}% -{" "}
                              {MACRO_RANGES.carbs.max}% of total calories
                            </li>
                            <li>
                              <span className="font-medium">Fat:</span> {MACRO_RANGES.fat.min}% - {MACRO_RANGES.fat.max}
                              % of total calories
                            </li>
                          </ul>
                          <p className="mt-2 text-xs">
                            Values outside these ranges will be highlighted in red. While you can set any values that
                            add up to 100%, staying within these ranges is generally recommended for optimal health.
                          </p>
                        </div>
                      )}

                      {/* Interactive Macro Distribution Visualization */}
                      <div className="mb-8">
                        <div className="relative h-16 bg-gray-200 rounded-lg overflow-hidden mb-4">
                          {/* Protein Bar */}
                          <div
                            className={`absolute top-0 bottom-0 left-0 ${getMacroBgColor("protein")}`}
                            style={{ width: `${macroRatios.protein}%` }}
                          ></div>
                          {/* Carbs Bar */}
                          <div
                            className={`absolute top-0 bottom-0 ${getMacroBgColor("carbs")}`}
                            style={{ left: `${macroRatios.protein}%`, width: `${macroRatios.carbs}%` }}
                          ></div>
                          {/* Fat Bar */}
                          <div
                            className={`absolute top-0 bottom-0 ${getMacroBgColor("fat")}`}
                            style={{
                              left: `${macroRatios.protein + macroRatios.carbs}%`,
                              width: `${macroRatios.fat}%`,
                            }}
                          ></div>

                          {/* Labels */}
                          <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold">
                            <div
                              className="flex items-center"
                              style={{ visibility: macroRatios.protein < 10 ? "hidden" : "visible" }}
                            >
                              <Beef className="h-4 w-4 mr-1" />
                              <span>{macroRatios.protein}%</span>
                            </div>
                            <div
                              className="flex items-center"
                              style={{ visibility: macroRatios.carbs < 10 ? "hidden" : "visible" }}
                            >
                              <Wheat className="h-4 w-4 mr-1" />
                              <span>{macroRatios.carbs}%</span>
                            </div>
                            <div
                              className="flex items-center"
                              style={{ visibility: macroRatios.fat < 10 ? "hidden" : "visible" }}
                            >
                              <Apple className="h-4 w-4 mr-1" />
                              <span>{macroRatios.fat}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mb-6">
                          <div className="inline-flex items-center space-x-4">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#FF7512] rounded-full mr-1"></div>
                              <span className="text-sm text-gray-700">Protein</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                              <span className="text-sm text-gray-700">Carbs</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                              <span className="text-sm text-gray-700">Fat</span>
                            </div>
                          </div>
                        </div>

                        {/* Macro Sliders */}
                        <div className="space-y-6">
                          {/* Protein Slider */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Beef className={`h-5 w-5 mr-2 ${getMacroColor("protein")}`} />
                                <span className="font-medium text-gray-800">Protein</span>
                                <button
                                  type="button"
                                  onClick={() => toggleMacroLock("protein")}
                                  className={`ml-2 ${
                                    macroLock === "protein" ? "text-[#FF7512]" : "text-gray-500 hover:text-gray-700"
                                  }`}
                                >
                                  {macroLock === "protein" ? (
                                    <Lock className="h-4 w-4" />
                                  ) : (
                                    <Unlock className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`text-sm font-medium ${
                                    isMacroInRange("protein") ? getMacroColor("protein") : "text-red-500"
                                  }`}
                                >
                                  {macroRatios.protein}%
                                </span>
                                <span className="text-xs text-gray-600 ml-1">
                                  ({MACRO_RANGES.protein.min}-{MACRO_RANGES.protein.max}%)
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => adjustMacro("protein", -5)}
                                disabled={macroLock === "protein"}
                                className={`p-1 rounded-l-md ${
                                  macroLock === "protein"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={macroRatios.protein}
                                onChange={(e) => handleMacroChange("protein", Number.parseInt(e.target.value))}
                                disabled={macroLock === "protein"}
                                className="flex-1 mx-2 accent-[#FF7512]"
                              />
                              <button
                                onClick={() => adjustMacro("protein", 5)}
                                disabled={macroLock === "protein"}
                                className={`p-1 rounded-r-md ${
                                  macroLock === "protein"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex justify-between text-xs text-gray-600">
                              <span>0%</span>
                              <span>50%</span>
                              <span>100%</span>
                            </div>
                          </div>

                          {/* Carbs Slider */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Wheat className={`h-5 w-5 mr-2 ${getMacroColor("carbs")}`} />
                                <span className="font-medium text-gray-800">Carbohydrates</span>
                                <button
                                  type="button"
                                  onClick={() => toggleMacroLock("carbs")}
                                  className={`ml-2 ${
                                    macroLock === "carbs" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
                                  }`}
                                >
                                  {macroLock === "carbs" ? (
                                    <Lock className="h-4 w-4" />
                                  ) : (
                                    <Unlock className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`text-sm font-medium ${
                                    isMacroInRange("carbs") ? getMacroColor("carbs") : "text-red-500"
                                  }`}
                                >
                                  {macroRatios.carbs}%
                                </span>
                                <span className="text-xs text-gray-600 ml-1">
                                  ({MACRO_RANGES.carbs.min}-{MACRO_RANGES.carbs.max}%)
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => adjustMacro("carbs", -5)}
                                disabled={macroLock === "carbs"}
                                className={`p-1 rounded-l-md ${
                                  macroLock === "carbs"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={macroRatios.carbs}
                                onChange={(e) => handleMacroChange("carbs", Number.parseInt(e.target.value))}
                                disabled={macroLock === "carbs"}
                                className="flex-1 mx-2 accent-blue-500"
                              />
                              <button
                                onClick={() => adjustMacro("carbs", 5)}
                                disabled={macroLock === "carbs"}
                                className={`p-1 rounded-r-md ${
                                  macroLock === "carbs"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex justify-between text-xs text-gray-600">
                              <span>0%</span>
                              <span>50%</span>
                              <span>100%</span>
                            </div>
                          </div>

                          {/* Fat Slider */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Apple className={`h-5 w-5 mr-2 ${getMacroColor("fat")}`} />
                                <span className="font-medium text-gray-800">Fat</span>
                                <button
                                  type="button"
                                  onClick={() => toggleMacroLock("fat")}
                                  className={`ml-2 ${
                                    macroLock === "fat" ? "text-green-500" : "text-gray-500 hover:text-gray-700"
                                  }`}
                                >
                                  {macroLock === "fat" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                                </button>
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`text-sm font-medium ${
                                    isMacroInRange("fat") ? getMacroColor("fat") : "text-red-500"
                                  }`}
                                >
                                  {macroRatios.fat}%
                                </span>
                                <span className="text-xs text-gray-600 ml-1">
                                  ({MACRO_RANGES.fat.min}-{MACRO_RANGES.fat.max}%)
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => adjustMacro("fat", -5)}
                                disabled={macroLock === "fat"}
                                className={`p-1 rounded-l-md ${
                                  macroLock === "fat"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={macroRatios.fat}
                                onChange={(e) => handleMacroChange("fat", Number.parseInt(e.target.value))}
                                disabled={macroLock === "fat"}
                                className="flex-1 mx-2 accent-green-500"
                              />
                              <button
                                onClick={() => adjustMacro("fat", 5)}
                                disabled={macroLock === "fat"}
                                className={`p-1 rounded-r-md ${
                                  macroLock === "fat"
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex justify-between text-xs text-gray-600">
                              <span>0%</span>
                              <span>50%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>

                        {/* Preset Buttons */}
                        <div className="mt-8">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Quick Presets:</h5>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setMacroRatios({ protein: 30, carbs: 40, fat: 30 })}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              Balanced (30/40/30)
                            </button>
                            <button
                              type="button"
                              onClick={() => setMacroRatios({ protein: 40, carbs: 40, fat: 20 })}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              High Protein (40/40/20)
                            </button>
                            <button
                              type="button"
                              onClick={() => setMacroRatios({ protein: 20, carbs: 60, fat: 20 })}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              High Carb (20/60/20)
                            </button>
                            <button
                              type="button"
                              onClick={() => setMacroRatios({ protein: 30, carbs: 20, fat: 50 })}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              Keto-Like (30/20/50)
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Macro Preview */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-3">Preview of Your Daily Macros:</h5>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center">
                            <div className="text-lg font-bold text-[#FF7512]">
                              {Math.round((targetCalories! * macroRatios.protein) / 100 / 4)}g
                            </div>
                            <div className="text-sm text-gray-600">Protein</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-lg font-bold text-blue-500">
                              {Math.round((targetCalories! * macroRatios.carbs) / 100 / 4)}g
                            </div>
                            <div className="text-sm text-gray-600">Carbs</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-lg font-bold text-green-500">
                              {Math.round((targetCalories! * macroRatios.fat) / 100 / 9)}g
                            </div>
                            <div className="text-sm text-gray-600">Fat</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(0)}
                        className="flex items-center text-gray-700 hover:text-[#FF7512] transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Back to Inputs
                      </button>

                      <button
                        onClick={proceedToResults}
                        className="bg-[#FF7512] hover:bg-[#e66a0f] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
                      >
                        View Complete Results
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full p-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                      <BarChart3 className="mr-2 h-6 w-6 text-[#FF7512]" />
                      Your Complete Results
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* BMI Results */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                          <Scale className="mr-2 h-5 w-5 text-[#FF7512]" />
                          Body Mass Index (BMI)
                        </h4>

                        <div className="flex items-center justify-center mb-4">
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke={getBMIColor().replace("text-", "")}
                                strokeWidth="10"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * Math.min(bmi || 0, 40)) / 40}
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className={`text-3xl font-bold ${getBMIColor()}`}>{bmi}</span>
                              <span className="text-sm text-gray-600">BMI</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mb-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              bmiCategory === "Underweight"
                                ? "bg-blue-100 text-blue-800"
                                : bmiCategory === "Normal weight"
                                  ? "bg-green-100 text-green-800"
                                  : bmiCategory === "Overweight"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {bmiCategory}
                          </span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg text-sm">
                          <p className="text-gray-700">{getHealthTip()}</p>
                        </div>
                      </div>

                      {/* Calorie Results */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                          <Flame className="mr-2 h-5 w-5 text-[#FF7512]" />
                          Calorie Calculations
                        </h4>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="text-sm text-gray-600">Basal Metabolic Rate</span>
                              <div className="font-medium text-gray-800">BMR</div>
                            </div>
                            <div className="text-xl font-bold text-gray-800">
                              {bmr} <span className="text-sm font-normal text-gray-600">cal</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="text-sm text-gray-600">Total Daily Energy Expenditure</span>
                              <div className="font-medium text-gray-800">TDEE</div>
                            </div>
                            <div className="text-xl font-bold text-gray-800">
                              {tdee} <span className="text-sm font-normal text-gray-600">cal</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-[#FF7512]/10 rounded-lg border border-[#FF7512]/20">
                            <div>
                              <span className="text-sm text-[#FF7512]/80">Daily Target for Your Goal</span>
                              <div className="font-medium text-gray-800">
                                {GOALS.find((g) => g.value === goal)?.label}
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-[#FF7512]">
                              {targetCalories} <span className="text-sm font-normal text-[#FF7512]/70">cal</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Macro Distribution */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                      <h4 className="text-lg font-bold mb-6 text-gray-800 flex items-center">
                        <Utensils className="mr-2 h-5 w-5 text-[#FF7512]" />
                        Your Macronutrient Plan
                      </h4>

                      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        {/* Pie Chart */}
                        <div className="relative w-48 h-48">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Protein Slice */}
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#FF7512"
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * macroRatios.protein) / 100}
                              transform="rotate(-90 50 50)"
                            />
                            {/* Carbs Slice */}
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * macroRatios.carbs) / 100}
                              transform={`rotate(${(macroRatios.protein / 100) * 360 - 90} 50 50)`}
                            />
                            {/* Fat Slice */}
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * macroRatios.fat) / 100}
                              transform={`rotate(${((macroRatios.protein + macroRatios.carbs) / 100) * 360 - 90} 50 50)`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-sm text-gray-600">Total</span>
                            <span className="text-xl font-bold text-gray-800">{targetCalories}</span>
                            <span className="text-xs text-gray-600">calories</span>
                          </div>
                        </div>

                        {/* Macro Details */}
                        <div className="flex-1 space-y-4">
                          {/* Protein */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#FF7512] rounded-full mr-2"></div>
                                <span className="font-medium text-gray-800">Protein</span>
                              </div>
                              <div className="text-sm text-gray-600">{macroRatios.protein}%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-[#FF7512] h-2 rounded-full"
                                  style={{ width: `${macroRatios.protein}%` }}
                                ></div>
                              </div>
                              <div className="text-sm font-bold text-gray-800">{macros?.protein}g</div>
                            </div>
                          </div>

                          {/* Carbs */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="font-medium text-gray-800">Carbs</span>
                              </div>
                              <div className="text-sm text-gray-600">{macroRatios.carbs}%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${macroRatios.carbs}%` }}
                                ></div>
                              </div>
                              <div className="text-sm font-bold text-gray-800">{macros?.carbs}g</div>
                            </div>
                          </div>

                          {/* Fat */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="font-medium text-gray-800">Fat</span>
                              </div>
                              <div className="text-sm text-gray-600">{macroRatios.fat}%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${macroRatios.fat}%` }}
                                ></div>
                              </div>
                              <div className="text-sm font-bold text-gray-800">{macros?.fat}g</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Macro Calculation Explanation */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h5 className="font-medium text-gray-800 mb-2">How We Calculated Your Macros:</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>
                              <strong>Protein:</strong> {macroRatios.protein}% of {targetCalories} calories ={" "}
                              {Math.round((targetCalories! * macroRatios.protein) / 100)} calories ÷ 4 calories/gram ={" "}
                              <strong>{macros?.protein}g</strong> of protein daily
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>
                              <strong>Carbs:</strong> {macroRatios.carbs}% of {targetCalories} calories ={" "}
                              {Math.round((targetCalories! * macroRatios.carbs) / 100)} calories ÷ 4 calories/gram ={" "}
                              <strong>{macros?.carbs}g</strong> of carbohydrates daily
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>
                              <strong>Fat:</strong> {macroRatios.fat}% of {targetCalories} calories ={" "}
                              {Math.round((targetCalories! * macroRatios.fat) / 100)} calories ÷ 9 calories/gram ={" "}
                              <strong>{macros?.fat}g</strong> of fat daily
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Nutrition Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {/* Protein Card */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF7512]/10 flex items-center justify-center mr-3">
                            <Beef className="h-5 w-5 text-[#FF7512]" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-800">Protein</h5>
                            <p className="text-sm text-gray-600">4 calories per gram</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-[#FF7512]">{macros?.protein}g</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((targetCalories! * macroRatios.protein) / 100)} calories
                          </div>
                        </div>
                      </div>

                      {/* Carbs Card */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                            <Wheat className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-800">Carbohydrates</h5>
                            <p className="text-sm text-gray-600">4 calories per gram</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-blue-500">{macros?.carbs}g</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((targetCalories! * macroRatios.carbs) / 100)} calories
                          </div>
                        </div>
                      </div>

                      {/* Fat Card */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                            <Apple className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-800">Fat</h5>
                            <p className="text-sm text-gray-600">9 calories per gram</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-green-500">{macros?.fat}g</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((targetCalories! * macroRatios.fat) / 100)} calories
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <Heart className="h-5 w-5 text-[#FF7512] mr-2" />
                        Nutrition Tips
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <div className="min-w-4 h-4 rounded-full bg-[#FF7512] mt-1 mr-2"></div>
                          <span>
                            Focus on whole, unprocessed foods like lean meats, fish, eggs, dairy, fruits, vegetables,
                            whole grains, and nuts.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 h-4 rounded-full bg-[#FF7512] mt-1 mr-2"></div>
                          <span>Stay hydrated by drinking at least 8 glasses of water daily.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 h-4 rounded-full bg-[#FF7512] mt-1 mr-2"></div>
                          <span>
                            Distribute your protein intake throughout the day for optimal muscle protein synthesis.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 h-4 rounded-full bg-[#FF7512] mt-1 mr-2"></div>
                          <span>
                            Consider timing your carbohydrate intake around your workouts for better performance and
                            recovery.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center text-gray-700 hover:text-[#FF7512] transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Back to Customize
                      </button>

                      <button
                        onClick={resetCalculator}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition-all duration-300"
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
