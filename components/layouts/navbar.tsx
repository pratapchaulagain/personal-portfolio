"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { Route } from "next"
import { isActiveLink } from "@/utils/link"
import { ThemeToggle } from "@/components/shared/theme-toggle"

import { Profile } from "@/components/shared/profile"
import { LanguageToggle } from "@/components/shared/language-toggle"

interface MenuItem {
  label: string
  href: Route
}

export const menuItems: MenuItem[] = [
  {
    label: "About",
    href: "/about" as Route,
  },
  {
    label: "Poems",
    href: "/poems" as Route,
  },
  {
    label: "Awards",
    href: "/awards" as Route,
  },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // const t = useTranslations("shared")

  const pathname = usePathname()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <header className="sticky top-0 right-0 left-0 z-50 mx-auto flex max-w-4xl justify-center overflow-hidden">
        <nav
          className={cn(
            "relative flex items-center justify-between bg-background px-4 py-2.5 transition-all duration-500",
            "w-full"
          )}
        >
          <Profile />

          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex items-center space-x-2 border-edge/60 pt-2 backdrop-blur-md sm:space-x-3"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {menuItems.map((item, index) => {
                const isActive = isActiveLink(pathname, item.href)

                const isMoving =
                  (hoveredIndex ?? (isActive ? index : -1)) === index

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={cn(
                      "relative cursor-pointer pb-2 pl-1 text-[10px] font-medium tracking-widest uppercase transition-all duration-300 sm:text-xs",
                      isMoving
                        ? "text-accent-foreground"
                        : "text-primary hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isMoving && (
                      <motion.div
                        layoutId="nav-active"
                        initial={false}
                        className="group absolute bottom-1 left-px h-[1.6px] w-full rounded-full bg-foreground"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-0.5 sm:gap-2">
              <ThemeToggle className="" />
              <LanguageToggle className="" />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
