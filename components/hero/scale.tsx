"use client"

import { motion } from "motion/react"

export function ScaleRight() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="top-0 right-0 hidden h-full w-4 border-x border-primary/5 bg-[repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] bg-size-[10px_10px] text-primary/5 sm:absolute lg:w-9"
    ></motion.div>
  )
} 

export function ScaleLeft() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="top-0 left-0 hidden h-full w-4 border-x border-primary/5 bg-[repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] bg-size-[10px_10px] text-primary/5 sm:absolute lg:w-9"
    ></motion.div>
  )
}
