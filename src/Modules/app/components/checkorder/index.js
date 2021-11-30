import React, { useState, useEffect } from 'react';
import { getorder } from '../../../../Api/order';
import { SetUserGoogle } from '../../../../hooks/useAccount';
import CheckOrderScreenApp from '../../screens/checkorder';
const CheckOrderComponents = () => {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState(0);

    useEffect(async () => {
        if (SetUserGoogle.getUserGoogle()) {
            const data = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id,
                status: status
            }
            const respons = await getorder(data);
            setOrders(respons.data)
        }
    }, [status]);

    return (
        <>
            {SetUserGoogle.getUserGoogle() ?
                <div className="container-fluid">
                    <div className="row text-center bg-primary text-light pt-2 pb-2" style={{ fontSize: "12px", fontWeight: 600 }}>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(0)}>Tất cả</span>
                        </div>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(1)}>Đang chờ xử lý</span>
                        </div>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(2)}>Đang chờ nhân viên giao hàng</span>
                        </div>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(3)}>Đang vận chuyển</span>
                        </div>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(4)}>Thành công</span>
                        </div>
                        <div className="col-2">
                            <span style={{ cursor: 'pointer' }} onClick={() => setStatus(5)}>Đã hủy</span>
                        </div>
                    </div>
                    <table className="table" style={{ fontSize: "12px", fontWeight: 600, fontFamily: "Quicksand" }}>
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
                            <CheckOrderScreenApp orders={orders} />
                        </tbody>
                    </table>
                </div>
                : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p>}
        </>
    )
}

export default CheckOrderComponents
