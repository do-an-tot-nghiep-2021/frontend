import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ModalProduct from '../../components/home/modal';

const HomeScreen = ({ product }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="col-6 col-md-6 col-sm-6 col-lg-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <div className="shop-main-list">
                <div className="shop-product">
                    <img src={product.image} alt="" />
                    <div className="cart-overlay-wrap">
                        <div className="cart-overlay">
                            <a  className="shop-cart-btn" data-toggle="modal" data-target="#m_modal_detail_product" onClick={() => {setModalOpen(true) }}>ADD TO CART</a>
                        </div>
                    </div>
                </div>
                <Link className='text-name' to={`/product/${product.id}`}><h5>{product.name}</h5></Link>
                <h5><strong><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></strong></h5>
            </div>
            {modalOpen && <ModalProduct setOpenModal={setModalOpen} idproduct={product.id} />}
        </div>
    )
}

export default HomeScreen
