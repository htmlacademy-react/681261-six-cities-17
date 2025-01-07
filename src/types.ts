export type City = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type Points = Point[];

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type Offer = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  type: string;
  image: string;
  isPremium: boolean;
  isFavorite: boolean;
  city: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};
