import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import RouteMain from './Router/main';
import CartContextProvider from './Contexts/cartContext';


ReactDOM.render(
  <HelmetProvider>
      <CartContextProvider>
          <RouteMain/>
      </CartContextProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
