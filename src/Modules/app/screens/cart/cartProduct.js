import React from 'react';

import CartItem from './cartItem';
import { useCart } from '../../../../hooks/useCart';

const CartProducts = () => {

    const { cartItems } = useCart();

    return ( 
        <div >
            <div className="card card-body border-0">

                {
                    cartItems && cartItems.map(product =>  <CartItem key={product.id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;