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
                                <p>{product.name}</p>
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
                                <p>{formatNumber((product.price)*(product.quantity))}</p>
                            </td>
                            <td>
                                <div className="c-remove">
                                    <div className="cr-icon">
                                        <a ><i className="fa fa-times" aria-hidden="true" onClick={() => removeProduct(product)} /></a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                   
        // <div className="row no-gutters py-2">
        //     <div className="col-sm-2 p-2">
        //         <img
        //             alt={product.name}
        //             style={{ margin: "0 auto", maxHeight: "50px" }}
        //             src={product.image} className="img-fluid d-block" />
        //     </div>
        //     <div className="col-sm-4 p-2">
        //         <Link to={`/product/${product.id}`}><h5 className="mb-1">{product.name}</h5></Link>
        //         <p className="mb-1">Price: {formatNumber(product.price)} </p>
        //     </div>
        //     <div className="col-sm-3 p-2 text-center ">
        //     {product.topping && product.topping.map((item, index) => (
        //             <span
        //                 style={{border: '1px solid gray',
        //                 fontSize: '13px',
        //                 backgroundColor: '#80808059', 
        //                 borderRadius: '5px', 
        //                 padding: '2px', 
        //                 marginRight: '3px'}} 
        //                 key={index}>{item}
        //             </span>
        //         ))}
        //     </div>
        //     <div className="col-sm-1 p-2 text-center ">
        //         <p className="mb-0">Qty: {product.quantity}</p>
        //     </div>
        //     <div className="col-sm-2 p-2 text-right">
        //         <button
        //             onClick={() => increase(product)}
        //             className="btn btn-primary btn-sm mr-2 mb-1">
        //             <i class="fas fa-plus"></i>
        //         </button>
        //         {
        //             product.quantity > 1 &&
        //             <button
        //                 onClick={() => decrease(product)}
        //                 className="btn btn-danger btn-sm mb-1">
        //                 <i class="far fa-window-minimize"></i>
        //             </button>
        //         }

        //         {
        //             product.quantity === 1 &&
        //             <button
        //                 onClick={() => removeProduct(product)}
        //                 className="btn btn-danger btn-sm mb-1">
        //                 <i class="fas fa-trash-alt"></i>
        //             </button>
        //         }

        //     </div>
        // </div>
    );
}

export default CartItem;