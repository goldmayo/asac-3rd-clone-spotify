'use client'
import React from 'react'

import { createBannerContentFromItem } from '@/lib/utils/createBannerContentObject'
import { GetArtist } from '@/types/raw-api-data-type/artist/get-artist-data-type'

import DefaultBannerLayout from './layout/DefaultBannerLayout'

interface Props {
  artistData: GetArtist
}

export default function ArtistBanner({ artistData }: Props) {
  const artistBannerObj = createBannerContentFromItem.artist(artistData)

  return (
    <DefaultBannerLayout
      className={''}
      contents={artistBannerObj}
      title={<DefaultBannerLayout.Title size={'lg'} />}
      image={<DefaultBannerLayout.Image variant={'artist'} />}
      type={<DefaultBannerLayout.Type />}
      description={
        <DefaultBannerLayout.Description className={'text-color-text-primary'}>
          <DefaultBannerLayout.ArtistDescription />
        </DefaultBannerLayout.Description>
      }
    />
  )
}
