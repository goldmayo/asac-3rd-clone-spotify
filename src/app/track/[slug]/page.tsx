import { RGBColor } from 'colorthief'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import AlbumCardContentList from '@/components/AlbumCardContentList'
import BannerBackgroundSecondary from '@/components/common/banner/banner-background/BannBackgroundSecondary'
import BannerBackgroundPrimary from '@/components/common/banner/banner-background/BannerBackgroundPrimary'
import TracKBanner from '@/components/common/banner/TracKBanner'
import GlobalPlayButton from '@/components/common/GlobalPlayButton'
import Header from '@/components/common/Header'
import LyricsContainer from '@/components/common/lyrics/LyricsContainer'
import TrackContainer from '@/components/common/trackItem/TrackContainer'
import getArtist from '@/core/api/artist/getArtist'
import getArtistAlbums from '@/core/api/artist/getArtistAlbums'
import getArtistTopsTrack from '@/core/api/artist/getArtistTopTrack'
import getLyricsByTrackId from '@/core/api/track/getLyricsByTrackId'
import getTrack from '@/core/api/track/getTrack'
import { cn } from '@/lib/utils/classNames'
import { extractDominantColorFromImage } from '@/lib/utils/extractAvrColorFromImage'
import { defaultUserImage } from '@/lib/utils/staticImages'
import { GetArtist } from '@/types/raw-api-data-type/artist/get-artist-data-type'
import { GetArtistTopTrack } from '@/types/raw-api-data-type/artist/get-artist-top-track-data-type'
import { GetArtistsAlbums } from '@/types/raw-api-data-type/artist/get-artists-albums-data-type'
import { Lyrics } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'
import { GetTrack } from '@/types/raw-api-data-type/track/get-track-data-type'

export default async function page({ params }: { params: { slug: string } }) {
  const track: GetTrack = await getTrack(params.slug)
  const artist: GetArtist = await getArtist(track?.artists![0].id)
  const topTracks: GetArtistTopTrack = await getArtistTopsTrack(track?.artists![0].id!)
  const albums: GetArtistsAlbums = await getArtistAlbums(track?.artists![0].id, 8)
  const lyrics: Lyrics = await getLyricsByTrackId(params.slug)
  const dominantColor: RGBColor = await extractDominantColorFromImage(track.album?.images[0].url!)

  return (
    <>
      <Header type={'default'} bgColor={dominantColor} />
      <BannerBackgroundPrimary dominantColor={dominantColor} />
      <TracKBanner trackData={track} />
      <div className="flex gap-6 justify-start items-center py-4 mb-6 relative">
        <BannerBackgroundSecondary dominantColor={dominantColor} />
        <GlobalPlayButton uri={track.uri} className={'static opacity-100 ml-4'} />
        <button className="inline-block border border-color-text-secondary rounded-full px-2 text-color-text-primary">
          팔로잉
        </button>
      </div>
      {!lyrics.error && <LyricsContainer uri={track.uri} lyrics={lyrics} />}
      <div className="mb-10 px-4 min-w-[200px] max-w-[400px] rounded-lg hover:bg-color-hover-primary/30">
        <Link className={'cursor-pointer'} href={`/${artist.type}/${artist.id}`}>
          <div className={cn('grid grid-cols-[auto_1fr] p-2 gap-x-3 gap-y-2 overflow-x-hidden')}>
            <Image
              className={'rounded-full'}
              src={!artist.images ? defaultUserImage : `${artist.images[0].url}`}
              width={80}
              height={80}
              alt={`${track.name}`}
            />
            <div className={cn('flex flex-col')}>
              <span className="break-all text-color-text-secondary line-clamp-1">{`${artist.type}`}</span>
              <span className="break-all text-color-text-primary line-clamp-1 hover:underline">{`${artist.name}`}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={'mb-10 px-4'}>
        <span className="text-sm text-color-text-secondary">다음 아티스트의 인기 트랙</span>
        <h2 className="text-color-text-primary font-bold text-2xl">{artist.name}</h2>
        <TrackContainer className={''} tracks={topTracks.tracks} />
      </div>
      <div className={'px-4'}>
        <AlbumCardContentList title={'디스코그래피'} linkPath={''} albums={albums.items} />
      </div>
    </>
  )
}
