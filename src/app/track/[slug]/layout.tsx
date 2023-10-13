import type { Metadata } from 'next'

import getTrack from '@/core/api/track/getTrack'
import { GetTrack } from '@/types/raw-api-data-type/track/get-track-data-type'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug
  const trackData: GetTrack = await getTrack(id)

  return {
    title: `${trackData.name} | Team-C Spotify Web player`,
    description: `${trackData.name} Track page in Team-C Spotify Web player`,
  }
}

export default async function TrackLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col gap-10 pt-2 mb-10">{children}</section>
}
