import React, { useState, useEffect, useCallback } from 'react';
import { getorder, cancelorder } from '../../../../Api/order';
import { SetUserGoogle } from '../../../../hooks/useAccount';
import CheckOrderScreenApp from '../../screens/checkorder';
import Swal from 'sweetalert2';
import NavProfile from '../../../../Layouts/app/component/nav-profile';
const CheckOrderComponents = () => {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState(0);
    const [callback, setCallback] = useState(false)

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

    useCallback(async () => {
        if(callback == true){
            if (SetUserGoogle.getUserGoogle()) {
                const data = {
                    google_id: SetUserGoogle.getUserGoogle().google_id,
                    id: SetUserGoogle.getUserGoogle().id,
                    status: status
                }
                const respons = await getorder(data);
                setOrders(respons.data)
            }
        }
    }, [status]);

    const onHandleCancel = async (id) => {
        try {
            Swal.fire({
                title: "Bạn có muốn thêm hủy đơn đặt hàng này không??",
                showCancelButton: true,
                confirmButtonText: "Xac nhan!!",
            }).then((result) => {
                if (result.isConfirmed) {
                    const item = {
                        id: id,
                        google_id: SetUserGoogle.getUserGoogle().google_id,
                        user_id: SetUserGoogle.getUserGoogle().id,
                        status: 5,
                    };
                    cancelorder(item).then(response => {
                        if (!response.data.status) {
                            Swal.fire(response.data.message, '', 'error')
                        }
                        if (response.data.status) {
                            setCallback(true)
                            Swal.fire('Thành công!', '', 'success')
                        }
                    })
                }
            });
        } catch (error) {
            Swal.fire('Không thể gửi request', '', 'error')
        }
    };

    return (
        <>
            {SetUserGoogle.getUserGoogle() ?
                <div className="row">
                    <NavProfile />
                    <div className="col-10">
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
                                <CheckOrderScreenApp orders={orders} onCancel={onHandleCancel} />
                            </tbody>
                        </table>
                    </div>
                </div>
                : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p>}
        </>
    )
}

export default CheckOrderComponents
