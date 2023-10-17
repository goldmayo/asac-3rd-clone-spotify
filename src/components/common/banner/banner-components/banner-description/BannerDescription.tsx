'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function BannerDescription({ children, className }: Props) {
  return <div className={cn('flex text-color-text-primary gap-2', className)}>{children}</div>
}
