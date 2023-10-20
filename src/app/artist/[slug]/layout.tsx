import type { Metadata } from 'next'

import getArtist from '@/core/api/artist/getArtist'
import { GetArtist } from '@/types/raw-api-data-type/artist/get-artist-data-type'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug
  const artistData: GetArtist = await getArtist(id)
  return {
    title: `${artistData.name} | Team-C Spotify Web player`,
    description: `${artistData.name} Artist page in Team-C Spotify Web player`,
  }
}

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col mb-10 relative">{children}</section>
}
