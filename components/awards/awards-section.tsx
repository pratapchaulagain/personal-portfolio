"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react"

import { Section } from "@/components/ui/section"
import { SubHeading } from "@/components/ui/sub-heading"
import { Heading } from "@/components/ui/heading"
import { AnimatedText } from "@/components/ui/animated-text"

import { AwardCard } from "./award-card"

export type AwardDataType = {
  image: string
  title: string
  date: string
  className: string
}

const data: AwardDataType[] = [
  {
    image: "/a1.jpeg",
    title:
      "सहिद मनोज झपेन्द्र सुरेन्द्र स्मृति प्रतिष्ठानद्वारा आयोजित राष्ट्रिय कविता प्रतियोगिता",
    date: "२०८२",
    className: "col-span-1",
  },
  {
    image: "/a3.jpeg",
    title: "ईको विश्वव्यापी खुल्ला कविता प्रतियोगिता",
    className: "col-span-2",
    date: "२०८३",
  },
  {
    image: "/a4.jpeg",
    title: "सर्जक चौतारी ओखलढुंगाद्वारा आयोजित खुल्ला कविता प्रतियोगिता",
    className: "col-span-2",
    date: "२०८३",
  },
  {
    image: "/a5.jpeg",
    title: "सर्जक चौतारी ओखलढुंगाद्वारा आयोजित खुल्ला कविता प्रतियोगिता",
    className: "col-span-1",
    date: "२०८३",
  },
]

export function AwardsSection() {
  const t = useTranslations("awardSection")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedItem = selectedIndex !== null ? data[selectedIndex] : null

  const openAward = (index: number) => setSelectedIndex(index)
  const closeAward = () => setSelectedIndex(null)
  const goToPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return data.length - 1
      return (current - 1 + data.length) % data.length
    })
  }
  const goToNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return 0
      return (current + 1) % data.length
    })
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAward()
      }
      if (event.key === "ArrowLeft") {
        goToPrevious()
      }
      if (event.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  return (
    <Section id="awards">
      <Heading>
        <AnimatedText text={t("title")} delay={0.05} />
      </Heading>
      <SubHeading as="div">
        <AnimatedText text={t("description")} />
      </SubHeading>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {data.map((item, i) => (
          <AwardCard item={item} i={i} key={i} onOpen={() => openAward(i)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && selectedIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-sm"
            onClick={closeAward}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "circOut" }}
              className="relative w-full max-w-xl overflow-hidden rounded-lg border border-white/10 bg-background/95 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeAward}
                className="absolute top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition hover:bg-background"
                aria-label="Close award"
              >
                <IconX size={18} />
              </button>

              <div className="flex flex-col">
                <motion.div
                  layoutId={`award-image-${selectedIndex}`}
                  className="relative overflow-hidden p-4 md:aspect-auto"
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="h-full w-full rounded-lg object-cover"
                    width={500}
                    height={500}
                  />
                </motion.div>

                <div className="flex flex-col justify-between gap-2 p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium tracking-[0.35em] text-muted-foreground uppercase">
                        Award {selectedIndex + 1} / {data.length}
                      </p>
                      <motion.p
                        layoutId={`award-date-${selectedItem.date}-${selectedIndex}`}
                        className="rounded-full border border-border px-3 py-1 text-sm font-medium"
                      >
                        {selectedItem.date}
                      </motion.p>
                    </div>

                    <div className="space-y-2">
                      <motion.h3
                        layoutId={`award-title-${selectedItem.title}-${selectedIndex}`}
                        className="font-devanagari text-base leading-snug font-medium text-foreground sm:text-lg"
                      >
                        {selectedItem.title}
                      </motion.h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="flex items-center gap-2 rounded-full border border-border p-2 text-sm font-medium transition hover:bg-muted"
                    >
                      <IconChevronLeft size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={goToNext}
                      className="flex items-center gap-2 rounded-full border border-border p-2 text-sm font-medium transition hover:bg-muted"
                    >
                      <IconChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  )
}
