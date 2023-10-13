'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SyncedLyricsLine from '@/components/common/lyrics/SyncedLyricsLine'
import UnsyncedLyricsLine from '@/components/common/lyrics/UnsyncedLyricsLine'
import { setPosition } from '@/ducks/features/player/player'
import { playerApi } from '@/ducks/service/player-api'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'
import { debounce } from '@/lib/utils/debounce'
import { RootState } from '@/store/store'
import { Lyrics } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'

interface Props {
  uri: string
  lyrics: Lyrics
}

export default function LyricsContainer(props: Props) {
  const { device_id, context } = useSelector((state: RootState) => state.reducer.player)
  const dispatch = useDispatch()
  const [seekTrigger] = playerApi.endpoints.seekToPosition.useMutation()

  const { type, id } = convertUriToDomainTypeId(props.uri)
  function handleLyricLineClick(e: React.MouseEvent<HTMLParagraphElement>, target: number) {
    e.preventDefault()
    // LINE_SYNCED
    if (props.lyrics.syncType === 'UNSYNCED' || props.uri !== context.metadata?.current_item.uri) return
    dispatch(setPosition(target))
    seekTrigger({ position_ms: target, device_id })
  }
  const debouncedLyricClick = debounce<typeof handleLyricLineClick>(handleLyricLineClick, 300)
  return (
    <>
      {props.lyrics.syncType === 'LINE_SYNCED' ? (
        <div>
          <h2 className="text-2xl font-bold text-color-text-primary mb-4">가사</h2>
          {props.lyrics.lines.map((line, index) => (
            <SyncedLyricsLine key={`${type}_${id}_${index}`} line={line} handleLyricLineClick={debouncedLyricClick} />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-color-text-primary mb-4">가사</h2>
          {props.lyrics.lines.map((line, index) => (
            <UnsyncedLyricsLine key={`${type}_${id}_${index}`} line={line} />
          ))}
        </div>
      )}
    </>
  )
}
