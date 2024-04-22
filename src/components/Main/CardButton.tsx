import { usePlayerStore } from '@/store/playerStore'
import { Play, Pause } from '@/icons/PlayerIcons'
import { type Playlist, type Song } from '@/lib/data'

interface Props {
  playlistId: string
}

export default function CardButton({ playlistId }: Props) {
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
    const {
      playlist,
      song,
      songs,
    }: { playlist: Playlist; song: Song; songs: Song[] } = await res.json()

    setIsPlaying(true)
    setcurrentMusic({ playlist, song, songs })
  }

  return (
    <button
      type='button'
      aria-label='Play playlist'
      className={`hidden absolute bottom-2 right-2 w-12 h-12 bg-green-500 text-black rounded-full [&_svg]:mx-auto opacity-0 transition-all translate-y-2 duration-200 hover:bg-[#1fdf64] hover:scale-105 group-hover:opacity-100 group-hover:translate-y-0 lg:inline-block ${
        isPlayingPlaylist ? 'opacity-100 !translate-y-0' : ''
      } ${isPlaylistPaused ? 'opacity-100 !translate-y-0' : ''}`}
      onClick={(e) => handleClick(e)}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
