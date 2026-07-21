"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimatedDiv } from "@/components/ui/animated-div"

export function Cta() {
  const t = useTranslations("shared")

  return (
    <AnimatedDiv className="flex items-center gap-4">
      <Button
        nativeButton={false}
        variant="default"
        render={
          <Link href="/poems" rel="noopener noreferrer">
            {t("cta.lable1")}
          </Link>
        }
      ></Button>
      <Button
        nativeButton={false}
        variant="outline"
        render={
          <Link href="/awards" rel="noopener noreferrer">
            {t("cta.lable2")}
          </Link>
        }
      ></Button>
    </AnimatedDiv>
  )
}
