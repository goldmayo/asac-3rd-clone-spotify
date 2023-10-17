'use client'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { TrackDescription } from '@/types/banner/bannerType'

import { useBannerContext } from '../../context/BannerContext'

export default function BannerTrackDescription() {
  const { description } = useBannerContext()
  const desc = description as TrackDescription
  return (
    <>
      <Link className={cn('after:content-["_•"] hover:underline')} href={`/album/${convertUriToDomainTypeId(desc.albumUri).id}`}>
        {desc.albumName}
      </Link>
      <Link className={cn('after:content-["_•"] hover:underline')} href={`/artist/${convertUriToDomainTypeId(desc.artistUri).id}`}>
        {desc.artistName}
      </Link>
      <span className={cn('')}>{desc.releaseDate}</span>
    </>
  )
}
