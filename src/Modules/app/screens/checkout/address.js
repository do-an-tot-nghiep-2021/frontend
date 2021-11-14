import { allbuilding, getclassbuilding } from "../../../../Api/building"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { SetUser } from "../../../../hooks/useAccount";
import { useCart } from "../../../../hooks/useCart";
import { sendorder } from "../../../../Api/order";
import ModalLogin from "../../../../hooks/ModalLogin";

const AddressUser = () => {
    const [buildings, setBuildings] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const { total, itemCount, checkout, handleCheckout, cartItems } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            payment: data.payment
        }
        
        try {
            await sendorder(checkoutData).then((response) => {
                if (!response.data) {
                    console.log('fail')
                }else{
                    handleCheckout()
                    console.log('hihi')
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {SetUser.getUser() ?
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input className="form-control" defaultValue={SetUser.getUser().name} {...register("name")} />
                            {errors.name && (
                                <span className="d-block text-danger mt-3">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input className="form-control" defaultValue={SetUser.getUser().phone} {...register("phone")} />
                            {errors.name && (
                                <span className="d-block text-danger mt-3">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Building</label>
                    <select
                        className="form-control"
                        {...register("building")}
                        onChange={handleSelect}
                        defaultValue="0"
                    >
                        <option value="0">Empty</option>
                        {buildings && buildings.map((item, index) => (
                            <option value={item.id} key={index} id={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {classroom != '' ?
                    <div className="mb-3">
                        <label className="form-label">Classroom</label>
                        <select
                            className="form-control"
                            {...register("classroom")}
                        >
                            {classroom && classroom.map((item, index) => (
                                <option value={item.id} key={index} id={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    : ""}
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
                <button type="submit" className="btn btn-primary mt-5">
                    create
                </button>
            </form>
        </div>
        : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập tại <span style={{cursor: 'pointer'}} className="text-primary" onClick={() => {
            setModalOpen(true);
          }} >đây</span></p>}
           {modalOpen && <ModalLogin setOpenModal={setModalOpen} />}
        </>
    )
}

export default AddressUser
