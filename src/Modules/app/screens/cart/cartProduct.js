import CartItem from './cartItem';
import { useCart } from '../../../../hooks/useCart';
import { useEffect, useState } from 'react';
import { SetUserGoogle } from '../../../../hooks/useAccount'
import { getvoucherid } from '../../../../Api/voucher';
import { Link } from 'react-router-dom';


const CartProducts = ({ onSelect }) => {

    const { cartItems, clearCart } = useCart();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const getvouchers = async () => {
            if(SetUserGoogle.getUserGoogle()){
                const newData = {
                    google_id: SetUserGoogle.getUserGoogle().google_id,
                    user_id: SetUserGoogle.getUserGoogle().id,
                    status : 1,
                }
                try {
                    const { data } = await getvoucherid(newData);
                    setVouchers(data);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        getvouchers();
    }, []);

    const handleSelect = (event) => {
        onSelect(event.target.value)
    }


    return (
        <div className="shop-cart-list wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
            <table className="shop-cart-table">
                <thead>
                    <tr>
                        <th>SẢN PHẨM</th>
                        <th>GIÁ</th>
                        <th>SỐ LƯỢNG</th>
                        <th>TỔNG TIỀN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems && cartItems.map(product => <CartItem product={product} />)
                    }

                </tbody>
            </table>
            <div className="product-cart-detail">
                <div className="cupon-part">
                    <select className="select-dropbox" onChange={handleSelect}
                        defaultValue={0}
                    >
                        <option value="0">Chọn mã giảm giá</option>
                        {vouchers && vouchers.map((item, index) => (
                            <option value={item.voucher.id} key={index}>{item.voucher.name}</option>
                        ))}
                    </select>

                </div>
                <button type='button' className="btn-medium btn-dark-coffee" onClick={clearCart}>Xóa hết</button>
                <Link to="/" className="btn-medium btn-skin pull-right"  style={{textDecoration : 'none'}}>Thêm sản phẩm</Link>
            </div>
        </div>
    );
}

export default CartProducts;