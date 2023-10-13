'use client'

import Script from 'next/script'
import { getSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import {
  setContext,
  setDeviceId,
  setDuration,
  setLoading,
  setPause,
  setPosition,
  setReady,
  setRepeat,
  setShuffle,
  setTrack,
} from '@/ducks/features/player/player'
import { playerApi } from '@/ducks/service/player-api'
import { AppDispatch } from '@/store/store'

export default function WebplaybackProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const [transfer] = playerApi.endpoints.transferPlayback.useMutation()
  return (
    <>
      <Script
        async
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
        onLoad={
          (window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
              name: 'ASAC Team C Web Playback',
              getOAuthToken: (cb) => {
                getSession().then((session) => {
                  cb(session?.accessToken as string)
                })
              },
              volume: 0.5,
            })

            player.addListener('ready', ({ device_id }) => {
              dispatch(setDeviceId(device_id))
              dispatch(setReady(true))
              transfer(device_id)
              console.log('Ready with Device ID', device_id)
            })

            player.addListener('not_ready', ({ device_id }) => {
              dispatch(setReady(false))
              console.log('Device ID has gone offline', device_id)
            })

            player.addListener('player_state_changed', (state) => {
              if (!state) {
                return
              }
              console.log('player state :', state)
              dispatch(setTrack(state.track_window.current_track))
              dispatch(setContext(state.context))
              dispatch(setPause(state.paused))
              dispatch(setLoading(state.loading))
              if (!state.context.uri) {
                //track
                state.context.metadata?.current_item.uri === state.track_window.current_track?.uri
                  ? dispatch(setPosition(state.position))
                  : dispatch(setPosition(0))
              } else {
                //context
                state.context.metadata?.current_item.uri === state.track_window.current_track?.uri
                  ? dispatch(setPosition(state.position))
                  : dispatch(setPosition(0))
              }
              dispatch(setDuration(state.track_window.current_track?.duration_ms))
              dispatch(setRepeat(state.repeat_mode))
              dispatch(setShuffle(state.shuffle))
            })
            player.on('initialization_error', ({ message }) => {
              console.error('Failed to initialize', message)
            })
            player.on('authentication_error', ({ message }) => {
              console.error('Failed to authenticate', message)
            })
            player.on('account_error', ({ message }) => {
              console.error('Failed to validate Spotify account', message)
            })
            player.on('playback_error', ({ message }) => {
              console.error('Failed to perform playback', message)
            })

            player.connect()
          })
        }
      />
      {children}
    </>
  )
}
