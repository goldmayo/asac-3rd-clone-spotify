'use client'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { ProfileDescription } from '@/types/banner/bannerType'

import { useBannerContext } from '../../context/BannerContext'

export default function BannerProfileDescription() {
  const { description } = useBannerContext()
  const desc = description as ProfileDescription
  return (
    <>
      <span className={cn('after:content-["_•"]')}>공개 플레이리스트 {desc.publicPlaylistCounts}개</span>
      <Link className={cn('')} href={'user/following'}>
        팔로잉 {desc.followers}명
      </Link>
    </>
  )
}
