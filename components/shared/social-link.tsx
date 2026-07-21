"use client"

import { cn } from "@/lib/utils"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react"
import { Route } from "next"
import Link from "next/link"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  EMAIL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants"
import { motion } from "motion/react"

const socialLinks = [
  {
    name: "Facebook",
    icon: IconBrandFacebook,
    href: FACEBOOK_URL,
  },
  {
    name: "Instagram",
    icon: IconBrandInstagram,
    href: INSTAGRAM_URL,
  },
  {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    href: LINKEDIN_URL,
  },
  {
    name: "Email",
    icon: IconMail,
    href: EMAIL_URL,
  },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
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
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={cn("flex items-center gap-6 py-4", className)}
    >
      {socialLinks.map((link) => (
        <Tooltip key={link.name}>
          <TooltipTrigger>
            <Link
              href={link.href as Route}
              key={link.name}
              target="_blank"
              className="flex items-center gap-2 text-muted-foreground duration-200 hover:text-foreground"
            >
              <link.icon className="size-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm font-medium">{link.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </motion.div>
  )
}
