'use client'
import React from 'react'

import { createBannerContentFromItem } from '@/lib/utils/createBannerContentObject'
import { GetTrack } from '@/types/raw-api-data-type/track/get-track-data-type'

import DefaultBannerLayout from './layout/DefaultBannerLayout'

interface Props {
  trackData: GetTrack
}

export default function TracKBanner({ trackData }: Props) {
  const trackBannerObj = createBannerContentFromItem.track(trackData)
  return (
    <DefaultBannerLayout
      className={''}
      contents={trackBannerObj}
      title={<DefaultBannerLayout.Title size={'md'} />}
      image={<DefaultBannerLayout.Image variant={'default'} />}
      type={<DefaultBannerLayout.Type />}
      description={
        <DefaultBannerLayout.Description>
          <DefaultBannerLayout.TrackDescription />
        </DefaultBannerLayout.Description>
      }
    />
  )
}
