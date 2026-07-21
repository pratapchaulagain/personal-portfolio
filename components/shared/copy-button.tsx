"use client"

import type { ComponentProps } from "react"

import type { CopyState } from "@/hooks/use-copy-to-clipboard"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"
import { IconCheck, IconCircleX, IconCopy } from "@tabler/icons-react"

export function CopyStateIcon({ state }: { state: CopyState }) {
  return state === "idle" ? (
    <span key="idle">
      <IconCopy
        size={16}
        className={cn(
          "transition-all",
          "scale-100 opacity-100",
          "stroke-muted-foreground group-hover/icon:stroke-primary"
        )}
      />
    </span>
  ) : state === "done" ? (
    <span key="done">
      <IconCheck
        size={16}
        className={cn(
          "stroke-green-600 transition-all group-hover:text-primary",
          "scale-100 opacity-100",
          "stroke-green-600 group-hover/icon:stroke-primary"
        )}
      />
    </span>
  ) : state === "error" ? (
    <span key="error">
      <IconCircleX
        size={16}
        className={cn(
          "stroke-current text-red-500 transition-all",
          "scale-100 opacity-100"
        )}
      />
    </span>
  ) : null
}

export type CopyButtonProps = ComponentProps<"button"> & {
  text: string | (() => string)
  onCopySuccess?: (text: string) => void
  onCopyError?: (error: Error) => void
  children?: React.ReactNode
}

export function CopyButton({
  children,
  text,
  onCopySuccess,
  onCopyError,
  onClick,
  className,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess,
    onCopyError,
  })

  return (
    <button
      onClick={(e) => {
        copy(text)
        onClick?.(e)
      }}
      disabled={state === "done"}
      className={cn(
        "group/icon absolute right-0 flex cursor-pointer items-center justify-center rounded-md p-2 text-muted-foreground transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 disabled:pointer-events-none disabled:cursor-not-allowed",
        "hover:bg-muted",
        "duration-100 ease-in-out",
        "py-1",
        className
      )}
      aria-label="Copy"
      {...props}
    >
      <CopyStateIcon state={state} />
      {children}
    </button>
  )
}
