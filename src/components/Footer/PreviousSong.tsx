import { usePlayerStore } from '@/store/playerStore'
import { Previous } from '@/icons/PlayerIcons'
import type { CurrentMusic } from '@/store/playerStore'

export default function PreviousSong() {
  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const setCurrentMusic = usePlayerStore((state) => state.setCurrentMusic)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const handlePrevious = async () => {
    const playlistId = currentMusic.playlist?.id
    const songId = currentMusic.song?.id
    const playlistSongs = currentMusic.songs

    const indexCurrentSong = playlistSongs.findIndex(
      (song) => song.id === songId
    )

    const prevSong =
      indexCurrentSong === 0
        ? playlistSongs[0]
        : playlistSongs[indexCurrentSong - 1]

    const res = await fetch(
      `/api/get-info-playlist.json?id=${playlistId}&songId=${prevSong.id}`
    )
    const { playlist, song, songs }: CurrentMusic = await res.json()

    setCurrentMusic({ playlist, song, songs })
    setIsPlaying(true)
  }

  return (
    <button
      type='button'
      aria-label='Previous song'
      className='hidden opacity-65 hover:opacity-100 md:inline-block'
      onClick={handlePrevious}
    >
      <Previous />
    </button>
  )
}
