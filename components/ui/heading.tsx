"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"

export function Heading({
  children,
  as = "h2",
  className,
}: {
  children: React.ReactNode
  as?: "h1" | "h2"
  className?: string
}) {
  const Tag = motion[as]

  return (
    <Tag
      initial={{
        opacity: 0,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "mb-3 text-2xl font-bold sm:text-5xl",
        as === "h2" &&
          "animate-fade-in-blur text-3xl font-medium sm:text-4xl sm:font-semibold",
        className
      )}
    >
      {children}
    </Tag>
  )
}
