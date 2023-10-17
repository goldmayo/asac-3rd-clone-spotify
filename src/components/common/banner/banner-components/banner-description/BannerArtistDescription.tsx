'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { ArtistDescription } from '@/types/banner/bannerType'

import { useBannerContext } from '../../context/BannerContext'

export default function BannerArtistDescription() {
  const { description } = useBannerContext()
  const desc = description as ArtistDescription
  return (
    <>
      <span className={cn('')}>팔로어 {desc.followers}명</span>
    </>
  )
}
