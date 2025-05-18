"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

interface AccordionItemProps {
  number: string
  question: string
  answer: string
  isOpen: boolean
  toggleAccordion: () => void
}

const AccordionItem = ({ number, question, answer, isOpen, toggleAccordion }: AccordionItemProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between bg-[#0c1425] p-6 cursor-pointer" onClick={toggleAccordion}>
        <div className="flex items-center">
          <span className="text-[#FF7512] mr-4 text-xl font-bold">{number}</span>
          <h3 className="text-white text-xl font-medium">{question}</h3>
        </div>
        <button className="text-white">{isOpen ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#0c1425]"
          >
            <div className="p-6 pt-0 text-gray-300">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function About() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const faqItems = [
    {
      id: "01",
      question: "How do I know if my brakes need to be replaced?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stan. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: "02",
      question: "How do I know which gym class is right for me?",
      answer:
        "Our trainers can help assess your fitness level and goals to recommend the perfect class. We offer a variety of options from beginner to advanced, including HIIT, yoga, strength training, and cardio classes. You can also try a free trial class to see what works best for you.",
    },
    {
      id: "03",
      question: "Do I need to bring any equipment to a gym class?",
      answer:
        "Most classes provide all necessary equipment. We recommend bringing a water bottle, towel, and wearing comfortable workout clothes. For yoga classes, you may want to bring your own mat if you prefer, though we do provide mats for all participants.",
    },
    {
      id: "04",
      question: "Can I join a gym any type of class if I'm a beginner?",
      answer:
        "We welcome all fitness levels in our classes. Our instructors provide modifications for beginners and will help you learn proper form. We also offer specific beginner-friendly classes that focus on fundamentals and proper technique.",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="min-h-screen py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#FF7512]/20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#FF7512]/10 blur-xl"></div>
            <Image
              src="/about-us-image.png"
              alt="Fitness trainers"
              width={600}
              height={800}
              className="rounded-lg relative z-10 shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#FF7512] rounded-lg z-0"></div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.div variants={itemVariants}>
              <h3 className="text-[#FF7512] text-xl mb-2">About Us</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                HERE GYM FITNESS MEETS{" "}
                <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: "2px #FF7512" }}>
                  EXCELLENCE!
                </span>
              </h2>
              <p className="text-gray-300 mb-10">
                Founded in 2010, Olympic Fitness began with a simple mission: to create a fitness community where
                everyone feels empowered to achieve their personal best. What started as a small local gym has grown
                into a premier fitness destination with state-of-the-art equipment and world-class trainers.
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div variants={itemVariants} className="mt-8">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  number={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openAccordion === item.id}
                  toggleAccordion={() => toggleAccordion(item.id)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
