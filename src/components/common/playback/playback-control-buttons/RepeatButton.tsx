'use client'
import { PiRepeat } from 'react-icons/pi'
import { useSelector } from 'react-redux'

import { Button } from '@/components/common/playback/playback-control-buttons/Button'
import { playerApi } from '@/ducks/service/player-api'
import { cn } from '@/lib/utils/classNames'
import { RootState } from '@/store/store'

export default function RepeatButton() {
  const { device_id, repeated } = useSelector((state: RootState) => state.reducer.player)
  const [repeatTrigger] = playerApi.endpoints.setReapeatModePlayback.useMutation()

  const handleRepeat = (e: React.MouseEvent) => {
    e.preventDefault()
    if (repeated !== 0) {
      repeatTrigger({ state: 'off', device_id })
    } else {
      repeatTrigger({ state: 'track', device_id })
    }
  }

  return (
    <Button handleClick={handleRepeat}>
      <PiRepeat size={'1.125rem'} className={cn('', { 'text-color-accent-primary': repeated !== 0 })} />
    </Button>
  )
}
