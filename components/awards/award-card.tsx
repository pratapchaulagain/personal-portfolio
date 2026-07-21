"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AwardDataType } from "./awards-section"

export function AwardCard({
  item,
  i,
  onOpen,
}: {
  item: AwardDataType
  i: number
  onOpen: () => void
}) {
  return (
    <motion.button
      type="button"
      initial={{
        opacity: 0,
        filter: "blur(15px)",
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: i * 0.26,
        ease: "anticipate",
      }}
      key={i}
      onClick={onOpen}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg text-left",
        item.className
      )}
    >
      <motion.div layoutId={`award-image-${i}`} className="relative">
        <Image
          width={250}
          height={250}
          alt={item.title}
          src={item.image}
          className="h-70 w-full rounded-lg mask-b-from-30% object-cover object-center transition duration-300 group-hover:scale-105"
        />
      </motion.div>
      <motion.div className="absolute bottom-2 left-2 z-10 w-full">
        <div className="flex w-full flex-wrap justify-between gap-2 pr-6 font-devanagari">
          <motion.p
            layoutId={`award-title-${item.title}-${i}`}
            className="font-medium tracking-wide"
          >
            {item.title}
          </motion.p>
          <motion.p layoutId={`award-date-${item.date}-${i}`}>
            {item.date}
          </motion.p>
        </div>
      </motion.div>
    </motion.button>
  )
}
