import { allbuilding, getclassbuilding } from "../../../../Api/building"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { SetUserGoogle, SetPriceVoucher } from "../../../../hooks/useAccount";
import { useCart } from "../../../../hooks/useCart";
import { formatNumber } from "../../../../Helpers/utils";
import { sendorder } from "../../../../Api/order";
import ModalLogin from "../../../../hooks/ModalLogin";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddressUser = () => {
    const [buildings, setBuildings] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const { total, itemCount, handleCheckout, cartItems } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [noteText, setNoteText] = useState("")
    const history = useHistory();
    useEffect(() => {
        const getBuildings = async () => {
            try {
                const { data } = await allbuilding();
                setBuildings(data);

            } catch (error) {
                console.log(error);
            }
        }
        getBuildings();
    }, []);

    useEffect(() => {
        const getClassrooms = async () => {
            try {
                const { data } = await getclassbuilding(selectedItem);
                setClassroom(data);

            } catch (error) {
                console.log(error);
            }
        }
        getClassrooms();
    }, [selectedItem]);

    const handleSelect = (event) => {
        setSelectedItem(event.target.value)
    }

    const onSubmit = async (data) => {
        const checkoutData = {
            userId: SetUserGoogle.getUserGoogle().id,
            code_order : Math.floor((Math.random()*100000000)+1),
            phone: data.phone,
            building: data.building,
            classroom: data.classroom,
            cartItems: cartItems,
            itemCount: itemCount,
            total: total - SetPriceVoucher.getPriceVoucher(),
            payment: data.payment,
            voucher: (SetPriceVoucher.getVoucher() ? SetPriceVoucher.getVoucher().id : ""),
            note: (noteText ? noteText : "")
        }
        try {
            Swal.fire({
                title: 'Xác nhận đặt hàng',
                showCancelButton: true,
                confirmButtonText: 'Đặt hàng',
            }).then((result) => {
                if (result.isConfirmed) {
                    sendorder(checkoutData).then((response) => {
                        if (!response.data) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Đặt hàng thất bại',
                            })
                        } else {
                            handleCheckout()
                            SetPriceVoucher.removePriceVoucher()
                            SetPriceVoucher.removeVoucher()
                            Swal.fire({
                                icon: 'success',
                                title: 'Đặt hàng thành công',
                            })
                            history.push('/cart')
                        }
                    });
                }
            })
        } catch (error) {
            Swal.fire('Không thể gửi request')
        }
    }

    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/cart">Giỏ hàng</Link></li>
                            <li className="active"><Link to="/cart">Check out</Link></li>
                        </ul>
                        <label className="now">Checkout</label>
                    </div>
                </div>
            </section>
            {SetUserGoogle.getUserGoogle() ?
                <section className="default-section shop-checkout bg-grey">
                    <div className="container">
                        <div className="checkout-wrap wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                            <ul className="checkout-bar">
                                <li className="done-proceed active">Giỏ hàng</li>
                                <li className="active">Check out</li>
                                <li>Thành công</li>
                            </ul>

                        </div>
                        <form className="form-checkout" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-7 col-sm-7 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                    <div className="shop-checkout-left">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h5>Hóa đơn chi tiết</h5>
                                            </div>
                                            <input {...register("payment")} type="hidden" name="payment" value="1" />
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().name} {...register("name")} readOnly />
                                            </div>
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().phone} {...register("phone")} required placeholder="Số điện thoại" />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().email} {...register("email")} name="email" readOnly />
                                            </div>

                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <select
                                                    className="select-dropbox"
                                                    {...register("building")}
                                                    onChange={handleSelect}
                                                    required
                                                >
                                                    {buildings && buildings.map((item, index) => (
                                                        <option value={item.id} key={index} id={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}

                                                </select>
                                                {errors.building && (
                                                    <span className="d-block text-danger mt-3">
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>
                                            {classroom != '' ?
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <select
                                                        className="select-dropbox"
                                                        {...register("classroom")}
                                                    >
                                                        {classroom && classroom.map((item, index) => (
                                                            <option value={item.id} key={index} id={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.classroom && (
                                                        <span className="d-block text-danger mt-3">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </div>
                                                : ""}

                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <textarea name="note"
                                                    type="text"
                                                    placeholder="Ghi chú thêm cho đơn hàng"
                                                    className="df-control"
                                                    value={noteText}
                                                    onChange={e => setNoteText(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-5 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                    <div className="shop-checkout-right">
                                        <div className="shop-checkout-box">
                                            <h5>ĐƠN HÀNG CỦA BẠN</h5>
                                            <div className="shop-checkout-title">
                                                <h6>SẢN PHẨM <span>TOTAL</span></h6>
                                            </div>
                                            <div className="shop-checkout-row">
                                                {cartItems && cartItems.map((items, index) => (
                                                    <p key={index}>
                                                        <span>{items.name} {items.type ? `(${items.type})` : ""}
                                                        </span> x{items.quantity}
                                                        <small>{formatNumber(items.price * items.quantity)}</small>
                                                    </p>

                                                ))}
                                            </div>
                                            <div className="checkout-total">
                                                <h6>GIẢM GIÁ <small>{formatNumber(SetPriceVoucher.getPriceVoucher())}</small></h6>
                                            </div>

                                            <div className="checkout-total">
                                                <h6>PHUONG THỨC THANH TOÁN <small>Tiền mặt</small></h6>
                                            </div>
                                            <div className="checkout-total">
                                                <h6>TỔNG HÓA ĐƠN <small className="price-big">{formatNumber(total - SetPriceVoucher.getPriceVoucher())}</small></h6>
                                            </div>
                                        </div>
                                        <div className="shop-checkout-box">

                                            <div className="checkout-button">
                                                <button className="button-default btn-large btn-primary-gold">XÁC NHẬN THANH TOÁN</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                :
                <section className="default-section shop-cart bg-grey">
                    <div className="container">
                        <div className="order-complete-box wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                            <img src="https://cdn.tecotecshop.com/assets/img/no-cart.png" style={{ width: "400px", height: "300px" }} alt="" />
                            <p>Bạn chưa đăng nhập! <br /> Bây giờ, hãy đăng nhập tài khoản google của bạn để mua đồ uống tại BeeCoffee nhé.</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default AddressUser
