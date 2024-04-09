import { useRef, useState, useEffect } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Slider } from './Slider'

const VolumeHigh = () => (
  <svg
    data-encore-id='icon'
    role='presentation'
    width='16'
    height='16'
    aria-label='Volume high'
    aria-hidden='true'
    viewBox='0 0 16 16'
    fill='currentColor'
  >
    <path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z'></path>
    <path d='M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z'></path>
  </svg>
)

const VolumeOff = () => (
  <svg
    data-encore-id='icon'
    role='presentation'
    width='16'
    height='16'
    aria-label='Volume off'
    aria-hidden='true'
    viewBox='0 0 16 16'
    fill='currentColor'
  >
    <path d='M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z'></path>
    <path d='M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z'></path>
  </svg>
)

export default function Volume() {
  const { volume, setVolume } = usePlayerStore((state) => ({
    volume: state.volume,
    setVolume: state.setVolume,
  }))
  const [sliderValue, setSliderValue] = useState(100)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right, #fff ${sliderValue}%, rgba(255, 255, 255, 0.3) ${sliderValue}%)`
    }
  }, [sliderValue])

  const handleClick = () => {
    if (volume === 0) {
      setVolume(1)
      setSliderValue(() => 100)
      return
    }

    setVolume(0)
    setSliderValue(() => 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.valueAsNumber / 100)
    setSliderValue(() => e.target.valueAsNumber)
  }

  return (
    <div className='justify-self-end flex items-center gap-2'>
      <button onClick={handleClick}>
        {volume === 0 ? <VolumeOff /> : <VolumeHigh />}
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
