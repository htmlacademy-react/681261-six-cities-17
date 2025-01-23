import { useAppDispatch } from '../../../../hooks/useDispatch.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Offer } from '../../../../types.ts';
import FavoriteButton from '../button/button.tsx';
import { FavoritesEnvironment } from '../../types.ts';
import { changeFavoriteStatus } from '../../../../store/slices/favorites.ts';
import { updateFavoriteInFavorites } from '../../../../store/slices/favorites.ts';
import { LoginStatus } from '../../../../constant.ts';
import { RootState } from '../../../../store';
import { updateFavoriteInOffersList } from '../../../../store/slices/offer.ts';
import { updateFavoriteInDetails } from '../../../../store/slices/details.ts';

type FavoritesCardProps = {
  offer: Offer;
};

export default function Card({ offer }: FavoritesCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const onFavoriteButtonClick = async () => {
    if (authorizationStatus !== LoginStatus.Auth) {
      navigate('/login');
      return;
    }

    const newStatus = offer.isFavorite ? 0 : 1;

    const updatedOffer = await dispatch(
      changeFavoriteStatus({ offerId: offer.id, status: newStatus })
    ).unwrap();

    dispatch(updateFavoriteInOffersList(updatedOffer));
    dispatch(updateFavoriteInFavorites(updatedOffer));
    dispatch(updateFavoriteInDetails(updatedOffer));
  };

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={offer.isFavorite}
            onFavoriteButtonClick={onFavoriteButtonClick}
            environment={FavoritesEnvironment.Card}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
