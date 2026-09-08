import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const rootDOM = document.getElementById('root');
if (!rootDOM) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootDOM);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);