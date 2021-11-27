import { formatNumber } from "../../../../Helpers/utils"
const CheckOrderScreenApp = ({ orders, onStatus, onStatusAll }) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center bg-primary text-light pt-2 pb-2" style={{fontSize : "12px", fontWeight : 600}}>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatusAll()}>Tất cả</span>
                    </div>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatus(1)}>Đang chờ xử lý</span>
                    </div>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatus(2)}>Đang chờ nhân viên giao hàng</span>
                    </div>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatus(3)}>Đang vận chuyển</span>
                    </div>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatus(4)}>Thành công</span>
                    </div>
                    <div className="col-2">
                        <span style={{ cursor: 'pointer' }} onClick={() => onStatus(5)}>Đã hủy</span>
                    </div>
                </div>
                <table className="table" style={{fontSize : "12px", fontWeight : 600, fontFamily : "Quicksand" }}>
                    <thead >
                        <tr>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col" className="text-center">Thông tin đơn hàng</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col" >Trạng thái</th>
                            <th scope="col" >Phương thức thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                            
                                        </div>
                                    ))}
                                </td>
                                <td>{formatNumber(order.price_total)}</td>
                                <td><span className="text-danger">{order.status}</span></td>
                                <td><span className="text-danger">{order.payment}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CheckOrderScreenApp
