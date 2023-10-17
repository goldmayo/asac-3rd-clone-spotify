'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { PlaylistDescription } from '@/types/banner/bannerType'

import { useBannerContext } from '../../context/BannerContext'

export default function BannerPlaylistDescription() {
  const { description } = useBannerContext()
  const desc = description as PlaylistDescription
  return (
    <>
      <span className={cn('after:content-["_•"]')}>{desc.ownerName}</span>
      <span className={cn('')}>{desc.totalTracks}곡</span>
    </>
  )
}
