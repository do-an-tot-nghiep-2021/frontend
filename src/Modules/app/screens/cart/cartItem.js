import React from 'react';
import { formatNumber } from '../../../../Helpers/utils';
import { useCart } from '../../../../hooks/useCart';
import { Link } from 'react-router-dom';
const CartItem = ({ product }) => {
    console.log(product)
    const topping = product.topping;
    const { increase, decrease, removeProduct } = useCart();

    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                    alt={product.name}
                    style={{ margin: "0 auto", maxHeight: "50px" }}
                    src={product.image} className="img-fluid d-block" />
            </div>
            <div className="col-sm-4 p-2">
                <Link to={`/product/${product.id}`}><h5 className="mb-1">{product.name}</h5></Link>
                <p className="mb-1">Price: {formatNumber(product.price)} </p>
            </div>
            <div className="col-sm-3 p-2 text-center ">
            {topping && topping.map((item, index) => (
                    <span
                    style={{border: '1px solid gray',
                    fontSize: '13px',
                    backgroundColor: '#80808059', 
                    borderRadius: '5px', 
                    padding: '2px', 
                    marginRight: '3px'}} 
                    key={index}>{item}
                    </span>
                ))}
            </div>
            <div className="col-sm-1 p-2 text-center ">
                <p className="mb-0">Qty: {product.quantity}</p>
            </div>
            <div className="col-sm-2 p-2 text-right">
                <button
                    onClick={() => increase(product)}
                    className="btn btn-primary btn-sm mr-2 mb-1">
                    <i class="fas fa-plus"></i>
                </button>
                {
                    product.quantity > 1 &&
                    <button
                        onClick={() => decrease(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <i class="far fa-window-minimize"></i>
                    </button>
                }

                {
                    product.quantity === 1 &&
                    <button
                        onClick={() => removeProduct(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                }

            </div>
        </div>
    );
}

export default CartItem;