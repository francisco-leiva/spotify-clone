import { create } from 'zustand'

export const usePlayerStore = create((set) => ({
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  isPlaying: false,
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}))
