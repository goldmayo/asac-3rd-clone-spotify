'use client'
import React from 'react'

import MainBannerLayout from '@/components/common/banner/layout/MainBannerLayout'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function HomeBanner({ children, className }: Props) {
  const getGreeting = () => {
    const today = new Date()
    const curHr = today.getHours()
    if (curHr < 6) {
      return '잔잔한 새벽 입니다'
    } else if (curHr <= 8) {
      return '상쾌한 아침 입니다'
    } else if (curHr <= 12) {
      return '즐거운 오전 입니다'
    } else if (curHr <= 18) {
      return '즐거운 오후 입니다'
    } else {
      return '즐거운 저녁 입니다'
    }
  }

  return (
    <MainBannerLayout
      className={className}
      title={<h1 className={'text-2xl text-color-text-primary mb-4'}>{getGreeting()}</h1>}
      usersTopItem={children}
    />
  )
}
