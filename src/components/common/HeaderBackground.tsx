'use client'
import { RGBColor } from 'colorthief'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { throttle } from '@/lib/utils/throttle'

interface Typeprops {
  type: 'default' | 'home'
  bgColor?: RGBColor
}

export default function HeaderBackground({ type, bgColor }: Typeprops) {
  const [opacity, setOpacity] = useState<number>(0)

  const range = useMemo(
    () => ({ default: Math.floor(window.screen.height * 0.4), home: 64 }),
    [],
  )
  const onScroll = useCallback(
    // eslint-disable-next-line no-unused-vars
    (e: Event) => {
      const scrollHeight = document.getElementById('main_area')?.scrollTop
      if (scrollHeight) {
        // let currentOpacity = Number((scrollHeight / range[type]).toFixed(2))
        let currentOpacity = Number(scrollHeight / range[type])
        if (currentOpacity > 1) currentOpacity = 1
        if (currentOpacity < 0 || scrollHeight < 30) currentOpacity = 0
        setOpacity(currentOpacity)
      }
    },
    [range, type],
  )
  const throttledOnScroll = useMemo(() => throttle<typeof onScroll>(onScroll, 10), [])
  useEffect(() => {
    // window.addEventListener('scroll', onScroll, true)
    // document.getElementById('main_area')?.addEventListener('scroll', onScroll)
    document.getElementById('main_area')?.addEventListener('scroll', throttledOnScroll)
    // document.body.addEventListener('scroll', onScroll, {
    //   capture: true,
    //   once: false,
    //   passive: false,
    // })
    // return () => document.body.removeEventListener('scroll', onScroll)
    // return () => document.getElementById('main_area')?.removeEventListener('scroll', onScroll)
    return () => document.getElementById('main_area')?.removeEventListener('scroll', throttledOnScroll)
  }, [])

  return (
    <div
      style={{ backgroundColor: !bgColor ? '#181818' : `rgba(${bgColor.join(',')})`, opacity: opacity }}
      className="absolute w-full top-0 left-0 h-[64px] rounded-t-lg z-10"
    />
  )
}
