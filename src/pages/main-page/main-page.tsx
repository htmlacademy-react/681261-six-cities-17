import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { changeCity } from '../../store/slices/city.ts';

import Header from '../../components/header/header.tsx';
import LocationsList from '../../components/locations-list/locations-list.tsx';
import PlacesSorting from '../../components/places-sorting/places-sorting.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import Map from '../../components/map/map.tsx';
import NoPlaces from '../../components/no-places/no-places.tsx';
import LoadingSpinner from '../../components/spiner/spiner.tsx';

import { City, Offer } from '../../types.ts';
import { useSelector } from 'react-redux';
import {
  getActiveCity,
  getLoadingOffersState,
  getOffersByCity,
  getSortedOffers,
  getPointsForMap,
  hasOffersByCity,
} from '../../store/selectors/offers.ts';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [selectedPoint, setSelectedPoint] = useState<City | null>(null);

  const activeCity = useSelector(getActiveCity);
  const loadingOffers = useSelector(getLoadingOffersState);
  const offersByCity = useSelector(getOffersByCity);
  const sortedOffers = useSelector(getSortedOffers);
  const pointsForMap = useSelector(getPointsForMap);
  const hasOffers = useSelector(hasOffersByCity);

  function onCityChange(cityName: string): void {
    dispatch(changeCity(cityName));
  }

  function onListItemHoverHandler(offer: Offer | null): void {
    if (offer) {
      const point: City = {
        id: offer.id,
        name: offer.title,
        location: offer.location,
      };
      setSelectedPoint(point);
    } else {
      setSelectedPoint(null);
    }
  }

  let content: JSX.Element;

  if (loadingOffers) {
    content = (
      <div className="loading-spinner-container">
        <LoadingSpinner />
      </div>
    );
  } else if (hasOffers) {
    content = (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity}
          </b>
          <PlacesSorting/>
          <OfferList offers={sortedOffers} onListItemHover={onListItemHoverHandler} />
        </section>
        <div className="cities__right-section">
          <Map points={pointsForMap} selectedPoint={selectedPoint} height="100vh" />
        </div>
      </div>
    );
  } else {
    content = <NoPlaces city={activeCity} />;
  }

  return (
    <div>
      <div className="page page--gray page--main">
        <Header />

        <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>

          <LocationsList activeCity={activeCity} onCityChange={onCityChange} />

          <div className="cities">{content}</div>
        </main>
      </div>
    </div>
  );
}
