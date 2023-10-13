import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Lyrics } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'

export const lyricsApi = createApi({
  reducerPath: 'lyricsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MUSICMATCH_LYRICS_URL,
  }),
  endpoints: (builder) => ({
    getlyricsByTrackId: builder.query<Lyrics, string>({
      query: (id) => `/?trackid=${id}`,
    }),
  }),
})

export const { useGetlyricsByTrackIdQuery } = lyricsApi
