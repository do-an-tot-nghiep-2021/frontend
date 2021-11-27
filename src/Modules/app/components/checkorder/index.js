import React, { useState, useEffect } from 'react';
import { getorder } from '../../../../Api/order';
import { SetUserGoogle } from '../../../../hooks/useAccount';
import CheckOrderScreenApp from '../../screens/checkorder';
const CheckOrderComponents = () => {
    const [orders, setOrders] = useState([])
    const [newData, setNewData] = useState({})


    useEffect(async () => {
        if (SetUserGoogle.getUserGoogle()) {
            const data = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id,
            }
            const respons = await getorder(data);
            setOrders(respons.data)
        }
    }, []);

    useEffect(async () => {
        const respons = await getorder(newData);
        setOrders(respons.data)
    }, [newData]);

    
    const onHandleStatus = async (status) => {
        if (SetUserGoogle.getUserGoogle()) {
            const data = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id,
                status: status
            }
            setNewData(data)
        }
    }

    const onHandleStatusAll = async () => {
        if (SetUserGoogle.getUserGoogle()) {
            const data = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id,
            }
            setNewData(data)
        }
    }


    return (
        <>
            {SetUserGoogle.getUserGoogle() ?
                <CheckOrderScreenApp orders={orders} onStatus={onHandleStatus} onStatusAll={onHandleStatusAll} />
            :   <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p>}
        </>
    )
}

export default CheckOrderComponents
