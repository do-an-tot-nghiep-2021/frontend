import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import RouteMain from './Router/main';
import ProductsContextProvider from './Contexts/product';
import CartContextProvider from './Contexts/cartContext';


ReactDOM.render(
  <HelmetProvider>
    <ProductsContextProvider>   
      <CartContextProvider>
          <RouteMain/>
      </CartContextProvider>
    </ProductsContextProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
