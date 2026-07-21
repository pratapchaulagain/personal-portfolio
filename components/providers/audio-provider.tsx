"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type AudioContextType = {
  currentSrc: string | null
  currentPoemId: number | null

  isPlaying: boolean
  currentTime: number
  duration: number

  play: (poemId: number, src: string) => Promise<void>
  pause: () => void
  toggle: (poemId: number, src: string) => Promise<void>
  seek: (time: number) => void

  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [currentSrc, setCurrentSrc] = useState<string | null>(null)

  const [currentPoemId, setCurrentPoemId] = useState<number | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  const play = async (poemId: number, src: string) => {
    const audio = audioRef.current

    if (!audio) return

    if (currentPoemId !== poemId) {
      audio.src = src

      setCurrentSrc(src)
      setCurrentPoemId(poemId)

      setCurrentTime(0)
      setDuration(0)
    }
    await audio.play()
    setIsPlaying(true)
  }

  const pause = () => {
    const audio = audioRef.current

    if (!audio) return

    audio.pause()
    setIsPlaying(false)
  }

  const seek = (time: number) => {
    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = time
    setCurrentTime(time)
  }

  const toggle = async (poemId: number, src: string) => {
    if (currentPoemId === poemId && isPlaying) {
      pause()
      return
    }

    await play(poemId, src)
  }

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("loadedmetadata", onLoadedMetadata)

    audio.addEventListener("timeupdate", onTimeUpdate)

    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)

      audio.removeEventListener("timeupdate", onTimeUpdate)

      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <AudioContext.Provider
      value={{
        currentSrc,
        currentPoemId,
        isPlaying,
        play,
        pause,
        toggle,
        audioRef,
        currentTime,
        duration,
        seek,
      }}
    >
      {children}

      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)

  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider")
  }

  return context
}
