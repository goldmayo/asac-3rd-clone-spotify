import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'

import { GetSearchforItem } from '@/types/raw-api-data-type/search/search-for-item'
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL}`,
    prepareHeaders: async (headers) => {
      const session = await getSession()
      if (session) {
        headers.set(`Authorization`, `Bearer ${session.accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getSearchItems: builder.query<GetSearchforItem, string>({
      query: (item) => `/search?q=${item}&type=album%2Cartist%2Ctrack&offset=10&limit=15`,
    }),
  }),
})

export const { useGetSearchItemsQuery } = searchApi
