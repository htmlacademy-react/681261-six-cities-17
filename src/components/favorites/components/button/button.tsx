import { FavoritesEnvironment } from '../../types.ts';

type ButtonProps = {
  isFavorite: boolean;
  onFavoriteButtonClick: () => Promise<void>;
  environment: FavoritesEnvironment;
};

export default function FavoriteButton({ isFavorite, onFavoriteButtonClick, environment }: ButtonProps): JSX.Element {
  const isCardEnvironment = environment === FavoritesEnvironment.Card;

  const handleButtonClick = () => {
    onFavoriteButtonClick();
  };

  return (
    <button
      className={`${isCardEnvironment ? 'place-card__bookmark-button' : 'offer__bookmark-button'} button ${
        isFavorite ? `${isCardEnvironment ? 'place-card__bookmark-button--active' : 'offer__bookmark-button--active'}` : ''
      }`}
      type="button"
      onClick={handleButtonClick}
    >
      <svg
        className={isCardEnvironment ? 'place-card__bookmark-icon' : 'offer__bookmark-icon'}
        width={isCardEnvironment ? '18' : '31'}
        height={isCardEnvironment ? '19' : '33'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
