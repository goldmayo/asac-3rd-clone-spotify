'use client'

import { MdPause, MdPlayArrow } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { setPause } from '@/ducks/features/player/player'
import { playerApi } from '@/ducks/service/player-api'
import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { RootState } from '@/store/store'

interface Props {
  uri: string
  className: string
}

export default function GlobalPlayButton(props: Props) {
  const { device_id, paused, context, position, duration } = useSelector((state: RootState) => state.reducer.player)
  const [playTrigger] = playerApi.endpoints.startAndResumePlayback.useMutation()
  const [pauseTrigger] = playerApi.endpoints.pausePlayback.useMutation()
  const dispatch = useDispatch()

  const handleOnClickPlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    playTrigger({
      device_id,
      type: convertUriToDomainTypeId(props.uri).type as 'track' | 'album' | 'playlist' | 'artist',
      uri: props.uri,
      offset: props.uri,
      // position_ms: props.uri === context.uri ? (position <= Math.floor(duration / 1000) * 1000 ? position : 0) : 0,
      position_ms:
        props.uri === context.metadata?.current_item?.uri
          ? position <= Math.floor(duration / 1000) * 1000
            ? position
            : 0
          : 0,
    })
    dispatch(setPause(false))
  }

  const handleOnClickPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    pauseTrigger(device_id)
    dispatch(setPause(true))
  }

  return (
    <>
      {props.uri === context.uri && !paused ? (
        <button
          className={cn(
            'p-2 absolute text-base font-bold opacity-0 text-center align-middle duration-75 rounded-full cursor-pointer touch-manipulation bg-color-accent-primary hover:saturate-150 hover:scale-105',
            props.className,
            {
              // 'opacity-100': props.uri === context.uri && !paused,
              'opacity-100': props.uri === context.metadata?.current_item?.uri && !paused,
            },
          )}
          onClick={handleOnClickPause}
        >
          <MdPause size={'2em'} />
        </button>
      ) : (
        <button
          className={cn(
            'p-2 absolute text-base font-bold opacity-0 text-center align-middle duration-75 rounded-full cursor-pointer touch-manipulation bg-color-accent-primary hover:saturate-150 hover:scale-105',
            props.className,
            {
              // 'opacity-100': props.uri === context.uri && !paused,
              'opacity-100': props.uri === context.metadata?.current_item?.uri && !paused,
            },
          )}
          onClick={handleOnClickPlay}
        >
          <MdPlayArrow size={'2em'} />
        </button>
      )}
    </>
  )
}
