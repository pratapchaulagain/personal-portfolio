"use client"

import { useLocale } from "next-intl"
import { motion } from "motion/react"
import { IconCheck, IconShare3 } from "@tabler/icons-react"

import { AudioPlayer } from "@/components/shared/audio-player"
import { SubHeading } from "@/components/ui/sub-heading"
import { cn } from "@/lib/utils"
import type { LocaleType, Poem } from "@/data/poems"
import { useShare } from "@/hooks/use-share"
import { CopyButton } from "@/components/shared/copy-button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

type SinglePoemViewProps = {
  poem: Poem
}

export function SinglePoemView({ poem }: SinglePoemViewProps) {
  const locale = useLocale() as LocaleType
  const { copy } = useCopyToClipboard()
  const { isShared, share } = useShare({
    title: poem.title,
    text: poem.content,
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative rounded-lg border border-border/70 bg-poem-card p-4 shadow-sm sm:p-6",
        locale === "en" ? "font-manrope" : "font-devanagari"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex w-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <SubHeading
              as="h3"
              className="text-xl font-medium text-foreground sm:text-2xl"
            >
              {poem.title}
            </SubHeading>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={share}
                aria-label="Share poem"
                className="flex items-center justify-center rounded-full border p-2 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              >
                {isShared ? (
                  <IconCheck className="size-3.5 text-green-600 sm:size-4" />
                ) : (
                  <IconShare3 className="size-3.5 sm:size-4" />
                )}
              </motion.button>
              <CopyButton
                text={poem.content}
                onCopySuccess={() => console.log("Copied")}
                onCopyError={(error) => console.error("Copy error:", error)}
                onClick={() => copy(poem.content)}
                className="relative rounded-full border bg-poem-card p-2 hover:text-neutral-950"
              />
            </div>
          </div>
          {poem.subtitle && (
            <p className="text-sm mt-2 text-muted-foreground">{poem.subtitle}</p>
          )}
        </div>
      </div>

      <pre className="overflow-x-auto font-devanagari text-base leading-relaxed wrap-break-word whitespace-pre-wrap text-poem sm:text-lg">
        {poem.content}
      </pre>

      <AudioPlayer id={poem.id} src={poem.src} className="mt-4" />
    </motion.article>
  )
}
