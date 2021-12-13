import { formatNumber } from "../../../../Helpers/utils"
import { Link } from "react-router-dom"
const CheckOrderScreenApp = ({ orders, onCancel }) => {
    return (
        <>
            {orders && orders.map((order, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        {order.building.map((buil) => (
                            <span key={buil.id}>{buil.name}, </span>
                        ))}
                        {order.classroom.map((classr) => (
                            <span key={classr.id}>{classr.name}</span>
                        ))}

                    </td>
                    <td>
                        {order.products && order.products.map((product, key) => (
                            <div className="row mb-2" key={key}>
                                <div className="col-2">
                                    <img src={product.image} width="55" className=" rounded" />
                                </div>
                                <div className="col-8">
                                    <span className="font-weight-bold">{product.name} {product.type ? `(${product.type})` : ""}</span><br />
                                    {product.topping && product.topping.map((value) => (
                                        <span key={value.id}> {value.name}, </span>
                                    ))}
                                </div>
                                <div className="col-2">
                                    x {product.quantity}
                                </div>

                            </div>
                        ))}
                    </td>
                    <td>{formatNumber(order.price_total)}</td>
                    <td className="text-center">
                        {order.status == "Đơn hàng đã vận chuyển thành công" ?
                            <Link className="btn-comment" to={`/checkorder/comment/`}>Đánh giá</Link>
                            : ""}
                        {order.status == "Đơn hàng đang chờ xử lý" ?
                            <button className="btn-cancel" onClick={() => onCancel(order.id)} >Hủy</button>
                            : ""}
                        <button type="button" className="btn-detail ml-2" data-toggle="modal" data-target={`#m_modal_ordercheck_${order.id}`}>Chi tiết</button>
                        <div className="modal fade text-left" id={`m_modal_ordercheck_${order.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Trạng Thái và Phương Thức Thanh Toán</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-2">
                                            <h6>Trạng Thái :</h6>
                                            <span class="m-badge m-badge--brand m-badge--wide m-badge--rounded m-1" >{order.status}</span>
                                        </div>
                                        <div>
                                            <h6>Phương Thức Thanh Toán :</h6>
                                            <span class="m-badge m-badge--danger m-badge--wide m-badge--rounded m-1">{order.payment}</span>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn-cancel" data-dismiss="modal">Đóng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>

                </tr>
            ))}
        </>
    )
}

export default CheckOrderScreenApp
