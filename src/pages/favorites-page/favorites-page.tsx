import Favorites from '../../components/favorites/favorites.tsx';
import Header from '../../components/header/header.tsx';
import FavoritesEmptyState from '../../components/favorites/components/empty-state/empty-state.tsx';

import { useSelector } from 'react-redux';
import { getFavorites } from '../../store/selectors/favorites.ts';

export default function FavoritesPage(): JSX.Element {
  const favorites = useSelector(getFavorites);

  if (favorites.length === 0) {
    return (
      <div className="page">
        <Header />
        <FavoritesEmptyState />
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <Favorites offers={favorites} />
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
