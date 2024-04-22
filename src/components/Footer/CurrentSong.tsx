import { usePlayerStore } from '@/store/playerStore'

export default function CurrentSong() {
  const currentMusic = usePlayerStore((state) => state.currentMusic)

  const image = currentMusic.song?.image
  const title = currentMusic.song?.title
  const artist = currentMusic.song?.artists.join(', ')

  return (
    <>
      {currentMusic.song ? (
        <div className='h-full flex items-center gap-3'>
          <picture className='w-14 h-14 rounded-sm'>
            <img className='rounded-sm' src={image} alt={title} />
          </picture>

          <div>
            <h3>{title}</h3>
            <span className='text-sm opacity-50'>{artist}</span>
          </div>
        </div>
      ) : (
        <div className='w-14 h-14 rounded-sm bg-[#121212]'></div>
      )}
    </>
  )
}
