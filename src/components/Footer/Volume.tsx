import { useRef, useState, useEffect } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import {
  VolumeHigh,
  VolumeMedium,
  VolumeLow,
  VolumeOff,
} from '@/icons/VolumeIcons'
import { Slider } from './Slider'

export default function Volume() {
  const setVolume = usePlayerStore((state) => state.setVolume)
  const [sliderValue, setSliderValue] = useState(100)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousSliderRef = useRef<number>(sliderValue)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right, #fff ${sliderValue}%, rgba(255, 255, 255, 0.3) ${sliderValue}%)`
    }
  }, [sliderValue])

  const handleClick = () => {
    if (sliderValue === 0) {
      setVolume(previousSliderRef.current / 100)
      setSliderValue(() => previousSliderRef.current)
      return
    }

    previousSliderRef.current = sliderValue
    setVolume(0)
    setSliderValue(() => 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.valueAsNumber / 100)
    setSliderValue(() => e.target.valueAsNumber)
  }

  return (
    <div className='justify-self-end flex items-center gap-2'>
      <button
        type='button'
        aria-label='Toggle mute'
        className='opacity-65 hover:opacity-100'
        onClick={handleClick}
      >
        {sliderValue === 0 ? (
          <VolumeOff />
        ) : sliderValue <= 30 ? (
          <VolumeLow />
        ) : sliderValue <= 70 ? (
          <VolumeMedium />
        ) : (
          <VolumeHigh />
        )}
      </button>

      <Slider
        inputRef={inputRef}
        value={sliderValue}
        min={0}
        max={100}
        onChange={handleChange}
      />
    </div>
  )
}
