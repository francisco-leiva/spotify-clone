import { useRef, useState, useEffect, type MutableRefObject } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Slider } from './Slider'

function formatTime(time: number) {
  if (!time) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function SongTime({
  audio,
}: {
  audio: MutableRefObject<HTMLAudioElement | null>
}) {
  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const songDuration = currentMusic.song?.duration
  const [time, setTime] = useState(0)
  const timeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    audio.current?.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  if (timeInputRef.current) {
    const max = timeInputRef.current.max
    const progress = (time / Number(max)) * 100
    timeInputRef.current.style.background = `linear-gradient(to right, #fff ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`
  }

  const handleTimeUpdate = () => {
    setTime(() => audio.current?.currentTime || 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(() => e.target.valueAsNumber)
    if (audio.current) audio.current.currentTime = e.target.valueAsNumber
  }

  const handleMouseDown = () => {
    audio.current?.pause()
  }

  const handleMouseUp = () => {
    if (isPlaying) audio.current?.play()
  }

  return (
    <div className='hidden w-full md:flex md:items-center md:gap-2'>
      <span className='text-sm opacity-50'>{formatTime(time)}</span>

      <Slider
        inputRef={timeInputRef}
        className='flex-1 bg-white/30'
        value={time}
        min={0}
        max={audio.current?.duration || 100}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      <span className='text-sm opacity-50'>
        {songDuration ? songDuration : '0:00'}
      </span>
    </div>
  )
}
