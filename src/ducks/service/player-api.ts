import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'

import { ItemType } from '@/types/common/item-data-type'
import { CurrentlyplayingTrack } from '@/types/raw-api-data-type/player/currently-playing-track'
import { RecentlyplayedTrack } from '@/types/raw-api-data-type/player/recently-played-track'

export interface IstartAndResumePlaybackArg {
  device_id: string
  uri: string
  position?: number
  type: Exclude<ItemType, 'user'>
  position_ms: number
  offset: string
}

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL}/me/player`,
    prepareHeaders: async (headers) => {
      const session = await getSession()
      if (session) {
        headers.set(`Authorization`, `Bearer ${session.accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentlyPlayingTrack: builder.query<CurrentlyplayingTrack, null>({
      query: () => `/currently-playing`,
    }),
    getRecentlyPlayedTrack: builder.query<RecentlyplayedTrack, null>({
      query: () => `/recently-played`,
    }),
    transferPlayback: builder.mutation<null, string>({
      query: (deviceId) => ({
        url: `/`,
        method: 'PUT',
        body: {
          device_ids: [`${deviceId}`],
          play: false,
        },
      }),
    }),
    startAndResumePlayback: builder.mutation<null, IstartAndResumePlaybackArg>({
      query: ({ device_id, uri, position, offset, type, position_ms }) => ({
        url: `/play?device_id=${device_id}`,
        method: 'PUT',
        body:
          type === 'track'
            ? {
                uris: [uri],
                position_ms: position_ms,
              }
            : type === 'artist'
            ? {
                context_uri: uri,
                position_ms: position_ms,
              }
            : {
                context_uri: uri,
                offset: {
                  uri: { offset },
                },
                position_ms: position_ms,
              },
      }),
    }),
    pausePlayback: builder.mutation<null, string>({
      query: (device_id) => ({
        url: `/pause?device_id=${device_id}`,
        method: 'PUT',
      }),
    }),
    skipToNextPlayback: builder.query<null, string>({
      query: (device_id) => ({
        url: `/next?device_id=${device_id}`,
        method: 'POST',
      }),
    }),
    skipToPreviousPlayback: builder.query<null, string>({
      query: (device_id) => ({
        url: `/previous?device_id=${device_id}`,
        method: 'POST',
      }),
    }),
    togglePlaybackShuffle: builder.mutation<null, { state: boolean; device_id: string }>({
      query: ({ state, device_id }) => ({
        url: `/shuffle?state=${state}&device_id=${device_id}`,
        method: 'PUT',
      }),
    }),
    setReapeatModePlayback: builder.mutation<null, { state: 'track' | 'context' | 'off'; device_id: string }>({
      query: ({ state, device_id }) => ({
        url: `/repeat?state=${state}&device_id=${device_id}`,
        method: 'PUT',
      }),
    }),
    setPlaybackVolume: builder.mutation<null, { volume_percent: number; device_id: string }>({
      query: ({ volume_percent, device_id }) => ({
        url: `/volume?volume_percent=${volume_percent}&device_id=${device_id}`,
        method: 'PUT',
      }),
    }),
    seekToPosition: builder.mutation<null, { position_ms: number; device_id: string }>({
      query: ({ position_ms, device_id }) => ({
        url: `/seek?position_ms=${position_ms}&device_id=${device_id}`,
        method: 'PUT',
      }),
    }),
  }),
})
// context_uri: `${uri}`,

export const { useGetCurrentlyPlayingTrackQuery, useGetRecentlyPlayedTrackQuery, useTransferPlaybackMutation } =
  playerApi
