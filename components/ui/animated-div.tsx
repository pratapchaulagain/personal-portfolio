"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type Props = {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function AnimatedDiv(props: Props) {
  const { children, className, duration = 0.5 } = props
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 10,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
