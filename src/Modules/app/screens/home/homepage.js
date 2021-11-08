import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';
import { useState } from 'react';
import ModalProduct from '../../components/home/modal';

const HomeScreen = ({ product }) => {
    console.log(product)
    const [modalOpen, setModalOpen] = useState(false);
    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    function handleAddProduct(e) {
        e.preventDefault();
        const newProduct = {
            id: product.id,
            name : product.name,
            image : product.image,
            price : product.price,
            quantity : 1,
            topping : ['hello', 'halo']
        }
        addProduct(newProduct)
        console.log('You clicked submit.');
      }

    return (
        <div className="col-12 col-sm-6 col-xl-4 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="300ms" style={{ visibility: 'visible', animationDuration: '1000ms', animationDelay: '300ms', animationName: 'fadeInDown' }}>
            <div className="shop-main-list">
                <div className="shop">
                    <img src={product.image} alt="" />
                    <div className="overlay" />
                    <div className="button">
                    <button
                        onClick={() => {
                            setModalOpen(true);
                          }}
                        className="btn btn-primary btn-sm">Add to cart</button>
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
            {modalOpen && <ModalProduct setOpenModal={setModalOpen} idproduct={product.id} />}
        </div>
        
    )
}

export default HomeScreen
