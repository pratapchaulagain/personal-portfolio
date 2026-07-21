"use client"

import { cn } from "@/lib/utils"
import { Route } from "next"
import Image from "next/image"
import Link from "next/link"

export function Profile({
  src,
  className,
}: {
  src?: string
  className?: string
}) {
  return (
    <Link
      href={"/" as Route}
      className="group relative flex items-center justify-center"
    >
      <Image
        src={src ?? "/a2.jpeg"}
        alt="Profile"
        loading="eager"
        width={50}
        height={50}
        className={cn(
          "size-10 rounded-full object-cover object-bottom-right sm:size-12",
          className
        )}
      />
    </Link>
  )
}
