import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App count={2}/>
  </React.StrictMode>
);
