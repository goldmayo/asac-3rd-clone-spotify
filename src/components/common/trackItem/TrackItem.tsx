'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsPause, BsPlayFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { setPause } from '@/ducks/features/player/player'
import { playerApi } from '@/ducks/service/player-api'
import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { defaultPlaylistImage } from '@/lib/utils/staticImages'
import { RootState } from '@/store/store'

interface Props {
  index: number
  image: string | undefined
  trackName: string
  duration: string
  popularity: number
  uri: string
}

export default function TrackItem(props: Props) {
  const { paused, context, device_id, position, duration } = useSelector((state: RootState) => state.reducer.player)
  const dispatch = useDispatch()
  const [playTrackTrigger] = playerApi.endpoints.startAndResumePlayback.useMutation()
  const [pauseTrackTrigger] = playerApi.endpoints.pausePlayback.useMutation()
  const { type, id } = convertUriToDomainTypeId(props.uri)

  const handleOnClickPlayTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    playTrackTrigger({
      device_id,
      type: type as 'track' | 'album' | 'playlist' | 'artist',
      uri: props.uri,
      offset: props.uri,
      position_ms:
        props.uri === context.metadata?.current_item.uri
          ? position <= Math.floor(duration / 1000) * 1000
            ? position
            : 0
          : 0,
    })
    dispatch(setPause(false))
  }
  const handleOnClickPauseTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    pauseTrackTrigger(device_id)
    dispatch(setPause(true))
  }

  return (
    <div className={cn('grid grid-cols-[16px_3fr_2fr_1fr] gap-2 items-center')}>
      <div className=" relative flex group w-4 items-center">
        {props.uri === context.metadata?.current_item?.uri && !paused ? (
          <button
            className={cn(
              'text-color-text-primary opacity-0 absolute -left-1 cursor-pointer group-hover:opacity-100 z-10',
              {
                'opacity-100': props.uri === context.metadata?.current_item?.uri && !paused,
              },
            )}
            onClick={handleOnClickPauseTrack}
          >
            <BsPause size={'1.5rem'} className={''} />
          </button>
        ) : (
          <button
            className={cn(
              'text-color-text-primary opacity-0 absolute -left-1 cursor-pointer group-hover:opacity-100 z-10',
              {
                'opacity-100': props.uri === context.metadata?.current_item?.uri && !paused,
              },
            )}
            onClick={handleOnClickPlayTrack}
          >
            <BsPlayFill size={'1.5rem'} className={''} />
          </button>
        )}
        <div
          className={cn('text-color-text-secondary opacity-100 group-hover:opacity-0', {
            'w-0 hidden': props.uri === context.metadata?.current_item?.uri && !paused,
          })}
        >
          {props.index}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-start">
        <Image
          className="text-color-text-primary"
          src={!props.image ? defaultPlaylistImage : props.image}
          alt={props.trackName}
          height={40}
          width={40}
        />
        <Link href={`/track/${id}`}>
          <span
            className={cn('text-color-text-primary hover:underline line-clamp-1', {
              'text-color-accent-primary': props.uri === context.metadata?.current_item?.uri && !paused,
            })}
          >
            {props.trackName}
          </span>
        </Link>
      </div>
      <div className="text-color-text-secondary">{props.popularity}%</div>
      <div className="text-color-text-secondary">{props.duration}</div>
    </div>
  )
}
