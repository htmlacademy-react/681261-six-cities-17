import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loadOffers } from './store/slices/offer-slice.ts';
import { login } from './store/slices/user-slice.ts';

store.dispatch(loadOffers());
store.dispatch(login());

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
