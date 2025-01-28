import { createSelector } from 'reselect';
import { RootState } from '../index.ts';
import { SortOption } from '../../constant.ts';

export const getOffers = (state: RootState) => state.offers.offers;
export const getActiveCity = (state: RootState) => state.city.activeCity;
export const getLoadingOffersState = (state: RootState) => state.offers.loading;
export const getCurrentSort = (state: RootState) => state.offers.currentSort;

export const getOffersByCity = createSelector(
  [getOffers, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity)
);

export const getSortedOffers = createSelector(
  [getOffersByCity, getCurrentSort],
  (offersByCity, currentSort) => {
    const sortedOffers = [...offersByCity];
    switch (currentSort) {
      case SortOption.LowToHigh:
        return sortedOffers.sort((a, b) => a.price - b.price);
      case SortOption.HighToLow:
        return sortedOffers.sort((a, b) => b.price - a.price);
      case SortOption.TopRated:
        return sortedOffers.sort((a, b) => b.rating - a.rating);
      default:
        return sortedOffers;
    }
  }
);

export const getPointsForMap = createSelector(
  [getOffersByCity],
  (offersByCity) =>
    offersByCity.map((offer) => ({
      id: offer.id,
      name: offer.title,
      location: offer.location,
    }))
);

export const hasOffersByCity = createSelector(
  [getOffersByCity],
  (offersByCity) => offersByCity.length > 0
);
