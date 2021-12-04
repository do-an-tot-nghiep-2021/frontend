import { formatNumber } from "../../../../Helpers/utils"
import { Link } from "react-router-dom"
const CheckOrderScreenApp = ({ orders, onCancel }) => {
    return (
        <>
            {orders && orders.map((order, index) => (
                <tr key={index}>
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
                                {order.status == "Đơn hàng đã vận chuyển thành công" ?
                                    <td>
                                        <Link className="btn btn-primary" to={`/checkorder/comment/${product.product_id}`}>Commet</Link>
                                    </td> : ""}

                            </div>
                        ))}
                    </td>
                    <td>{formatNumber(order.price_total)}</td>
                    <td><span className="text-danger">{order.status}</span></td>
                    <td><span className="text-danger">{order.payment}</span></td>
                    {order.status == "Đơn hàng đang chờ xử lý" ?
                        <td>
                            <button className="btn btn-danger" onClick={() => onCancel(order.id)} >Hủy</button>
                        </td> : ""}

                </tr>
            ))}
        </>
    )
}

export default CheckOrderScreenApp
