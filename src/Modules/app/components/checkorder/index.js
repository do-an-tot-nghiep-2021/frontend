import React, { useState, useEffect } from 'react';
import { getorder } from '../../../../Api/order';
import { formatNumber } from '../../../../Helpers/utils';
import { TokenAccount, SetUser } from '../../../../hooks/useAccount';
import ModalLogin from '../../../../hooks/ModalLogin';
import CheckOrderScreenApp from '../../screens/checkorder';
const CheckOrderComponents = () => {
    const [orders, setOrders] = useState([])
    const [newData, setNewData] = useState({})
    const [modalOpen, setModalOpen] = useState(false);

          
        useEffect(async () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                }
                const respons = await getorder(data);
                setOrders(respons.data)
            } 
        }, []);

        useEffect(async () => {
            const respons = await getorder(newData);
            setOrders(respons.data)
        }, [newData]);

        const status1 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                }
            setNewData(data)   
            }  
        }

        const status2 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                    status : 1
                }
            setNewData(data)   
            }  
        }

        const status3 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                    status : 2
                }
            setNewData(data)   
            }  
        }

        

        const status4 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                    status : 3
                }
            setNewData(data)   
            }  
        }

        const status5 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                    status : 4
                }
            setNewData(data)   
            }  
        }

        const status6 = () => {
            if (SetUser.getUser()) { 
                const data = {
                    token : TokenAccount.getToken(), 
                    id : SetUser.getUser().id,
                    status : 5
                }
            setNewData(data)   
            }  
        }
    
    
    return (
        <>
        {SetUser.getUser() ?
            <div className="container-fluid">
                <div className="row text-center bg-primary text-light pt-2 pb-2">
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status1}>Tất cả</span>
                    </div>
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status2}>Đang chờ xử lý</span>
                    </div>
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status3}>Đang chờ nhân viên giao hàng</span>
                    </div>
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status4}>Đang vận chuyển</span>
                    </div>
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status5}>Thành công</span>
                    </div>
                    <div className="col-2">
                        <span style={{cursor : 'pointer'}} onClick={status6}>Đã hủy</span>
                    </div>
                </div>
                <table className="table">
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
        :
            <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập tại <span style={{cursor: 'pointer'}} className="text-primary" onClick={() => {
                setModalOpen(true);
            }} >đây</span></p>}
            {modalOpen && <ModalLogin setOpenModal={setModalOpen} />} 

        </>
    )
}

export default CheckOrderComponents
