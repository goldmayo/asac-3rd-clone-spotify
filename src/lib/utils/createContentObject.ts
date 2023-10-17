import { Image } from '@/types/common/images-data-type'
import { AlbumItem } from '@/types/raw-api-data-type/artist/get-artists-albums-data-type'
import { ArtistItem } from '@/types/raw-api-data-type/artist/get-related-artist-data-type'
import { PlaylistItem } from '@/types/raw-api-data-type/playlist/featured-playlist-data-type'
import { TrackItem } from '@/types/raw-api-data-type/track/get-track-data-type'

type Items = ArtistItem | AlbumItem | PlaylistItem | TrackItem

// HOC으로 감싸고 넘기면 가능할 듯?
export type CommonContentObject = {
  id: string
  name: string
  uri: string
}

export interface ContentCardObject {
  id: string
  name: string
  uri: string
  image: Image
  description: string
}

const extractCommonContentFromObject = <T extends Items>(obj: T): CommonContentObject => {
  const { id, name, uri } = obj
  return { id, name, uri }
}

const getContentFromArtist = (obj: ArtistItem): ContentCardObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, type } = obj
  return { ...common, image: images[0], description: type }
}

const getContentFromAlbum = (obj: AlbumItem): ContentCardObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, artists } = obj
  const description = artists.map((el) => el.name).join(' ')
  return { ...common, image: images[0], description }
}

// const getContentFromUser = (obj: UserItem): ContentCardObject => {
//   const common = extractCommonContentFromObject(obj)
//   const { images, type } = obj
//   return { ...common, image: images[0], description: type }
// }

const getContentFromPlayList = (obj: PlaylistItem): ContentCardObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, description } = obj
  return { ...common, image: images[0], description }
}

const getContentFromTrack = (obj: TrackItem): ContentCardObject => {
  const common = extractCommonContentFromObject(obj)
  const { album, artists } = obj
  const { images } = album!
  const description = artists!.map((el) => el.name).join(' ')
  return { ...common, image: images[0], description }
}

export const createContentFromItem = {
  artist: getContentFromArtist,
  album: getContentFromAlbum,
  // user: getContentFromUser,
  playlist: getContentFromPlayList,
  track: getContentFromTrack,
}

/**
 * ! 사용예시
 *
 * * createContentFromItem["typeof ItemType"](param : Items) : CommonContentObject
 * * createContentFromItem.typeof ItemType(param : Items) : CommonContentObject
 *
 * ? const fetched-raw-playlists-data = useFetch(/playlist)
 * ? {
 * ?   fetched-raw-data-playlists-data.Item.map(
 * ?     (playlist) =>
 * ?       <ContentCard data={createContentFromItem.playlist(playlist)} .../>
 * ?   )
 * ? }
 */
