import { create } from 'zustand'
import { type Song, type Playlist } from '@/lib/data'

interface Store {
  currentMusic: {
    playlist: Playlist | null
    song: Song | null
    songs: Song[]
  }
  volume: number
  isPlaying: boolean
  setCurrentMusic: (currentMusic: Store['currentMusic']) => void
  setVolume: (volume: number) => void
  setIsPlaying: (isPlaying: boolean) => void
}

export const usePlayerStore = create<Store>((set) => ({
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  isPlaying: false,
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}))
