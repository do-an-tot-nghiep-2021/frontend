import { formatNumber } from '../../../../Helpers/utils';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';
const CartItem = ({ product }) => {
    const { increase, decrease, removeProduct } = useCart();
    return (

        <tr key={product.id}>
            <th>PRODUCT</th>
            <td>
                <div className="product-cart">
                    <Link to={`/product/${product.id}`}>
                        <img src={product.image} style={{ width: "98px", height: "98px", borderRadius: '15px', objectFit: 'cover' }} alt="" />
                    </Link>
                </div>
                <div className="product-cart-title">
                    <span>{product.name}{product.type ? `(${product.type})` : ""}</span>
                    <p>
                        {
                            product.topping.length <= 1
                                ? product.topping
                                : product.topping.map((item, key) => (
                                    <span key={key}>
                                        {item},
                                    </span>
                                ))
                        }
                    </p>
                </div>
            </td>
            <th>PRICE</th>
            <td>
                <strong>{formatNumber(product.price)}</strong>
            </td>
            <th>QUANTITY</th>
            <td>
                <div className="price-textbox">
                    <span className="minus-text"><i className="fas fa-minus" onClick={() => product.quantity === 1 ? removeProduct(product) : decrease(product)} /></span>
                    <input name="txt" value={product.quantity} type="text" />
                    <span className="plus-text"><i className="fas fa-plus" onClick={() => increase(product)} /></span>
                </div>
            </td>
            <th>TOTAL</th>
            <td>
                {formatNumber(product.quantity * product.price)}
            </td>
            <td className="shop-cart-close"><i className="fa fa-times" aria-hidden="true" onClick={() => removeProduct(product)} /></td>
        </tr>
    );
}

export default CartItem;