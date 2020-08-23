import {
  SpotifyAlbum,
  SpotifyArtist, SpotifyFollowers,
  SpotifyImage,
  SpotifyLinkedFrom,
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

export interface UserTopArtists extends UserQuery {
  items: Artist[];
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
  added_at?: Date;
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
  linked_from: SpotifyLinkedFrom; // TODO: borrar?
}

export interface Artist {
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  popularity: number;
  image: SpotifyImage;
  id: string;
  name: string;
}
