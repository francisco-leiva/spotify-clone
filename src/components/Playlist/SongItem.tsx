import { usePlayerStore } from '@/store/playerStore'
import type { Song } from '@/lib/data'
import type { CurrentMusic } from '@/store/playerStore'

interface Props {
  song: Song
  playlistId: number
  index: number
}

export default function SongItem({ song, playlistId, index }: Props) {
  const { id, albumId, image, title, artists, album, duration } = song

  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const setcurrentMusic = usePlayerStore((state) => state.setCurrentMusic)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const isSongOnPlaylist = currentMusic.song?.albumId === playlistId
  const isPlayingSong =
    isPlaying && currentMusic.song?.id === id && isSongOnPlaylist
  const isSongPaused =
    !isPlaying && currentMusic.song?.id === id && isSongOnPlaylist

  const handleClick = async () => {
    if (isPlayingSong) {
      setIsPlaying(false)
      return
    }

    if (isSongPaused) {
      setIsPlaying(true)
      return
    }

    const res = await fetch(
      `../api/get-info-playlist.json?id=${albumId}&songId=${id}`
    )
    const { playlist, song, songs }: CurrentMusic = await res.json()

    setIsPlaying(true)
    setcurrentMusic({ playlist, song, songs })
  }

  return (
    <li
      className='py-2 px-4 grid grid-cols-1 items-center gap-4 rounded-md hover:bg-[#1a1a1a] cursor-pointer md:grid-cols-[1rem_minmax(120px,4fr)_minmax(120px,3fr)_minmax(120px,3fr)]'
      onClick={handleClick}
    >
      <span className='hidden opacity-50 md:inline-block'>{index + 1}</span>

      <div className='flex items-center gap-3'>
        <img
          src={image}
          alt={title}
          className='w-12 h-12 md:w-10 md:h-10 rounded-sm'
        />

        <div>
          <h3 className={isPlayingSong || isSongPaused ? 'text-green-500' : ''}>
            {title}
          </h3>
          <span className='text-sm opacity-50'>{artists.join(', ')}</span>
        </div>
      </div>

      <span className='hidden opacity-50 md:inline-block'>{album}</span>

      <span className='hidden opacity-50 md:inline-block'>{duration}</span>
    </li>
  )
}
