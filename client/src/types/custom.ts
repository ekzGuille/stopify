import {
  AlbumType, ReleaseDatePrecision,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyImage,
  SpotifyLinkedFrom,
  Type,
} from '@/types/spotify';

type Image = SpotifyImage

export interface UserProfile {
  id: string;
  display_name: string;
  image: string;
  product: string;
  spotifyProfileUrl: string;
  country: string;
  followersCount: number;
}

interface UserQuery {
  limit: number;
  total: number;
  offset: number;
}

export interface UserPlaylist extends UserQuery{
  items: PlaylistItem[];
}

export interface UserTopAlbums extends UserQuery {
  items: Album[];
}

export interface UserTopTracks extends UserQuery {
  items: TrackItem[];
}

export interface UserSavedTracks extends UserQuery {
  items: TrackItem[];
}

export interface PlaylistItem {
  url: string;
  id: string;
  image: Image;
  name: string;
  public: boolean;
  trackCount: number;
}

export interface TrackItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  uri: string;
  linked_from: SpotifyLinkedFrom;
  // WIP
}

export interface Album {
  artists: SpotifyArtist[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: SpotifyImage;
  name: string;
  release_date: Date;
  total_tracks: number;
  uri: string;
  // WIP
}
