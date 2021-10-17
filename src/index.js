import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import RouteMain from './Router/main';
import 'bootstrap/dist/css/bootstrap.min.css';
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
