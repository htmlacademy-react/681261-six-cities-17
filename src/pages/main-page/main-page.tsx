import OfferList from '../../components/offer/offer-list.tsx';
import Map from '../../components/map/map.tsx';
import { city } from '../../mocks/city.ts';
import { points } from '../../mocks/points.ts';
import { Offer, Point, SortOption } from '../../types.ts';
import LocationsList from '../../components/locations-list/locations-list.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/actions.ts';
import PlacesSorting from '../../components/places-sorting/places-sorting.tsx';
import { SortOptions } from '../../constant.ts';
import { useAppDispatch } from '../../hooks/useDispatch.ts';
import NoPlaces from '../../components/no-places/no-places.tsx';
import Header from '../../components/header/header.tsx';
import { useState, useMemo } from 'react';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteCount = 4;
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const [currentSort, setCurrentSort] = useState<SortOption>(SortOptions.Popular);

  const activeCity = useSelector((state: RootState) => state.activeCity);
  const offers = useSelector((state: RootState) => state.offers);
  const offersByCity = offers.filter((offer) => offer.city === activeCity);

  const sortedOffers = useMemo(() => {
    const sorted = [...offersByCity];
    switch (currentSort) {
      case SortOptions.LowToHigh:
        return sorted.sort((a, b) => a.price - b.price);
      case SortOptions.HighToLow:
        return sorted.sort((a, b) => b.price - a.price);
      case SortOptions.TopRated:
        return sorted.sort((a, b) => b.rating - a.rating);
      case SortOptions.Popular:
      default:
        return sorted;
    }
  }, [offersByCity, currentSort]);

  function handleSortChange(sort: SortOption): void {
    setCurrentSort(sort);
  }

  function handleCityChange(cityName: string): void {
    dispatch(changeCity(cityName));
  }

  function onListItemHoverHandler(offer: Offer | null): void {
    if (offer) {
      const point: Point = {
        title: offer.title,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      };
      setSelectedPoint(point);
    } else {
      setSelectedPoint(undefined);
    }
  }

  const hasOffers = offersByCity.length > 0;

  const userEmail = 'Oliver.conner@gmail.com';

  return (
    <div>
      <div className="page page--gray page--main">
        <Header
          userEmail={userEmail}
          favoriteCount={favoriteCount}
        />

        <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>

          <LocationsList
            activeCity={activeCity}
            onCityChange={handleCityChange}
          />

          <div className="cities">
            {hasOffers ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity}
                  </b>
                  <PlacesSorting
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                  />
                  <OfferList
                    offers={sortedOffers}
                    onListItemHover={onListItemHoverHandler}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    city={city}
                    points={points}
                    selectedPoint={selectedPoint}
                    height="100vh"
                  />
                </div>
              </div>
            ) : (
              <NoPlaces city={activeCity} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
