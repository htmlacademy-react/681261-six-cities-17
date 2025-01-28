import { useAppDispatch } from '../../hooks/use-dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { changeCity } from '../../store/slices/city.ts';
import Card from './components/card/card.tsx';
import { Offer } from '../../types.ts';
import { RoutePath } from '../../constant.ts';

type FavoritesListProps = {
  offers: Offer[];
};

export default function Favorites({ offers }: FavoritesListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const groupedOffers = offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
    navigate(RoutePath.Main);
  };

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(groupedOffers).map(([city, cityOffers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a
                  className="locations__item-link"
                  onClick={() => handleCityClick(city)}
                  role="button"
                >
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <Card key={offer.id} offer={offer} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
