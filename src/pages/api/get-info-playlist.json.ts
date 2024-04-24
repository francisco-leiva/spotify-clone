import { playlists, songs } from '@/lib/data'

export async function GET({ request }: { request: Request }) {
  // get the id from de url serch params
  const url = new URL(request.url)
  const playlistId = url.searchParams.get('id')
  const songId = url.searchParams.get('songId')

  // get the playlist from the id
  const targetPlaylist = playlists.find(
    (playlist) => playlist.id === playlistId
  )
  const playlistSongs = songs.filter(
    (song) => song.albumId === targetPlaylist?.albumId
  )
  // get the song from the id
  const targetSong = songId
    ? playlistSongs.find((song) => song.id === Number(songId))
    : playlistSongs[0]

  return new Response(
    JSON.stringify({
      playlist: targetPlaylist,
      song: targetSong,
      songs: playlistSongs,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
