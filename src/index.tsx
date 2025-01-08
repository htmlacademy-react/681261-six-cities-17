import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { store } from './store';
import { Provider } from 'react-redux';
import { loadOffers } from './store/async-actions.ts';

store.dispatch(loadOffers());

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
