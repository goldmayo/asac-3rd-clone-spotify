'use client'
import { createContext, useContext } from 'react'

import { BannerContentObject } from '@/lib/utils/createBannerContentObject'

const BannerContext = createContext<BannerContentObject | null>(null)

export function useBannerContext() {
  const context = useContext(BannerContext)
  if (!context) {
    throw new Error('BannerContext.* component must be rendered as child of Banner component')
  }
  return context
}

export default BannerContext
