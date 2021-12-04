import CartItem from './cartItem';
import { useCart } from '../../../../hooks/useCart';
import { useEffect, useState } from 'react';
import {SetUserGoogle} from '../../../../hooks/useAccount'
import { getvoucherid } from '../../../../Api/voucher';


const CartProducts = ({onSelect}) => {

    const { cartItems, clearCart } = useCart();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const getvouchers = async () => {
            const newData ={
                google_id : SetUserGoogle.getUserGoogle().google_id,
                user_id : SetUserGoogle.getUserGoogle().id
            }
            try {
                const { data } = await getvoucherid(newData);
                setVouchers(data);

            } catch (error) {
                console.log(error);
            }
        }
        getvouchers();
    }, []);

    const handleSelect = (event) => {
        onSelect(event.target.value)
    }


    return (
        <div className="col-lg-8 col-md-12" >
            <div className="cart-c-box">

                <div className="ccbt">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th />
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems && cartItems.map(product => <CartItem product={product} />)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="cart-cuopon-box">
                    <div className="row">
                        <div className="col-6">
                            <select className="df-control rounded" onChange={handleSelect}
                             style={{color : '#282727', border : '1px solid #bbbbbb', fontWeight : '500', lineHeight : '22px', fontSize : '15px'}}
                             defaultValue={0}
                             >
                                <option value="0">Select Option</option>
                                {vouchers && vouchers.map((item, index) => (
                                    <option value={item.voucher.id} key={index}>{item.voucher.name}</option>
                                ))}
                                
                            </select>
                        </div>
                        <div className="col-3">
                            <button type="button" className="bfs-btn ml-2" onClick={clearCart}>Clear cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartProducts;