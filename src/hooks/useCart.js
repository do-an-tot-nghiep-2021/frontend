
import React, { useContext } from 'react';
import { CartContext } from '../Contexts/cartContext';

export const useCart = () => {
   
    const ctx = useContext(CartContext)

    return {
        ...ctx
    }
}