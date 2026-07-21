"use client"

import { useLocale, useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { SubHeading } from "@/components/ui/sub-heading"
import { Heading } from "@/components/ui/heading"
import { AnimatedText } from "@/components/ui/animated-text"

import { PoemCard } from "./poem-card"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import Link from "next/link"
import { getPoems, LocaleType } from "@/data/poems"

export function PoemsSection({ home = false }: { home?: boolean }) {
  const t = useTranslations("poemSection")

  const locale = useLocale() as LocaleType

  const POEMS = getPoems(locale)

  return (
    <Section id="poems">
      <Heading>
        <AnimatedText text={t("title")} delay={0.05} />
      </Heading>
      <SubHeading as="div">
        <AnimatedText text={t("description")} />
      </SubHeading>

      <div className="mt-6 grid space-y-4">
        {(home ? POEMS.slice(0, 3) : POEMS).map((poem, i) => (
          <PoemCard key={poem.title} poem={poem} i={i + 1} />
        ))}
      </div>

      {home && (
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
          className="mt-6 flex justify-center"
        >
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={"/poems"}> {t("viewAll")}</Link>}
          ></Button>
        </motion.div>
      )}
    </Section>
  )
}
