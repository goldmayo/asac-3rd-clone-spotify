'use client'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { AlbumDescription } from '@/types/banner/bannerType'

import { useBannerContext } from '../../context/BannerContext'

export default function BannerAlbumDescription() {
  const { uri, description } = useBannerContext()
  const { type, id } = convertUriToDomainTypeId(uri)
  const desc = description as AlbumDescription
  return (
    <>
      <Link className={cn('after:content-["_•"] hover:underline')} href={`${type}/${id}`}>
        {desc.artistName}
      </Link>
      <span className={cn('after:content-["_•"]')}>{desc.releaseDate}</span>
      <span className={cn('')}>{desc.totalTracks}곡</span>
    </>
  )
}
