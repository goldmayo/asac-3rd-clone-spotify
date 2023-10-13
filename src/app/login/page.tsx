import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Team-C Spotify Web player | Login',
  description: 'Login page in Team-C Spotify Web player',
}
import LoginButton from '@/components/LoginButton'

export default function page() {
  return <LoginButton />
}
