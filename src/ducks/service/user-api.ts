import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'

import { UsersSavedTracks } from '@/types/raw-api-data-type/track/users-saved-tracks-data-type'
import { FollowedArtist } from '@/types/raw-api-data-type/user/followed-artist-data-type'
import { GetCurrentUserProfile } from '@/types/raw-api-data-type/user/get-current-user-profile-data-type'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL}/me`,
    prepareHeaders: async (headers) => {
      const session = await getSession()
      if (session) {
        headers.set(`Authorization`, `Bearer ${session.accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserFollowedArtist: builder.query<FollowedArtist, number>({
      query: (limit) => `/following?type=artist&limit=${limit}`,
    }),
    getCurrentUserProfile: builder.query<GetCurrentUserProfile, null>({
      query: () => `/`,
    }),
    getUsersSavedTracks: builder.query<UsersSavedTracks, number>({
      query: (limit) => `/tracks?limit=${limit}`,
    }),
  }),
})

export const { useGetUserFollowedArtistQuery, useGetCurrentUserProfileQuery, useGetUsersSavedTracksQuery } = userApi
