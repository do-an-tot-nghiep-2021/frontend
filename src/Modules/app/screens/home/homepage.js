import './home.css'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';

const HomeScreen = ({ product }) => {

    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    return (
        <div className="col-md-4 col-sm-4 col-xs-12 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="300ms" style={{ visibility: 'visible', animationDuration: '1000ms', animationDelay: '300ms', animationName: 'fadeInDown' }}>
            <div className="shop-main-list">
                <div className="shop">
                    <img src={product.image} alt="" />
                    <div className="overlay" />
                    <div className="button">
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
                    </div>
                </div>
            </div>
            <Link to={`/product/${product.id}`} className="text-dark">
                <h5>{product.name}</h5>
            </Link>
            <h5>
                <strong>
                    <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                </strong>
            </h5>
        </div>
    )
}

export default HomeScreen
