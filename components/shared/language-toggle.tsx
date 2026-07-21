"use client"

import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { IconWorld } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "next-intl"

export function LanguageToggle({ className }: { className?: string }) {
  const pathname = usePathname()

  const locale = useLocale()
  const nextLocale = locale === "np" ? "en" : "np"

  return (
    <Button
      variant="ghost"
      nativeButton={false}
      size="icon"
      render={
        <Link
          href={{ pathname }}
          locale={nextLocale}
          className={cn(
            "text-muted-foreground duration-150 hover:text-foreground md:size-8",
            cn(className)
          )}
        >
          <IconWorld />
        </Link>
      }
    ></Button>
  )
}
