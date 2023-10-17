import { ReactNode } from 'react'

export type ArtistDescription = {
  followers: number
}

export type AlbumDescription = {
  artistName: string
  releaseDate: string
  totalTracks: number
}

export type PlaylistDescription = {
  ownerName: string
  totalTracks: number
  description: string
}

export type ProfileDescription = {
  publicPlaylistCounts: number
  followers: number
}

export type TrackDescription = {
  artistName: string
  albumName: string
  releaseDate: string
  albumUri: string
  artistUri: string
}

// page: "playlist" | "profile" | "track" | "album" | "categories" | "artist";
export interface ProfileImageType {
  title: string
  type?: string
  image?: string
  description?: ReactNode
  artistDescription?: ArtistDescription
  albumDescription?: AlbumDescription
  playlistDescription?: PlaylistDescription
  profileDescription?: ProfileDescription
  trackDescription?: TrackDescription
}

export interface MainType {
  title: string
  description: ReactNode
}

// Create a banner component interface to represent all layout types
export interface BannerProps {
  profileImageType?: ProfileImageType
  mainType?: MainType
}
