import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../../Helpers/utils';
import CartProducts from './cartProduct';
import { useCart } from '../../.././../hooks/useCart';
import { showvoucher } from '../../../../Api/voucher';
import { SetPriceVoucher, SetUserGoogle } from '../../../../hooks/useAccount';

const Cart = () => {
    const [valueVoucher, setValueVoucher] = useState(0);
    const { total, cartItems, checkout } = useCart();
    const onHandleSelect = async (id) => {
        const { data } = await showvoucher(id)
        setValueVoucher(data.value)
        const price = (total / 100) * data.value
        SetPriceVoucher.saveRefreshPriceVoucher(price)
        SetPriceVoucher.saveRefreshVoucher(data)
    }

    return (
        <>
        
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active"><a>Giỏ hàng</a></li>
                        </ul>
                        <label className="now">Giỏ hàng</label>
                    </div>
                </div>
            </section>
                <div >
                    <section className="default-section shop-cart bg-grey">
                        <div className="container">
                            <div className="checkout-wrap wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <ul className="checkout-bar">
                                    <li className={checkout ? "active done-proceed" : "active"}>Giỏ hàng</li>
                                    <li className={checkout ? "active done-proceed" : ""}>Check out</li>
                                    <li className={checkout ? "active done-proceed" : ""}>Thành công</li>
                                </ul>
                            </div>
                            {
                                cartItems.length > 0 ?
                                    <CartProducts onSelect={onHandleSelect} /> :
                                    <div className="p-3 text-center text-muted">
                                        Your cart is empty
                                    </div>
                            }
                            {checkout &&
                                <div className="order-complete-box wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                    <img src="https://mucindatamax.com/templates/images/payment-successful.png" alt="" />
                                    <p>Cảm ơn bạn đã đặt hàng tại cà phê của chúng tôi. Bạn sẽ sớm nhận được một email xác nhận. <br /> Bây giờ, hãy kiểm tra tiến trình của Trình theo dõi thực phẩm với đơn đặt hàng của bạn.</p>
                                    <Link to="/account/checkorder" className="btn-medium btn-skin btn-large">Kiểm tra đơn đặt hàng</Link>
                                </div>
                            }
                            {
                                cartItems.length > 0 &&
                                <>
                                    <div className="cart-total wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                                        <div className="cart-total-title">
                                            <h5>TỔNG GIỎ HÀNG</h5>
                                        </div>
                                        <div className="product-cart-total">
                                            <small>Tổng sản phẩm</small>
                                            <span>{cartItems.length}</span>
                                        </div>
                                        <div className="product-cart-total">
                                            <small>Giảm giá</small>
                                            <span>{valueVoucher ? valueVoucher : 0}%</span>
                                        </div>
                                        <div className="grand-total">
                                            <h5>Tổng tiền <span>{formatNumber(total)}</span></h5>
                                        </div>
                                        <div className="proceed-check">
                                            <Link to="/checkout" className="btn-primary-gold btn-medium">Đặt hàng</Link>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </section>
                </div>
            
        </>
    );
}

export default Cart;