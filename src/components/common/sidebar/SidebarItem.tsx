'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { ContentCardObject } from '@/lib/utils/createContentObject'
import { defaultPlaylistImage } from '@/lib/utils/staticImages'

interface Props {
  content: ContentCardObject & { type: string }
  playedAt: number
  sidebarWidth: number
  shrinkPoint: number
}

export default function SidebarItem(props: Props) {
  const { type, id } = convertUriToDomainTypeId(props.content.uri)
  return (
    <li key={`${props.content.id}`} className="cursor-pointer hover:bg-color-hover-primary">
      <Link href={`/${type}/${id}`}>
        <div
          className={cn('grid grid-cols-[auto_1fr] p-2 gap-x-3 gap-y-2 overflow-x-hidden', {
            'grid-cols-1 p-0': props.sidebarWidth <= props.shrinkPoint,
          })}
        >
          <Image
            className={type === 'playlist' ? 'rounded-md' : 'rounded-full'}
            src={!props.content.image ? defaultPlaylistImage : `${props.content.image.url}`}
            width={48}
            height={48}
            alt={`${props.content.name}`}
          />

          {props.sidebarWidth >= props.shrinkPoint && (
            <div className={cn('flex flex-col')}>
              <span className="break-all text-color-text-primary line-clamp-1 hover:underline">{`${props.content.name}`}</span>
              <span className="break-all text-color-text-secondary line-clamp-1">{`${props.content.type}`}</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}
