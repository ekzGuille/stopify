interface SpotifyResponse {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: Record<string, string>;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyFollowers {
  href: null;
  total: number;
}

export interface SpotifyImage {
  height: null;
  url: string;
  width: null;
}

export interface SpotifyUserPlaylist extends SpotifyResponse {
  items: SpotifyPlaylistItem[];
}

export interface SpotifyPlaylistItem {
  collaborative: boolean;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: any[];
  name: string;
  owner: SpotifyOwner;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyPlaylistTracks;
  type: string;
  uri: string;
}

export interface SpotifyOwner {
  external_urls: Record<string, string>;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SpotifyPlaylistTracks {
  href: string;
  total: number;
}

export interface SpotifySavedTracks extends SpotifyResponse {
  items: SpotifySavedTrackItem[];
}

export interface SpotifyTopArtists extends SpotifyResponse {
  items: SpotifyArtist[];
}

export interface SpotifyTopTracks extends SpotifyResponse {
  items: SpotifyTrackItem[];
}

export interface SpotifySavedTrackItem {
  added_at: Date;
  track: SpotifyTrackItem;
}

export interface SpotifyTrackItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: Type.Track;
  uri: string;
  linked_from: SpotifyLinkedFrom;
}

export interface SpotifyAlbum {
  album_type: AlbumType;
  artists: SpotifyArtist[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: Type.Album;
  uri: string;
}

export interface SpotifyArtist {
  external_urls: Record<string, string>;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  popularity: number;
  images: SpotifyImage[];
  id: string;
  name: string;
  type: Type.Artist;
  uri: string;
}

export interface SpotifyLinkedFrom {
  external_urls: Record<string, string>;
  href: string;
  id: string;
  type: Type.Track;
  uri: string;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export enum Type {
  Album = 'album',
  Track = 'track',
  Artist = 'artist',
}

export enum AlbumType {
  Single = 'single',
  Album = 'album',
  Compilation = 'compilation',
}
