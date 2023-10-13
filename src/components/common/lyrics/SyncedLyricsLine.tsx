'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { Line } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'

interface Props {
  line: Line
  handleLyricLineClick: (e: React.MouseEvent<HTMLParagraphElement>, target: number) => void
}
export default function SyncedLyricsLine(props: Props) {
  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    // console.log(e.currentTarget.dataset.position_ms)
    const target = parseInt(e.currentTarget.dataset.position_ms!)
    props.handleLyricLineClick(e, target)
  }
  return (
    <p
      data-position_ms={props.line.startTimeMs}
      className={cn('text-color-text-secondary hover:underline hover:text-color-accent-primary cursor-pointer')}
      onClick={handleClick}
    >
      {props.line.words}
    </p>
  )
}
