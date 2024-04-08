import { useState } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { Slider } from './Slider'

export default function Player() {
  const [value, setValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempSliderValue = e.target.valueAsNumber
    const max = Number(e.target.max)
    const progressCalc = (tempSliderValue / max) * 100

    e.target.style.background = `linear-gradient(to right, #fff ${progressCalc}%, rgba(255, 255, 255, 0.3) ${progressCalc}%)`

    setValue((prev) => tempSliderValue)
  }

  const sliderBackgound = {
    background: `linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0.3) 0%)`,
  }

  return (
    <div className='w-full h-full justify-self-center flex flex-col justify-center items-center gap-1'>
      <div>
        <button className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'>
          <Play />
        </button>
      </div>

      <div className='w-full flex items-center gap-2'>
        <span className='text-sm opacity-50'>0:00</span>

        <Slider
          className='flex-1'
          value={value}
          min={0}
          max={240}
          onChange={handleChange}
          style={sliderBackgound}
        />

        <span className='text-sm opacity-50'>3:40</span>
      </div>
    </div>
  )
}
