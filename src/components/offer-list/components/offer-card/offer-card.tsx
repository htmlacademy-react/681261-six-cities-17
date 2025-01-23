import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useDispatch.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Offer } from '../../../../types.ts';
import { FavoritesEnvironment } from '../../../favorites/types.ts';
import FavoriteButton from '../../../favorites/components/button/button.tsx';
import {changeFavoriteStatus, updateFavoriteInFavorites} from '../../../../store/slices/favorites.ts';
import { updateFavoriteInOffersList } from '../../../../store/slices/offer.ts';
import { LoginStatus } from '../../../../constant.ts';
import { updateFavoriteInDetails } from '../../../../store/slices/details.ts';

type OfferCardProps = {
  offer: Offer;
  onHover: (offer: Offer | null) => void;
};

export default function OfferCard({ offer, onHover }: OfferCardProps): JSX.Element {
  const { id, title, price, previewImage, type, rating, isPremium, isFavorite } = offer;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const onFavoriteClick = async () => {
    if (authorizationStatus !== LoginStatus.Auth) {
      navigate('/login');
      return;
    }

    const newStatus = isFavorite ? 0 : 1;

    const updatedOffer = await dispatch(changeFavoriteStatus({ offerId: id, status: newStatus })).unwrap();

    dispatch(updateFavoriteInOffersList(updatedOffer));
    dispatch(updateFavoriteInFavorites(updatedOffer));
    dispatch(updateFavoriteInDetails(updatedOffer));
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onHover(offer)}
      onMouseLeave={() => onHover(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            onFavoriteButtonClick={onFavoriteClick}
            environment={FavoritesEnvironment.Card}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
