import {Offer} from '../../mocks/offers.ts';
import OfferCard from './offer-card.tsx';
import { useState } from 'react';

type OfferListProps = {
  offers: Offer[];
  onListItemHover: (offer: Offer | null) => void;
};

export default function OfferList({ offers, onListItemHover }: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setActiveCard] = useState<Offer | null>(null);

  function onHoverHandler(offer: Offer | null): void {
    setActiveCard(offer);
    onListItemHover(offer);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onHover={onHoverHandler}
        />
      ))}
    </div>
  );
}

