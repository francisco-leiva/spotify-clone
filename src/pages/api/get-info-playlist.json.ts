import { playlists, songs } from '@/lib/data'

export async function GET({ request }: { request: Request }) {
  // get the id from de url serch params
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  // get the playlist from the id
  const targetPlaylist = playlists.find((playlist) => playlist.id === id)
  const playlistSongs = songs.filter(
    (song) => song.albumId === targetPlaylist?.albumId
  )

  return new Response(
    JSON.stringify({
      playlist: targetPlaylist,
      song: playlistSongs[0],
      songs: playlistSongs,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
