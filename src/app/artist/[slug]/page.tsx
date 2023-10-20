import { RGBColor } from 'colorthief'
import React from 'react'

import AlbumCardContentList from '@/components/AlbumCardContentList'
import ContentCardListItem from '@/components/CardContentListItem'
import ArtistBanner from '@/components/common/banner/ArtistBanner'
import BannerBackgroundSecondary from '@/components/common/banner/banner-background/BannBackgroundSecondary'
import BannerBackground from '@/components/common/banner/banner-background/BannerBackgroundPrimary'
import ContentCardContainer from '@/components/common/ContentContainer'
import GlobalPlayButton from '@/components/common/GlobalPlayButton'
import Header from '@/components/common/Header'
import TrackContainer from '@/components/common/trackItem/TrackContainer'
import getArtist from '@/core/api/artist/getArtist'
import getArtistTopsTrack from '@/core/api/artist/getArtistTopTrack'
import getRelatedArtists from '@/core/api/artist/getRelatedArtists'
import { createContentFromItem } from '@/lib/utils/createContentObject'
import { extractDominantColorFromImage } from '@/lib/utils/extractAvrColorFromImage'
import { GetArtist } from '@/types/raw-api-data-type/artist/get-artist-data-type'
import { GetArtistTopTrack } from '@/types/raw-api-data-type/artist/get-artist-top-track-data-type'
import { GetArtistsAlbums } from '@/types/raw-api-data-type/artist/get-artists-albums-data-type'
import { GetRelatedArtists } from '@/types/raw-api-data-type/artist/get-related-artist-data-type'

import getArtistAlbums from '../../../core/api/artist/getArtistAlbums'

export default async function page({ params }: { params: { slug: string } }) {
  const artist: GetArtist = await getArtist(params.slug)
  const topTracks: GetArtistTopTrack = await getArtistTopsTrack(params.slug)
  const albums: GetArtistsAlbums = await getArtistAlbums(params.slug, 8)
  const relatedArtists: GetRelatedArtists = await getRelatedArtists(params.slug)
  const dominantColor: RGBColor = await extractDominantColorFromImage(artist?.images[0].url!)

  return (
    <>
      {/* <HeaderBackground type={'default'} bgColor={dominantColor} /> */}
      <Header type={'default'} bgColor={dominantColor} />
      <ArtistBanner artistData={artist} />
      <BannerBackground dominantColor={dominantColor} />
      <div className="flex gap-6 justify-start items-center py-4 mb-6 relative">
        <BannerBackgroundSecondary dominantColor={dominantColor} />
        <GlobalPlayButton uri={artist.uri} className={'static opacity-100 ml-4'} />
        <button className="inline-block border border-color-text-secondary rounded-full px-2 text-color-text-primary">
          팔로잉
        </button>
      </div>
      <div className="mb-10 px-4">
        <h2 className="text-color-text-primary font-bold text-2xl">인기</h2>
        <TrackContainer className={''} tracks={topTracks.tracks} />
      </div>
      <div className="mb-10 px-4">
        <AlbumCardContentList title={'디스코그래피'} linkPath={''} albums={albums.items} />
      </div>
      <div className="px-4">
        <ContentCardContainer title={`팬들이 좋아하는 다른 음악`} linkPath={'/test'}>
          {relatedArtists?.artists.map((artist) => (
            <ContentCardListItem key={artist.id} content={createContentFromItem.artist(artist)} />
          ))}
        </ContentCardContainer>
      </div>
    </>
  )
}
