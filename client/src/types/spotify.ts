export interface SPUserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: SPExternalUrls;
  followers: SPFollowers;
  href: string;
  id: string;
  images: SPImage[];
  product: string;
  type: string;
  uri: string;
}

export interface UserProfile {
  id: string;
  display_name: string;
  image: string;
  product: string;
  spotifyProfileUrl: string;
  country: string;
  followersCount: number;
}

export interface SPExternalUrls {
  spotify: string;
}

export interface SPFollowers {
  href: null;
  total: number;
}

export interface SPImage {
  height: null;
  url: string;
  width: null;
}

export interface SPUserPlaylist {
  href: string;
  items: SPItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface UserPlaylist {
  limit: number;
  total: number;
  items: Item[];
  offset: number;
}

export interface SPItem {
  collaborative: boolean;
  external_urls: SPExternalUrls;
  href: string;
  id: string;
  images: any[];
  name: string;
  owner: SPOwner;
  public: boolean;
  snapshot_id: string;
  tracks: SPTracks;
  type: string;
  uri: string;
}

export interface Item {
  url: string;
  id: string;
  image: Image;
  name: string;
  public: boolean;
  trackCount: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface SPOwner {
  external_urls: SPExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SPTracks {
  href: string;
  total: number;
}
