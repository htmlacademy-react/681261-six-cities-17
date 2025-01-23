import { createSelector } from 'reselect';
import { RootState } from '../index.ts';
import { SortOptions } from '../../constant.ts';

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
    const sorted = [...offersByCity];
    switch (currentSort) {
      case SortOptions.LowToHigh:
        return sorted.sort((a, b) => a.price - b.price);
      case SortOptions.HighToLow:
        return sorted.sort((a, b) => b.price - a.price);
      case SortOptions.TopRated:
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
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
