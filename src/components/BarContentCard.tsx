'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { ContentCardObject } from '@/lib/utils/createContentObject'
import { defaultPlaylistImage } from '@/lib/utils/staticImages'

import GlobalPlayButton from './common/GlobalPlayButton'

interface Props {
  content: ContentCardObject[]
}

export default function BarContentCard(props: Props) {
  return (
    <div className="">
      <h1 className={'text-2xl text-color-text-primary mb-4'}>즐거운 오후 입니다</h1>
      <div className="">
        <ul
          className={cn(
            'grid lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-3 sm:grid-cols-1 sm:grid-rows-6 gap-x-3 gap-y-2 text-color-text-primary',
          )}
        >
          {props.content.map((item) => (
            <li
              key={item.id}
              className="flex justify-start bg-color-text-primary/10 rounded-md group h-20 min-w-[270px] items-center"
            >
              <div className="flex">
                <Image
                  src={!item.image ? defaultPlaylistImage : `${item.image.url}`}
                  height={70}
                  width={70}
                  alt={`${item.name}`}
                />
              </div>
              <div className="flex items-center w-full justify-between px-2">
                <span className="hover:underline">
                  <Link href={`/artist/${convertUriToDomainTypeId(item.uri).id}`}>{item.name}</Link>
                </span>
                <div>
                  <GlobalPlayButton
                    uri={item.uri}
                    className={'static group-hover:opacity-100 text-color-background-base-primary hover:scale-100'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}