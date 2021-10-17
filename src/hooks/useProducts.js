
import React, { useContext } from 'react';
import { ProductsContext } from '../Contexts/product';

export const useProducts = () => {
   
    const ctx = useContext(ProductsContext)

    return {
        ...ctx
    }
}