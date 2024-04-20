import CurrentSong from './CurrentSong'
import Player from './Player'
import Volume from './Volume'

export default function Footer() {
  return (
    <footer className='h-16 px-2 [grid-area:player] bg-[#000] grid grid-cols-[30%_40%_30%] items-center md:h-[4.5rem]'>
      <CurrentSong />

      <Player />

      <Volume />
    </footer>
  )
}
