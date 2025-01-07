import OfferList from '../../components/offer/offer-list.tsx';
import Map from '../../components/map/map.tsx';
import { city } from '../../mocks/city.ts';
import { points } from '../../mocks/points.ts';
import {useMemo, useState} from 'react';
import {Offer, Point, SortOption} from '../../types.ts';
import LocationsList from '../../components/locations-list/locations-list.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/actions.ts';
import PlacesSorting from '../../components/places-sorting/places-sorting.tsx';
import { SortOptions } from '../../constant.ts';
import { useAppDispatch } from '../../hooks/useDispatch.ts';
import NoPlaces from '../../components/no-places/no-places.tsx';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const count = 4;
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
        title:offer.title,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      };
      setSelectedPoint(point);
    } else {
      setSelectedPoint(undefined);
    }
  }

  const hasOffers = offersByCity.length > 0;

  return (
    <div>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{count}</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
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
                  <PlacesSorting currentSort={currentSort} onSortChange={handleSortChange}/>
                  <OfferList offers={sortedOffers} onListItemHover={onListItemHoverHandler}/>
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
              <NoPlaces city={activeCity}/>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
