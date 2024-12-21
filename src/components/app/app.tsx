import MainPage from '../../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginStatus, RoutePath } from '../../constant.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/404/404.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { Offer } from '../../mocks/offers.ts';

type AppProps = {
  offers: Offer[];
}

export default function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={<MainPage offers={offers} />} />
        <Route path={RoutePath.Login} element={<LoginPage />} />
        <Route path={RoutePath.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route
          path={RoutePath.Favorites}
          element={
            <PrivateRoute authStatus={LoginStatus.NotAuth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
