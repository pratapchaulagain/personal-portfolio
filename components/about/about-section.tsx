"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubHeading } from "@/components/ui/sub-heading"
import { ContactsInfo } from "../contact/contact-info"

export function AboutSection() {
  const t = useTranslations("aboutSection")

  return (
    <Section id="poems" className="space-y-6">
      <Heading className="mb-0 font-medium">
        <AnimatedText text={t("title")} delay={0.03} />
      </Heading>
      <ContactsInfo className="py-4" />
      <AnimatedText
        text={t("subtitle")}
        delay={0.03}
        className="text-lg font-medium text-muted-foreground"
      />

      <div className="flex flex-col gap-2">
        <SubHeading
          as="div"
          className="text-lg font-medium text-foreground sm:text-xl"
        >
          <AnimatedText text={t("intro.label")} />
        </SubHeading>
        <AnimatedText
          text={t("intro.description")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SubHeading
          as="div"
          className="text-lg font-medium text-foreground sm:text-xl"
        >
          <AnimatedText text={t("journey.label")} />
        </SubHeading>
        <AnimatedText
          text={t("journey.description")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SubHeading
          as="div"
          className="text-lg font-medium text-foreground sm:text-xl"
        >
          <AnimatedText text={t("writing.label")} />
        </SubHeading>
        <AnimatedText
          text={t("writing.description1")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
        <AnimatedText
          text={t("writing.description2")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
        <AnimatedText
          text={t("writing.description3")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
        <AnimatedText
          text={t("writing.description4")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SubHeading
          as="div"
          className="text-lg font-medium text-foreground sm:text-xl"
        >
          <AnimatedText text={t("education.label")} />
        </SubHeading>
        <AnimatedText
          text={t("education.description1")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
        <AnimatedText
          text={t("education.description2")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
        <AnimatedText
          text={t("education.description3")}
          delay={0.03}
          className="text-lg text-muted-foreground"
        />
      </div>
    </Section>
  )
}
