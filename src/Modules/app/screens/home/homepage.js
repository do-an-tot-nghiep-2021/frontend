import './home.css'
import NumberFormat from 'react-number-format';
import { useCart } from '../../../../hooks/useCart';

const HomeScreen = ({ product }) => {

    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    return (
                <div className="col-xl-3 col-sm-6" >
                    <div className="card" >
                        <img className="card-img-top" src={product.image} alt="Card image cap" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <span>{product.category.name}</span>
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <div className="d-flex justify-content-between">
                                {
                                    isInCart(product) &&
                                    <button
                                        onClick={() => increase(product)}
                                        className="btn btn-outline-primary btn-sm">Add more</button>
                                }

                                {
                                    !isInCart(product) &&
                                    <button
                                        onClick={() => addProduct(product)}
                                        className="btn btn-primary btn-sm">Add to cart</button>
                                }
                                <span className="pt-2 font-weight-bold"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                            </div>
                        </div>
                    </div>
                </div>

    )
}

export default HomeScreen
