"use client"

import { cn } from "@/lib/utils"
import {
  motion,
  SpringOptions,
  useInView,
  useSpring,
  useTransform,
} from "motion/react"
import { useEffect, useRef } from "react"

export type AnimatedNumberProps = {
  value: number
  className?: string
  springOptions?: SpringOptions
  as?: React.ElementType
  suffix?: string
}

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  suffix = "",
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as as React.ElementType)

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 20,
    ...springOptions,
  })

  const display = useTransform(
    spring,
    (current) => `${Math.round(current).toLocaleString()}${suffix}`
  )

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, value, spring])

  return (
    // eslint-disable-next-line react-hooks/static-components
    <MotionComponent ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  )
}
