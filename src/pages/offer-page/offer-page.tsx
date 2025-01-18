import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';

import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/useDispatch';

import Header from '../../components/header/header.tsx';
import LoadingSpinner from '../../components/spiner/spiner.tsx';
import CommentList from '../../components/comment/comment-list.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import Map from '../../components/map/map.tsx';
import OfferList from '../../components/offer/offer-list.tsx';

import { City, Offer, OfferDetails } from '../../types.ts';
import { LoginStatus, RoutePath } from '../../constant.ts';

import { fetchNearbyOffers, fetchOfferDetails } from '../../store/slices/details-slice.ts';
import { fetchOfferComments, sendComment } from '../../store/slices/comments-slice.ts';

export default function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedPoint, setSelectedPoint] = useState<City | undefined>(undefined);

  const isLoading = useSelector((state: RootState) => state.details.loading);
  const offerDetails: OfferDetails | null = useSelector((state: RootState) => state.details.offerDetails);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const nearbyOffers = useSelector((state: RootState) => state.details.nearbyOffers);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const getMapPoints = (): City[] => {
    const nearByPoints: City[] = nearbyOffers.slice(0 , 3).map((item) => ({
      id: item.id,
      name: item.title,
      location: item.location,
    }));

    if (offerDetails) {
      return [
        ...nearByPoints, {
          id: offerDetails.id,
          name: offerDetails?.city.name,
          location: offerDetails?.location,
        }
      ];
    }
    return nearByPoints;
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetails(id))
        .unwrap()
        .then(() => {
          dispatch(fetchNearbyOffers(id));
        })
        .then(() => {
          dispatch(fetchOfferComments(id));
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          if (axiosError.message === 'Offer not found') {
            navigate(RoutePath.NotFound);
          }
        });
    }
  }, [dispatch, id, navigate]);

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

  const onListItemHoverHandler = (offer: Offer | null): void => {
    if (offer) {
      const point: City = {
        id: offer.id,
        name: offer.title,
        location: offer.location
      };
      setSelectedPoint(point);
    } else {
      setSelectedPoint(undefined);
    }
  };

  const handleFavoriteClick = () => {
    if (authorizationStatus !== LoginStatus.Auth) {
      navigate('/login');
      return;
    }
    if (offerDetails) {
      // Dispatch действие для добавления/удаления из избранного
      // dispatch(setFavorites(offerDetails.id));
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

  const formattedRating = Math.round(rating * 20);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${formattedRating}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type.charAt(0).toUpperCase() + type.slice(1)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index} className="offer__inside-item">
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
                {
                  authorizationStatus === LoginStatus.Auth &&
                  <CommentForm
                    onSubmit={handleCommentSubmit}
                  />
                }
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              points={getMapPoints()}
              selectedPoint={selectedPoint}
              height="579px"
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              className="near-places__list"
              offers={offers.slice(0, 4)}
              onListItemHover={onListItemHoverHandler}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
