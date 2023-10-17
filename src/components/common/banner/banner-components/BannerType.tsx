'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'

import { useBannerContext } from '../context/BannerContext'

export default function BannerType() {
  const { type } = useBannerContext()
  return <span className={cn('text-sm text-color-text-primary')}>{type}</span>
}
