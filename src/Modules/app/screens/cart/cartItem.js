import React from 'react';
import { formatNumber } from '../../../../Helpers/utils';
import { useCart } from '../../../../hooks/useCart';
import { Link } from 'react-router-dom';
const CartItem = ({ product }) => {
    const { increase, decrease, removeProduct } = useCart();

    return (

        <tr>
            <td>
                <div className="c-product-thumb">
                    <img src={product.image} alt="" />
                </div>
            </td>
            <td>
                <p>{product.name}{product.type ? `(${product.type})` : ""}</p>
            </td>
            <td>
                <p>{formatNumber(product.price)}</p>
            </td>
            <td>
                <div className="cartinc-dec">
                    <input type="text" name="qty" maxLength={12} value={product.quantity} className="input-text qty" />
                    <div className="button-inc-dec">
                        <button className="cart-qty-plus" type="button" value="+" onClick={() => increase(product)}>
                            <i className="fa fa-angle-up" aria-hidden="true" />
                        </button>
                        <button className="cart-qty-minus" type="button" value="-" onClick={() => product.quantity === 1 ? removeProduct(product) : decrease(product)}>
                            <i className="fa fa-angle-down" aria-hidden="true" /
                            ></button>
                    </div>
                </div>
            </td>
            <td>
                <p>{formatNumber((product.price) * (product.quantity))}</p>
            </td>
            <td>
                <div className="c-remove">
                    <div className="cr-icon">
                        <a ><i className="fa fa-times" aria-hidden="true" onClick={() => removeProduct(product)} /></a>
                    </div>
                </div>
            </td>
        </tr>

    );
}

export default CartItem;