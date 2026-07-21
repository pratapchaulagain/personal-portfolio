"use client"

import { AnimatedDiv } from "@/components/ui/animated-div"
import {
  IconTrophy,
  IconBook,
  IconPencil,
  IconProps,
} from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

type Stat = {
  title: string
  value: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

export function Stats() {
  const t = useTranslations("shared")
  const stats: Stat[] = [
    {
      title: t("stats.poems.label"),
      value: t("stats.poems.value"),
      icon: IconBook,
    },
    {
      title: t("stats.awards.label"),
      value: t("stats.awards.value"),
      icon: IconTrophy,
    },
    {
      title: t("stats.essays.label"),
      value: t("stats.essays.value"),
      icon: IconPencil,
    },
  ]
  return (
    <AnimatedDiv className="flex flex-wrap items-center gap-12">
      {stats.map((stat, i) => (
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: i * 0.4,
            ease: "easeInOut",
          }}
          key={stat.title}
          className="flex items-center gap-2"
        >
          <stat.icon className="size-12 rounded-lg bg-muted p-3 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </span>
            <span className="text-xl font-medium">{stat.value} +</span>
          </div>
        </motion.div>
      ))}
    </AnimatedDiv>
  )
}
