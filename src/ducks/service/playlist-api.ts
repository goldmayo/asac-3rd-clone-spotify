import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'

import { CurrentUsersPlaylist } from '@/types/raw-api-data-type/playlist/current-users-playlist-data-type'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL}/me/playlists`,
    prepareHeaders: async (headers) => {
      const session = await getSession()
      if (session) {
        headers.set(`Authorization`, `Bearer ${session.accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentUsersPlaylist: builder.query<CurrentUsersPlaylist, number>({
      query: (limit) => `?limit=${limit}`,
    }),
  }),
})

export const { useGetCurrentUsersPlaylistQuery } = playlistApi
