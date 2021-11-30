import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ModalProduct from '../../components/home/modal';

const HomeScreen = ({ product }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="col-md-3">
            <div className="single-food-box">
                <div className="sfb-img">
                    <img className="rounded" src={product.image} alt="" />
                    <div className="sfbi-btn">
                        <a className="add-cart-btn" style={{cursor : 'pointer'}} data-toggle="modal" data-target="#m_modal_detail_product" onClick={() => {
                            setModalOpen(true);
                        }}>Add To Cart</a>
                    </div>
                </div>
                <div className="sbf-info">
                    <Link to={`/product/${product.id}`} className="text-dark">
                        <h4>{product.name}</h4>
                    </Link>

                    <ul className="sbfi-ratings">
                        <li><i className="fa fa-star" aria-hidden="true" /></li>
                        <li><i className="fa fa-star" aria-hidden="true" /></li>
                        <li><i className="fa fa-star" aria-hidden="true" /></li>
                        <li><i className="fa fa-star" aria-hidden="true" /></li>
                        <li><i className="fa fa-star" aria-hidden="true" /></li>
                    </ul>
                    <p className="price"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></p>
                </div>
            </div>
            {modalOpen && <ModalProduct setOpenModal={setModalOpen} idproduct={product.id} />}
        </div>

    )
}

export default HomeScreen
