import React from 'react';
import CartItem from './cartItem';
import { useCart } from '../../../../hooks/useCart';

const CartProducts = () => {

    const { cartItems, clearCart } = useCart();

    return (
        <div className="col-lg-8 col-md-12" >
            <div className="cart-c-box">

                <div className="ccbt">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th />
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems && cartItems.map(product => <CartItem key={product.id} product={product} />)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="cart-cuopon-box">
                    <input type="text" id="coupon" name="coupon" placeholder="Coupon code" />
                    <input type="submit" className="bfs-btn" defaultValue="Apply Coupon" />
                    <button type="button" className="bfs-btn ml-2" onClick={clearCart}>Clear cart</button>
                </div>
            </div>
        </div>

    );
}

export default CartProducts;