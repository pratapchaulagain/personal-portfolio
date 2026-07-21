"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"

type ShareState = "idle" | "shared"

type UseShareProps = {
  title?: string
  text?: string
  shareUrl?: string
}

export function useShare({ title, text, shareUrl }: UseShareProps) {
  const pathname = usePathname()
  const [shareState, setShareState] = useState<ShareState>("idle")

  const url = useMemo(() => {
    if (typeof window === "undefined") return pathname
    if (shareUrl) return `${window.location.origin}${shareUrl}`

    return `${window.location.origin}${pathname}`
  }, [shareUrl, pathname])

  const share = async () => {
    if (typeof window === "undefined") return

    try {
      // Always copy the URL
      await navigator.clipboard.writeText(url)

      // Optionally open the native share dialog
      if (navigator.share) {
        await navigator.share({
          title,
          text: text?.slice(0, 100),
          url,
        })
      }

      setShareState("shared")
    } catch {
      setShareState("idle")
    } finally {
      setTimeout(() => setShareState("idle"), 2000)
    }
  }
  return {
    share,
    shareState,
    shareUrl,
    isShared: shareState === "shared",
  }
}
