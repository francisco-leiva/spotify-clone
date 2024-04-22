import { usePlayerStore } from '@/store/playerStore'

interface Props {
  title: string
  playlistId: string
}

export default function AsidePlaylistTitle({ title, playlistId }: Props) {
  const currentMusic = usePlayerStore((state) => state.currentMusic)

  const isPlayingPlaylist = currentMusic.playlist?.id === playlistId

  return <h3 className={isPlayingPlaylist ? 'text-green-500' : ''}>{title}</h3>
}
