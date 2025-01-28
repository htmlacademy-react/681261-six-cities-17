import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/use-dispatch.ts';

import Header from '../../components/header/header.tsx';
import LoadingSpinner from '../../components/spiner/spiner.tsx';
import CommentList from '../../components/comment-list/comment-list.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import Map from '../../components/map/map.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';

import {ADULT_TEXT, LoginStatus, RATING_MULTIPLIER, ROOM_TEXT, RoutePath} from '../../constant.ts';

import { fetchNearbyOffers, fetchOfferDetails } from '../../store/slices/details.ts';
import { fetchOfferComments, sendComment } from '../../store/slices/comments.ts';
import FavoriteButton from '../../components/favorites/components/button/button.tsx';
import { FavoritesEnvironment } from '../../components/favorites/types.ts';
import { changeFavoriteStatus, updateFavoriteInFavorites } from '../../store/slices/favorites.ts';
import { updateFavoriteInOffersList } from '../../store/slices/offer.ts';
import { updateFavoriteInDetails } from '../../store/slices/details.ts';
import {
  getLoadingState,
  getMapPoints,
  getNearbyOffers,
  getOfferDetails,
  getSelectedPoint
} from '../../store/selectors/details.ts';
import { getAuthorizationStatus } from '../../store/selectors/user.ts';
import { FAVORITE_STATUS } from '../../store/types.ts';

export default function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isLoading = useSelector(getLoadingState);
  const offerDetails = useSelector(getOfferDetails);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const mapPoints = useSelector(getMapPoints);
  const selectedPoint = useSelector(getSelectedPoint);
  const nearbyOffers = useSelector(getNearbyOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetails(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchOfferComments(id));
    }
  }, [dispatch, id]);

  const handleCommentSubmit = async (rating: number, commentText: string) => {
    if (offerDetails) {
      await dispatch(
        sendComment({
          offerId: offerDetails.id,
          comment: commentText,
          rating,
        })
      ).unwrap();
    }
  };

  const handleFavoriteClick = async () => {
    if (authorizationStatus !== LoginStatus.Auth) {
      navigate(RoutePath.Login);
      return;
    }

    if (offerDetails) {
      const { isFavorite, id: offerId } = offerDetails;
      const newStatus = isFavorite ? FAVORITE_STATUS.REMOVE : FAVORITE_STATUS.ADD;

      const updatedOffer = await dispatch(
        changeFavoriteStatus({ offerId, status: newStatus })
      ).unwrap();

      dispatch(updateFavoriteInOffersList(updatedOffer));
      dispatch(updateFavoriteInFavorites(updatedOffer));
      dispatch(updateFavoriteInDetails(updatedOffer));
    }
  };

  if (isLoading || !offerDetails) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  const {
    title,
    description,
    isPremium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    images,
    isFavorite,
  } = offerDetails;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <FavoriteButton
                  isFavorite={isFavorite ?? false}
                  onFavoriteButtonClick={handleFavoriteClick}
                  environment={FavoritesEnvironment.Details}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(rating) * RATING_MULTIPLIER}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating.toFixed(1)}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? ROOM_TEXT.SINGLE : ROOM_TEXT.PLURAL}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? ADULT_TEXT.SINGLE : ADULT_TEXT.PLURAL}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={`${host.name} avatar`} />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{comments.length}</span>
                </h2>
                <CommentList comments={comments} />
                {authorizationStatus === LoginStatus.Auth && (
                  <CommentForm onSubmit={handleCommentSubmit} />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              points={mapPoints}
              selectedPoint={selectedPoint}
              height="579px"
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList className="near-places__list" offers={nearbyOffers.slice(0, 3)} />
          </section>
        </div>
      </main>
    </div>
  );
}
