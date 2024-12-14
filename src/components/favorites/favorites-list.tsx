import { Offer } from '../../mocks/offers';
import FavoritesCard from './favorites-card.tsx';

type FavoritesListProps = {
  offers: Offer[];
};

export default function FavoritesList({ offers }: FavoritesListProps) {
  const groupedOffers = offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    if (!acc[offer.city]) {
      acc[offer.city] = [];
    }
    acc[offer.city].push(offer);
    return acc;
  }, {});

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(groupedOffers).map(([city, cityOffers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <FavoritesCard key={offer.id} offer={offer} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
