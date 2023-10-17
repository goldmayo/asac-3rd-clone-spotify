'use client'
import React from 'react'
import { ReactNode } from 'react'

import BannerContext from '@/components/common/banner/context/BannerContext'
import { cn } from '@/lib/utils/classNames'
import { BannerContentObject } from '@/lib/utils/createBannerContentObject'

interface Props {
  className: string
  contents: BannerContentObject
  title: ReactNode
  usersTopItem?: ReactNode
}

export default function mainBannerLayout(props: Props) {
  return (
    <BannerContext.Provider value={props.contents}>
      <div className={cn('flex flex-col rounded-lg bg-transparent z-10', props.className)}>
        {props.title}
        {props.usersTopItem && props.usersTopItem}
      </div>
    </BannerContext.Provider>
  )
}
