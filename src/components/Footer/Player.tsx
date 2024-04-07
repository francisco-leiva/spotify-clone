import { useState } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'

export default function Player() {
  const [value, setValue] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempSliderValue = e.target.valueAsNumber
    const max = Number(e.target.max)
    const progressCalc = (tempSliderValue / max) * 100

    setValue((prev) => tempSliderValue)
    setProgress((prev) => progressCalc)
  }

  const inputBackgound = {
    background: `linear-gradient(to right, #fff ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`,
  }

  return (
    <>
      <div className='w-full h-full justify-self-center flex flex-col justify-center items-center gap-1'>
        <div>
          <button className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'>
            <Play />
          </button>
        </div>

        <div className='w-full flex items-center gap-2'>
          <span className='text-sm opacity-50'>0:00</span>

          <input
            type='range'
            name='range'
            id='songTime'
            className='flex-1 h-1 appearance-none outline-none rounded-full cursor-pointer'
            value={value}
            min={0}
            max={240}
            onChange={handleChange}
            style={inputBackgound}
          />

          <span className='text-sm opacity-50'>{value}</span>
        </div>
      </div>

      <style>{`
        #songTime::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
        }
      `}</style>
    </>
  )
}
