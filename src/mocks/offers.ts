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

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    description: 'A quiet cozy and picturesque location that provides a wonderful home for your family.',
    price: 120,
    rating: 4.8,
    type: 'Apartment',
    image: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: true,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    description: 'This place has a lot of space and great interior design.',
    price: 80,
    rating: 4.5,
    type: 'Private room',
    image: 'img/room.jpg',
    isPremium: false,
    isFavorite: true,
    city: 'Amsterdam',
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    description: 'A perfect spot for enjoying Amsterdam’s canals.',
    price: 132,
    rating: 4.9,
    type: 'House',
    image: 'img/apartment-02.jpg',
    isPremium: false,
    isFavorite: true,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    description: 'The apartment is fully furnished and located near the park.',
    price: 180,
    rating: 4.7,
    type: 'Apartment',
    image: 'img/apartment-03.jpg',
    isPremium: false,
    isFavorite: true,
    city: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
  },
];
