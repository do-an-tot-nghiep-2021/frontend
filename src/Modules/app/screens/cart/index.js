import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../../Helpers/utils';
import CartProducts from './cartProduct';
import { useCart } from '../../.././../hooks/useCart';

const Cart = () => {

    const { total, cartItems, itemCount, clearCart } = useCart();

    return (
        <div  >
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <section className="cart-area">
                    <div className="container">
                        <div className="row">
                            {
                                cartItems.length > 0 ?
                                    <CartProducts /> :
                                    <div className="p-3 text-center text-muted">
                                        Your cart is empty
                                    </div>
                            }

                            {
                                cartItems.length > 0 &&
                                <div className="col-lg-4 col-md-12">
                                    <div className="cart-ct-box">
                                        <div className="ccbt">
                                            <table className="cart-total-table">
                                                <thead>
                                                    <tr>
                                                        <th>Cart Totals</th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p>Subtotal</p>
                                                        </td>
                                                        <td>
                                                            <p>{itemCount}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p>Total</p>
                                                        </td>
                                                        <td>
                                                            <p>{formatNumber(total)}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Link to="/checkout" className="btn-style-a">CHECKOUT</Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default Cart;