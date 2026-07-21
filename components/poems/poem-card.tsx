"use client"

import { SubHeading } from "@/components/ui/sub-heading"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { CopyButton } from "@/components/shared/copy-button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import {
  ChevronsUpDownIcon,
  ChevronsUpDownIconHandle,
} from "@/components/ui/chevrons-up-down-icon"
import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { LocaleType, Poem } from "@/data/poems"
import { AudioPlayer } from "@/components/shared/audio-player"
import { Button } from "@/components/ui/button"
import { IconCheck, IconLink, IconShare3 } from "@tabler/icons-react"
import { useShare } from "@/hooks/use-share"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Route } from "next"

export function PoemCard({
  poem,
  className,
  i,
}: {
  poem: Poem
  className?: string
  i: number
}) {
  const { copy } = useCopyToClipboard()

  const locale = useLocale() as LocaleType

  const [open, setOpen] = useState(false)
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null)

  const pathname = usePathname()
  const { isShared, share } = useShare({
    title: poem.title,
    text: poem.content,
    shareUrl: `${pathname}/poems/${poem.id}`,
  })

  useEffect(() => {
    const controls = chevronsUpDownIconRef.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [open])

  const handleCopy = () => {
    copy(poem.content)
  }

  const t = useTranslations("poemSection")

  return (
    <motion.article
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
        duration: 0.03 * i,
        ease: "easeInOut",
      }}
      className={cn(
        "relative w-auto rounded-lg bg-poem-card p-4 sm:p-6",
        locale === "en" ? "font-manrope" : "font-devanagari",
        className
      )}
    >
      <motion.button
        data-open={open}
        onClick={() => setOpen((open) => !open)}
        className={cn(
          "group relative flex w-full cursor-pointer flex-wrap justify-between gap-2 sm:items-center"
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SubHeading
            as="h3"
            className="font-devanagari font-medium text-accent-foreground sm:text-xl"
          >
            {i}. {poem.title}
          </SubHeading>
          {poem.subtitle && (
            <p className="text-sm text-muted-foreground">{poem.subtitle}</p>
          )}
        </div>
        <ChevronsUpDownIcon
          ref={chevronsUpDownIconRef}
          duration={0.2}
          className="size-5 text-muted-foreground duration-150 group-hover:text-foreground"
        />
      </motion.button>
      <motion.pre
        animate={{
          height: open ? "auto" : 100,
        }}
        className={cn(
          "overflow-hidden font-devanagari leading-relaxed font-normal text-poem sm:text-lg",
          !open && "mask-b-from-30%"
        )}
      >
        {poem.content}
      </motion.pre>
      <AudioPlayer id={poem.id} src={poem.src} className="my-4" />
      <div className="flex items-center gap-4">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setOpen((open) => !open)}
          className={"text-sm text-muted-foreground hover:text-foreground"}
        >
          {!open ? t("show") : t("hide")}
        </Button>

        <Button
          variant={"outline"}
          size={"sm"}
          onClick={share}
          className={"text-muted-foreground hover:text-primary"}
        >
          {isShared ? (
            <IconCheck className="size-3.5 text-green-600 sm:size-4" />
          ) : (
            <IconShare3 className="size-3.5 sm:size-4" />
          )}
        </Button>

        <Button
          variant={"outline"}
          nativeButton={false}
          size={"sm"}
          className={"text-muted-foreground hover:text-primary"}
          render={
            <Link href={`/poems/${poem.id}` as Route}>
              <IconLink className="size-3.5 sm:size-4" />
            </Link>
          }
        ></Button>
        <CopyButton
          text={poem.content}
          onCopySuccess={() => console.log("Copied")}
          onCopyError={(error) => console.error("Copy error:", error)}
          onClick={handleCopy}
          className="relative rounded-md border bg-muted px-2.25 py-1.75 hover:text-neutral-950"
        />
      </div>
    </motion.article>
  )
}
