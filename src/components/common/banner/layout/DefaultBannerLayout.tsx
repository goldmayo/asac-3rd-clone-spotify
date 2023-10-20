'use client'
import React from 'react'
import { ReactNode } from 'react'

import BannerAlbumDescription from '@/components/common/banner/banner-components/banner-description/BannerAlbumDescription'
import BannerArtistDescription from '@/components/common/banner/banner-components/banner-description/BannerArtistDescription'
import BannerDescription from '@/components/common/banner/banner-components/banner-description/BannerDescription'
import BannerPlaylistDescription from '@/components/common/banner/banner-components/banner-description/BannerPlaylistDescription'
import BannerProfileDescription from '@/components/common/banner/banner-components/banner-description/BannerProfileDescription'
import BannerTrackDescription from '@/components/common/banner/banner-components/banner-description/BannerTrackDescription'
import BannerImage from '@/components/common/banner/banner-components/BannerImage'
import BannerTitle from '@/components/common/banner/banner-components/BannerTitle'
import BannerType from '@/components/common/banner/banner-components/BannerType'
import BannerContext from '@/components/common/banner/context/BannerContext'
import { cn } from '@/lib/utils/classNames'
import { BannerContentObject } from '@/lib/utils/createBannerContentObject'

interface Props {
  className: string
  contents: BannerContentObject
  image?: ReactNode
  title: ReactNode
  type?: ReactNode
  description?: ReactNode
}

export function DefaultBannerLayout(props: Props) {
  return (
    <BannerContext.Provider value={props.contents}>
      <div className={cn('flex gap-4 bg-transparent z-0 h-[calc(40vh_-_64px)] items-center px-4', props.className)}>
        {props.image && props.image}
        <div className={cn('flex flex-col justify-center')}>
          {props.type && props.type}
          {props.title}
          {props.description && props.description}
        </div>
      </div>
    </BannerContext.Provider>
  )
}

export default Object.assign(DefaultBannerLayout, {
  Title: BannerTitle,
  Image: BannerImage,
  Type: BannerType,
  Description: BannerDescription,
  ArtistDescription: BannerArtistDescription,
  AlbumDescription: BannerAlbumDescription,
  PlaylistDescription: BannerPlaylistDescription,
  ProfileDescription: BannerProfileDescription,
  TrackDescription: BannerTrackDescription,
})
