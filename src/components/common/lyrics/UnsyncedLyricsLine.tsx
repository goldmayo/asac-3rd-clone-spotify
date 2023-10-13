'use client'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { Line } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'

interface Props {
  line: Line
}
export default function UnsyncedLyricsLine(props: Props) {
  return (
    <p
      className={cn('text-color-text-secondary')}
    >
      {props.line.words}
    </p>
  )
}
