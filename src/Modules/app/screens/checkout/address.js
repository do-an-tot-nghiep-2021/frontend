import { allbuilding, getclassbuilding } from "../../../../Api/building"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { SetUser } from "../../../../hooks/useAccount";
import { useCart } from "../../../../hooks/useCart";
import { sendorder } from "../../../../Api/order";
import ModalLogin from "../../../../hooks/ModalLogin";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const AddressUser = () => {
    const [buildings, setBuildings] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const { total, itemCount, handleCheckout, cartItems } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [noteText,setNoteText] = useState("")
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
            userId: SetUser.getUser().id,
            building: data.building,
            classroom: data.classroom,
            cartItems: cartItems,
            itemCount: itemCount,
            total: total,
            payment: data.payment,
            note : (noteText ? noteText : "")
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
                            Swal.fire({
                                icon: 'success',
                                title: 'Đặt hàng thành công',
                                footer: '<a href="/checkorder">Xem đơn đặt hàng!</a>'
                                })
                            history.push('/cart')
                        }
                    });
                } 
              })
            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {SetUser.getUser() ?
                <section className="checkout-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="checkout-wrapper">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-6">
                                                <h3>Billing Details</h3>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label htmlFor="fname">Name<span>*</span></label>
                                                        <input type="text" className="df-control" defaultValue={SetUser.getUser().name} {...register("name")} />
                                                        {errors.name && (
                                                            <span className="d-block text-danger mt-3">
                                                                This field is required
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="phone">Number Phone<span>*</span></label>
                                                        <input type="text" className="df-control" defaultValue={SetUser.getUser().phone} {...register("phone")} />
                                                        {errors.phone && (
                                                            <span className="d-block text-danger mt-3">
                                                                This field is required
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="email">Email<span>*</span></label>
                                                        <input type="text" className="df-control" defaultValue={SetUser.getUser().email} {...register("email")} name="email" />
                                                        {errors.email && (
                                                            <span className="d-block text-danger mt-3">
                                                                This field is required
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="col-md-12">
                                                        <label htmlFor="building">Building<span>*</span></label>
                                                        <select
                                                            className="df-control"
                                                            {...register("building")}
                                                            onChange={handleSelect}
                                                            defaultValue="0"
                                                        >
                                                            <option value="0">Select an option</option>
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
                                                        <div className="col-md-12">
                                                            <label htmlFor="classroom">Classroom<span>*</span></label>
                                                            <select
                                                                className="df-control"
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
                                                <div className="col-md-12">
                                                    <label htmlFor="note">Note</label><br/>
                                                    <textarea 
                                                    name="note" 
                                                    type="text" 
                                                    placeholder="Ghi chú" 
                                                    className="df-control"
                                                    value = {noteText}
                                                    onChange={e => setNoteText(e.target.value)}
                                                    ></textarea>
                                                </div>


                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h3>Your Order</h3>
                                                <div className="checkout-payment-table-box">
                                                    <table className="checkout-table">
                                                        <tbody><tr>
                                                            <td>Product</td>
                                                            <td>Total</td>
                                                        </tr>
                                                            <tr>
                                                                <td>Chicken Fry</td>
                                                                <td>$20.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Subtotal</td>
                                                                <td>$20.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shipping</td>
                                                                <td>Free Shipping</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td>$20.00</td>
                                                            </tr>
                                                        </tbody></table>

                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="field-rain">
                                                        <input
                                                            {...register("payment")}
                                                            type="radio"
                                                            name="payment"
                                                            value="1"
                                                            id="field-rain"
                                                        />
                                                        online
                                                    </label>
                                                    <label htmlFor="field-wind">
                                                        <input
                                                            {...register("payment")}
                                                            type="radio"
                                                            name="payment"
                                                            value="2"
                                                            id="field-wind"
                                                        />
                                                        offline
                                                    </label>
                                                </div>

                                                <input type="submit" className="bfs-btn d-flex flex-row-reverse" defaultValue="BOOK A TABLE" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập tại <span style={{ cursor: 'pointer' }} className="text-primary" onClick={() => {
                    setModalOpen(true);
                }} >đây</span></p>}
            {modalOpen && <ModalLogin setOpenModal={setModalOpen} />}
        </>
    )
}

export default AddressUser
