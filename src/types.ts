export interface City {
  name: string;
  id: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface NearbyOffer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface OfferDetails {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}

export type CommentItem = {
  id: string;
  date: string;
  user: UserInComment;
  comment: string;
  rating: number;
}

export type CommentPostPayload = {
  comment: string;
  rating: number;
  offerId: string;
}

type UserInComment = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type FavoriteItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Favorites = FavoriteItem[]
