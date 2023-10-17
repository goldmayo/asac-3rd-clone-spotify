import {
  AlbumDescription,
  ArtistDescription,
  PlaylistDescription,
  ProfileDescription,
  TrackDescription,
} from '@/types/banner/bannerType'
import { Image } from '@/types/common/images-data-type'
import { AlbumItem } from '@/types/raw-api-data-type/artist/get-artists-albums-data-type'
import { ArtistItem } from '@/types/raw-api-data-type/artist/get-related-artist-data-type'
import { PlaylistItem } from '@/types/raw-api-data-type/playlist/featured-playlist-data-type'
import { TrackItem } from '@/types/raw-api-data-type/track/get-track-data-type'
import { UserItem } from '@/types/raw-api-data-type/user/get-current-user-profile-data-type'

type Items = ArtistItem | AlbumItem | PlaylistItem | TrackItem | UserItem

export type CommonBannerContentObject = {
  title: string
  uri: string
  type: string
}

export interface BannerContentObject {
  title: string
  uri: string
  type: string
  image: Image
  description: ArtistDescription | AlbumDescription | PlaylistDescription | ProfileDescription | TrackDescription
}

const extractCommonContentFromObject = <T extends Exclude<Items, UserItem>>(obj: T): CommonBannerContentObject => {
  const { name, uri, type } = obj
  return { title: name, uri, type }
}
const extractCommonContentFromUserObject = (obj: UserItem): CommonBannerContentObject => {
  const { display_name, uri, type } = obj
  return { title: display_name, uri, type }
}

const getContentFromArtist = (obj: ArtistItem): BannerContentObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, followers } = obj
  const description: ArtistDescription = {
    followers: followers.total,
  }
  return { ...common, image: images[0], description }
}

const getContentFromAlbum = (obj: AlbumItem): BannerContentObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, artists, release_date, total_tracks } = obj
  const artistName = artists.map((el) => el.name).join(' ')
  const description: AlbumDescription = { artistName, releaseDate: release_date, totalTracks: total_tracks }
  return {
    ...common,
    image: images[0],
    description,
  }
}

const getContentFromUser = (obj: UserItem): BannerContentObject => {
  const common = extractCommonContentFromUserObject(obj)
  const { images, followers } = obj
  const description: ProfileDescription = {
    publicPlaylistCounts: 0,
    followers: followers.total,
  }
  return { ...common, image: images[0], description }
}

const getContentFromPlayList = (obj: PlaylistItem): BannerContentObject => {
  const common = extractCommonContentFromObject(obj)
  const { images, description, owner, tracks } = obj
  const descriptions: PlaylistDescription = {
    ownerName: owner.display_name,
    totalTracks: tracks.total,
    description,
  }
  return { ...common, image: images[0], description: descriptions }
}

const getContentFromTrack = (obj: TrackItem): BannerContentObject => {
  const common = extractCommonContentFromObject(obj)
  const { album, artists } = obj
  const { images } = album!
  const artistName = artists!.map((el) => el.name).join(' ')
  const description: TrackDescription = {
    artistName: artistName,
    albumName: album?.name || '',
    releaseDate: album?.release_date || '',
    albumUri: album?.uri || '',
    artistUri: artists![0].uri,
  }
  return { ...common, image: images[0], description }
}

export const createBannerContentFromItem = {
  artist: getContentFromArtist,
  album: getContentFromAlbum,
  user: getContentFromUser,
  playlist: getContentFromPlayList,
  track: getContentFromTrack,
}
