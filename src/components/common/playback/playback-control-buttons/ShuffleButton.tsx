'use client'

import { PiShuffleLight } from 'react-icons/pi'
import { useSelector } from 'react-redux'

import { Button } from '@/components/common/playback/playback-control-buttons/Button'
import { playerApi } from '@/ducks/service/player-api'
import { cn } from '@/lib/utils/classNames'
import { RootState } from '@/store/store'

export default function ShuffleButton() {
  const { device_id, shuffled } = useSelector((state: RootState) => state.reducer.player)
  const [shuffleTrigger] = playerApi.endpoints.togglePlaybackShuffle.useMutation()

  const handleShuffle = (e: React.MouseEvent) => {
    e.preventDefault()
    shuffleTrigger({ state: !shuffled, device_id })
  }

  return (
    <Button handleClick={handleShuffle}>
      <PiShuffleLight size={'1.125rem'} className={cn('', { 'text-color-accent-primary': shuffled })} />
    </Button>
  )
}
