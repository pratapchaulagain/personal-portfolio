"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"

export function SubHeading({
  children,
  as = "p",
  className,
}: {
  children: React.ReactNode
  as?: "h3" | "p" | "div"
  className?: string
}) {
  const Tag = motion[as] || "h3"
  return (
    <Tag
      initial={{
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={cn(
        "animate-fade-in-blur text-base text-muted-foreground sm:max-w-3xl sm:text-lg",
        as === "h3" && "font-medium",
        className
      )}
    >
      {children}
    </Tag>
  )
}
