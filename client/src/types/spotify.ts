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
  display_name: string;
  image: string;
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
