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
import PulseLoader from "react-spinners/PulseLoader";


const AddressUser = () => {
    const [buildings, setBuildings] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const { total, itemCount, handleCheckout, cartItems } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [noteText, setNoteText] = useState("")
    const [loading, setLoading] = useState(false);
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

    const renderPreview = () => {
        if (loading) {
            return (
                <div style={{
                    "position": "relative",
                    "left": "500px",
                    "top": "280px",
                    "zIndex": "999",
                    "fontSize": "20px",
                    "fontWeight": "700"
                }}>
                    ??ang ?????t h??ng <PulseLoader color="#f4516c" size={12} />
                </div>
            );
        }
    };

    const onSubmit = async (data) => {

        const checkoutData = {
            userId: SetUserGoogle.getUserGoogle().id,
            code_order: Math.floor((Math.random() * 100000000) + 1),
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
                title: 'X??c nh???n ?????t h??ng',
                showCancelButton: true,
                confirmButtonText: '?????t h??ng',
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    sendorder(checkoutData).then((response) => {
                        setLoading(false)
                        if (!response.data) {
                            Swal.fire({
                                icon: 'error',
                                title: '?????t h??ng th???t b???i',
                            })
                        } else {
                            handleCheckout()
                            SetPriceVoucher.removePriceVoucher()
                            SetPriceVoucher.removeVoucher()
                            Swal.fire({
                                icon: 'success',
                                title: '?????t h??ng th??nh c??ng',
                            })
                            history.push('/cart')
                        }
                    });
                }
            })
        } catch (error) {
            Swal.fire('Kh??ng th??? g???i request')
        }
    }

    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang ch???</Link></li>
                            <li><Link to="/cart">Gi??? h??ng</Link></li>
                            <li className="active"><Link to="/cart">Thanh To??n</Link></li>
                        </ul>
                        <label className="now">Th??? T???c Thanh To??n</label>
                    </div>
                </div>
            </section>
            {SetUserGoogle.getUserGoogle() ?
                <section className="default-section shop-checkout bg-grey">
                    <div className="container">
                        {renderPreview()}
                        <div className="checkout-wrap wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                            <ul className="checkout-bar">
                                <li className="done-proceed active">Gi??? h??ng</li>
                                <li className="active">Thanh to??n</li>
                                <li>Th??nh c??ng</li>
                            </ul>

                        </div>
                        <form className="form-checkout" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-7 col-sm-7 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                    <div className="shop-checkout-left">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h5>H??A ????N CHI TI???T</h5>
                                            </div>
                                            <input {...register("payment")} type="hidden" name="payment" value="1" />
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().name} {...register("name")} readOnly />
                                            </div>
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().phone} {...register("phone", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} placeholder="S??? ??i???n tho???i" />
                                                {errors.phone?.type === "required" && (
                                                    <span className="d-block text-danger">
                                                        Kh??ng ???????c ????? tr???ng tr?????ng n??y!
                                                    </span>
                                                )}
                                                {errors.phone?.type === "pattern" &&
                                                    <span className=" text-danger m-form__help">
                                                        S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng.
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" defaultValue={SetUserGoogle.getUserGoogle().email} {...register("email")} name="email" readOnly />
                                            </div>

                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <select
                                                    className="select-dropbox"
                                                    {...register("building", { required: true })}
                                                    onChange={handleSelect}

                                                >
                                                    <option value="">Ch???n t??a nh??</option>
                                                    {buildings && buildings.map((item, index) => (
                                                        <option value={item.id} key={index} id={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}

                                                </select>
                                                {errors.building && (
                                                    <span className="d-block text-danger ">
                                                        Kh??ng ????? tr???ng tr?????ng n??y.
                                                    </span>
                                                )}
                                            </div>
                                            {classroom != '' ?
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <select
                                                        className="select-dropbox"
                                                        {...register("classroom",{required:true})}
                                                    >
                                                        <option value="">Ch???n ph??ng h???c</option>
                                                        {classroom && classroom.map((item, index) => (
                                                            <option value={item.id} key={index} id={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.classroom && (
                                                        <span className="d-block text-danger">
                                                            Kh??ng b??? tr???ng tr?????ng n??y!
                                                        </span>
                                                    )}
                                                </div>
                                                : ""}

                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <textarea name="note"
                                                    type="text"
                                                    placeholder="Ghi ch?? th??m cho ????n h??ng"
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
                                            <h5>????N H??NG C???A B???N</h5>
                                            <div className="shop-checkout-title">
                                                <h6>S???N PH???M <span>T???NG C???NG</span></h6>
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
                                                <h6>GI???M GI?? <small>{formatNumber(SetPriceVoucher.getPriceVoucher())}</small></h6>
                                            </div>

                                            <div className="checkout-total">
                                                <h6>PHUONG TH???C THANH TO??N <small>Ti???n m???t</small></h6>
                                            </div>
                                            <div className="checkout-total">
                                                <h6>T???NG H??A ????N <small className="price-big">{formatNumber(total - SetPriceVoucher.getPriceVoucher())}</small></h6>
                                            </div>
                                        </div>
                                        <div className="shop-checkout-box">

                                            <div className="checkout-button">
                                                <button className="button-default btn-large btn-primary-gold">X??C NH???N THANH TO??N</button>
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
                            <p>B???n ch??a ????ng nh???p! <br /> B??y gi???, h??y ????ng nh???p t??i kho???n google c???a b???n ????? mua ????? u???ng t???i BeeCoffee nh??.</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default AddressUser
