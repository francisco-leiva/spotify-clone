import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'

export default function Player() {
  return (
    <div className='justify-self-center'>
      <button className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'>
        <Play />
      </button>

      <button className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'>
        <Pause />
      </button>
    </div>
  )
}
