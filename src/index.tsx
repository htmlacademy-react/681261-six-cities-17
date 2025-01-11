import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import {loadOffers, login} from './store/async-actions.ts';
import { ToastContainer } from 'react-toastify';

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
