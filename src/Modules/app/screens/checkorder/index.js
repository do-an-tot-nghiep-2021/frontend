import { formatNumber } from "../../../../Helpers/utils"
const CheckOrderScreenApp = ({orders}) => {
    return (
        <>
            {orders && orders.map((order, index)=> (
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
                                            <div className="col-6">
                                                <span className="font-weight-bold">{product.name}</span><br/>
                                                {product.topping && product.topping.map((value)=> (
                                                    <span key={value.id}> {value.name}, </span>
                                                ))}
                                            </div>
                                            <div className="col-2">
                                                x {product.quantity}
                                            </div>
                                            <div className="col-2">
                                                {formatNumber((product.quantity)*(product.price))}
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td>{formatNumber(order.price_total)}</td>
                                <td><span className="text-danger">{order.status}</span></td>
                                <td><span className="text-danger">{order.payment}</span></td>
                            </tr>
                        ))}
        </>
    )
}

export default CheckOrderScreenApp