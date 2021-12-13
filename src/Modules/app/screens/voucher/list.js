import NumberFormat from "react-number-format"
import { Link } from "react-router-dom"
const ListVoucherScreenApp = ({ data, onAdd, point }) => {
    return (
        <>
            <section class="default-section shop-checkout bg-grey">
                <div class="container">
                    <div className="shop-checkout-right">
                        <div className="row">
                            <h3 className="mb-5">Số điểm bạn đang có: <NumberFormat value={point} displayType={'text'} thousandSeparator={true} /> điểm</h3>
                            {data && data.map((item, index) => (
                                <div className="col-4 voucher" key={index}>
                                    <div className="row">
                                        <div className="col-5">
                                            <img src={item.image} />
                                        </div>
                                        <div className="col-7 pt-3">
                                            <div className="content-voucher">
                                                <h5>{item.name}</h5>
                                                <p className="point">
                                                    <span className="text-dark">Số điểm yêu cầu: </span> <br />
                                                    <NumberFormat value={item.point} displayType={'text'} thousandSeparator={true} /> điểm
                                                </p>
                                            </div>
                                            <button type="button" className="btn btn-success mt-3" onClick={() => onAdd(item.id)}><i class="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ListVoucherScreenApp
