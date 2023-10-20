'use client'
import React from 'react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils/classNames'

interface Props {
  className?: string
  title: ReactNode
  usersTopItem?: ReactNode
}

export default function MainBannerLayout(props: Props) {
  return (
    <div className={cn('flex flex-col rounded-lg bg-transparent z-10', props.className)}>
      {props.title}
      {props.usersTopItem && props.usersTopItem}
    </div>
  )
}
