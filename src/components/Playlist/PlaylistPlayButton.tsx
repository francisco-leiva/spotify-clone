import { usePlayerStore } from '@/store/playerStore'
import { BigPlay, BigPause } from '@/icons/PlayerIcons'
import type { CurrentMusic } from '@/store/playerStore'

export default function PlaylistPlayButton({
  playlistId,
}: {
  playlistId: string | undefined
}) {
  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const setcurrentMusic = usePlayerStore((state) => state.setCurrentMusic)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const isPlayingPlaylist =
    isPlaying && currentMusic.playlist?.id === playlistId
  const isPlaylistPaused =
    !isPlaying && currentMusic.playlist?.id === playlistId

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    if (isPlaylistPaused) {
      setIsPlaying(true)
      return
    }

    const res = await fetch(`../api/get-info-playlist.json?id=${playlistId}`)
    const { playlist, song, songs }: CurrentMusic = await res.json()

    setIsPlaying(true)
    setcurrentMusic({ playlist, song, songs })
  }

  return (
    <button
      type='button'
      aria-label='Play playlist'
      className='w-14 h-14 bg-green-500 text-black rounded-full [&_svg]:mx-auto hover:bg-[#1fdf64] hover:scale-105'
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <BigPause /> : <BigPlay />}
    </button>
  )
}
