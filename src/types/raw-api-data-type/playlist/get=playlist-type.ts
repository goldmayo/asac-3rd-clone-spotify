export interface GetPlaylist {
  collaborative: boolean;
  description:   string;
  external_urls: ExternalUrls;
  followers:     Followers;
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  owner:         Owner;
  primary_color: null;
  public:        boolean;
  snapshot_id:   string;
  tracks:        Tracks;
  type:          string;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
}

export interface Image {
  height: number | null;
  url:    string;
  width:  number | null;
}

export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  type:          Type;
  uri:           string;
  name?:         string;
}

export type Type = "user" | "artist";

export interface Tracks {
  href:     string;
  items:    Item[];
  limit:    number;
  next:     null;
  offset:   number;
  previous: null;
  total:    number;
}

export interface Item {
  added_at:        Date;
  added_by:        Owner;
  is_local:        boolean;
  primary_color:   null;
  track:           Track;
  video_thumbnail: VideoThumbnail;
}

export interface Track {
  album:         Album;
  artists:       Owner[];
  disc_number:   number;
  duration_ms:   number;
  episode:       boolean;
  explicit:      boolean;
  external_ids:  ExternalIDS;
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  is_local:      boolean;
  is_playable:   boolean;
  name:          string;
  popularity:    number;
  preview_url:   null | string;
  track:         boolean;
  track_number:  number;
  type:          string;
  uri:           string;
}

export interface Album {
  album_type:             string;
  artists:                Owner[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  is_playable:            boolean;
  name:                   string;
  release_date:           Date;
  release_date_precision: string;
  total_tracks:           number;
  type:                   string;
  uri:                    string;
}

export interface ExternalIDS {
  isrc: string;
}

export interface VideoThumbnail {
  url: null;
}
