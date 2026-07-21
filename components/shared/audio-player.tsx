"use client"

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useAudio } from "@/components/providers/audio-provider"
import { useRef } from "react"

type AudioPlayerProps = {
  id: number
  src: string
  className?: string
}

export function AudioPlayer({ id, src, className }: AudioPlayerProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  const { currentPoemId, isPlaying, currentTime, duration, play, pause, seek } =
    useAudio()

  const isActive = currentPoemId === id

  const progress = isActive && duration > 0 ? (currentTime / duration) * 100 : 0

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)

    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlay = async () => {
    if (isActive && isPlaying) {
      pause()
      return
    }

    await play(id, src)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return

    const bar = progressRef.current

    if (!bar || !duration) return

    const rect = bar.getBoundingClientRect()

    const position = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)

    const percentage = position / rect.width

    seek(duration * percentage)
  }

  return (
    <div
      className={cn(
        "my-1.5 w-full rounded-lg border bg-background p-3",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        >
          {isActive && isPlaying ? (
            <IconPlayerPauseFilled size={20} />
          ) : (
            <IconPlayerPlayFilled size={20} />
          )}
        </motion.button>

        <div className="min-w-0 flex-1">
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="group relative h-1.5 cursor-pointer rounded-full bg-muted"
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.05,
                ease: "linear",
              }}
            />

            <motion.div
              className={cn(
                "absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-primary shadow-md",
                "opacity-0 transition-opacity",
                "group-hover:opacity-100",
                isActive && "opacity-100"
              )}
              animate={{
                left: `calc(${progress}% - 8px)`,
              }}
              transition={{
                duration: 0.05,
                ease: "linear",
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{isActive ? formatTime(currentTime) : "0:00"}</span>

            <span>{isActive ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
