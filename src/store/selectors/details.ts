import { createSelector } from 'reselect';
import { RootState } from '../index.ts';
import { MAX_NEARBY_POINTS } from '../../constant.ts';

export const getOfferDetails = (state: RootState) => state.details.offerDetails;
export const getNearbyOffers = (state: RootState) => state.details.nearbyOffers;
export const getLoadingState = (state: RootState) => state.details.loading;

export const getSelectedPoint = createSelector(
  [getOfferDetails],
  (offerDetails) => {
    if (offerDetails) {
      return {
        id: offerDetails.id,
        name: offerDetails.city.name,
        location: offerDetails.location,
      };
    }
    return null;
  }
);

export const getMapPoints = createSelector(
  [getNearbyOffers, getSelectedPoint],
  (nearbyOffers, selectedPoint) => {
    const nearbyPoints = nearbyOffers.slice(0, MAX_NEARBY_POINTS).map((item) => ({
      id: item.id,
      name: item.title,
      location: item.location,
    }));
    return selectedPoint ? [...nearbyPoints, selectedPoint] : nearbyPoints;
  }
);
