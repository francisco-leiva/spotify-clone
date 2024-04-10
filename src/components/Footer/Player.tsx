import { useRef, useEffect } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Play, Pause } from '@/icons/PlayerIcons'
import SongTime from './SongTime'

export default function Player() {
  const currentMusic = usePlayerStore((state) => state.currentMusic)
  const volume = usePlayerStore((state) => state.volume)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    const { song } = currentMusic
    if (song && isPlaying) {
      const src = `/music/${song.albumId}/0${song.id}.mp3`
      if (audioRef.current) audioRef.current.src = src
      audioRef.current?.play()
    }
  }, [currentMusic])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='w-full h-full justify-self-center flex flex-col justify-center items-center gap-1'>
      <audio ref={audioRef} />

      <div>
        <button
          type='button'
          aria-label='Play song'
          className='w-8 h-8 bg-white text-black rounded-full [&_svg]:mx-auto'
          onClick={handleClick}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      <SongTime audio={audioRef} />
    </div>
  )
}
