import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import AlbumCardContentList from '@/components/AlbumCardContentList'
import Banner from '@/components/common/Banner'
import GlobalPlayButton from '@/components/common/GlobalPlayButton'
import LyricsContainer from '@/components/common/lyrics/LyricsContainer'
import TrackContainer from '@/components/common/trackItem/TrackContainer'
import getArtist from '@/core/api/artist/getArtist'
import getArtistTopsTrack from '@/core/api/artist/getArtistTopTrack'
import getLyricsByTrackId from '@/core/api/track/getLyricsByTrackId'
import getTrack from '@/core/api/track/getTrack'
import { cn } from '@/lib/utils/classNames'
import { defaultUserImage } from '@/lib/utils/staticImages'
import { GetArtist } from '@/types/raw-api-data-type/artist/get-artist-data-type'
import { GetArtistTopTrack } from '@/types/raw-api-data-type/artist/get-artist-top-track-data-type'
import { GetArtistsAlbums } from '@/types/raw-api-data-type/artist/get-artists-albums-data-type'
import { Lyrics } from '@/types/raw-api-data-type/lyrics/get-lyrics-by-track-id-data'
import { GetTrack } from '@/types/raw-api-data-type/track/get-track-data-type'

import getArtistAlbums from '../../../core/api/artist/getArtistAlbums'

export default async function page({ params }: { params: { slug: string } }) {
  const track: GetTrack = await getTrack(params.slug)
  const artist: GetArtist = await getArtist(track?.artists![0].id)
  const topTracks: GetArtistTopTrack = await getArtistTopsTrack(track?.artists![0].id!)
  const albums: GetArtistsAlbums = await getArtistAlbums(track?.artists![0].id, 8)
  const lyrics: Lyrics = await getLyricsByTrackId(params.slug)

  return (
    <>
      <Banner
        type={'profile'}
        inform={{
          banner_name: track?.name,
          display_name: track?.name,
          // display_name: `${track?.artists.map((el) => el.name).join(' ')} • ${track.album.name} • ${
          //   track.album.release_date
          // } ${convertMilliSecondsToMinutesAndSeconds(track.duration_ms)}`,
          playlist: 0,
          following: 0,
          img: track?.album!.images[0].url,
        }}
      />
      <div className="flex gap-6 justify-start items-center">
        <GlobalPlayButton uri={track.uri} className={'static opacity-100'} />
        <button className="inline-block border border-color-text-secondary rounded-full px-2 text-color-text-primary">
          팔로잉
        </button>
      </div>
      {!lyrics.error && <LyricsContainer uri={track.uri} lyrics={lyrics} />}
      <div className="cursor-pointer hover:bg-color-hover-primary">
        <Link href={`/${artist.type}/${artist.id}`}>
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
      <div>
        <span className="text-sm text-color-text-secondary">다음 아티스트의 인기 트랙</span>
        <h2 className="text-color-text-primary font-bold text-2xl">{artist.name}</h2>
        <TrackContainer className={''} tracks={topTracks.tracks} />
      </div>
      <AlbumCardContentList title={'디스코그래피'} linkPath={''} albums={albums.items} />
    </>
  )
}
