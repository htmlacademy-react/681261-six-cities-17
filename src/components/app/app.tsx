import MainPage from '../../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../constant.ts';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/404/404.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function App(): JSX.Element {
  const authStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={<MainPage/>} />
        <Route path={RoutePath.Login} element={<LoginPage />} />
        <Route path={RoutePath.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route
          path={RoutePath.Favorites}
          element={
            <PrivateRoute authStatus={authStatus}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
