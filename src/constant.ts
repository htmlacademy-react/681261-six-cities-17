export enum RoutePath {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum LoginStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
}

export enum SortOption {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const Pin = {
  DefaultUrl: '/img/pin.svg',
  CurrentUrl: '/img/pin-active.svg',
  Size: [28, 40] as [number, number],
  Anchor: [14, 40] as [number, number],
} as const;

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const RATING_MULTIPLIER = 20;

export const ROOM_TEXT = {
  SINGLE: 'Bedroom',
  PLURAL: 'Bedrooms',
};

export const ADULT_TEXT = {
  SINGLE: 'adult',
  PLURAL: 'adults',
};

export const COMMENT_MIN_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;
export const RATING_VALUES = [5, 4, 3, 2, 1] as const;

export const ratingTitles: Record<number, string> = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Неплохо',
  2: 'Плохо',
  1: 'Ужасно',
};

export const MAX_COMMENTS_DISPLAY = 10;

export const MAX_GALLERY_IMAGES = 6;

export const MAX_NEARBY_POINTS = 3;
