import { usePlayerStore } from '@/store/playerStore'
import { Play, Pause } from '@/icons/PlayerIcons'
import type { CurrentMusic } from '@/store/playerStore'

interface Props {
  playlistId: string
}

export default function SmallCardButton({ playlistId }: Props) {
  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const setcurrentMusic = usePlayerStore((state) => state.setCurrentMusic)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const isPlayingPlaylist =
    isPlaying && currentMusic.playlist?.id === playlistId
  const isPlaylistPaused =
    !isPlaying && currentMusic.playlist?.id === playlistId

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isPlaylistPaused) {
      setIsPlaying(true)
      return
    }

    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    const res = await fetch(`/api/get-info-playlist.json?id=${playlistId}`)
    const { playlist, song, songs }: CurrentMusic = await res.json()

    setIsPlaying(true)
    setcurrentMusic({ playlist, song, songs })
  }

  return (
    <button
      type='button'
      aria-label='Play playlist'
      className={`hidden w-8 h-8 bg-green-500 text-black rounded-full [&_svg]:mx-auto opacity-0 transition-opacity duration-200 hover:bg-[#1fdf64] shadow-[0_8px_8px_rgba(0,0,0,.3)] hover:scale-105 group-hover:opacity-100 lg:inline-block ${
        isPlayingPlaylist ? 'opacity-100' : ''
      }`}
      onClick={(e) => handleClick(e)}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
