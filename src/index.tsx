import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loadOffers } from './store/slices/offer.ts';
import { login } from './store/slices/user.ts';
import { fetchFavorites } from './store/slices/favorites.ts';

store.dispatch(loadOffers());
store.dispatch(login());
store.dispatch(fetchFavorites());

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <ToastContainer/>
    </Provider>
  </React.StrictMode>
);
