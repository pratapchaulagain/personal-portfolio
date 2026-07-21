"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"

type AnimatedTextProps = {
  text: string
  duration?: number
  delay?: number
  className?: string
}

export function AnimatedText({
  text,
  className,
  duration = 0.4,
  delay = 0.03,
}: AnimatedTextProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, {
    once: true,
    margin: "-20% 0px",
  })

  useEffect(() => {
    if (!isInView) return

    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        duration,
        ease: "easeInOut",
        delay: stagger(delay),
      }
    )
  }, [isInView, animate, duration, delay])

  return (
    <div ref={scope} className={cn("leading-snug wrap-break-word", className)}>
      {text.split(" ").map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block"
          style={{
            opacity: 0,
            filter: "blur(10px)",
            y: 10,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  )
}
