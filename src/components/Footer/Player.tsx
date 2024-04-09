import { useRef, useState, useEffect } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { Slider } from './Slider'
import { usePlayerStore } from '@/store/playerStore'

export default function Player() {
  const { volume } = usePlayerStore((state) => ({
    volume: state.volume,
  }))
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (inputRef.current) {
      const max = inputRef.current.max
      const progress = (time / Number(max)) * 100
      inputRef.current.style.background = `linear-gradient(to right, #fff ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`
    }
  }, [time])

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }

    setIsPlaying((prev) => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(() => e.target.valueAsNumber)
  }

  return (
    <div className='w-full h-full justify-self-center flex flex-col justify-center items-center gap-1'>
      <audio ref={audioRef} src='/music/1/01.mp3' />

      <div>
        <button
          className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'
          onClick={handleClick}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      <div className='w-full flex items-center gap-2'>
        <span className='text-sm opacity-50'>0:00</span>

        <Slider
          inputRef={inputRef}
          className='flex-1'
          value={time}
          min={0}
          max={240}
          onChange={handleChange}
        />

        <span className='text-sm opacity-50'>3:40</span>
      </div>
    </div>
  )
}
