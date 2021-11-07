import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { getorder } from '../../../../Api/order';
import { formatNumber } from '../../../../Helpers/utils'
const CheckOrderComponents = () => {
    const history = useHistory();
    let { id } = useParams();
    const [order, setOrder] = useState([])
    useEffect(async () => {
        const respons = await getorder(id);
        setOrder(respons.data)
        // console.log(respons.data)
        // const topping = respons.data;
        // reset(topping);
    }, [id]);
    console.log(order)
    return (
        <div className="container">
            <table className="table">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col" className="text-center">Thông tin đơn hàng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col" className="text-center">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>{order.building}, {order.classroom}</td>
                        <td>
                            {order.detail && order.detail.map((item) => (
                                <div className="row mb-2" key={item.id}>
                                    <div className="col-2">
                                        <img src={item.image} width="55" className=" rounded" />
                                    </div>
                                    <div className="col-6">
                                        <span>{item.name}</span><br/>
                                        {item.topping && item.topping.map((key)=> (
                                            <span key={key.id}>{key.name}, </span>
                                        ))}
                                    </div>
                                    <div className="col-2">
                                        x {item.quantity}
                                    </div>
                                    <div className="col-2">
                                        {formatNumber((item.quantity)*(item.price))}
                                    </div>
                                </div>
                            ))}
                        </td>
                        <td>{formatNumber(order.price_total)}</td>
                        <td><span className="text-danger">{(order.status != 1) ? 'NAV' : "Đơn hàng chưa được xác nhận"}</span></td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default CheckOrderComponents
