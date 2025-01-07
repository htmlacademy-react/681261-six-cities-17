import OfferCard from './offer-card.tsx';
import { useState } from 'react';
import { Offer } from '../../types.ts';

type OfferListProps = {
  offers: Offer[];
  onListItemHover: (offer: Offer | null) => void;
  className?: string;
};

export default function OfferList({ offers, onListItemHover, className = '' }: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setActiveCard] = useState<Offer | null>(null);

  function onHoverHandler(offer: Offer | null): void {
    setActiveCard(offer);
    onListItemHover(offer);
  }

  const combinedClassName = `cities__places-list places__list tabs__content ${className}`.trim();

  return (
    <div className={combinedClassName}>
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
