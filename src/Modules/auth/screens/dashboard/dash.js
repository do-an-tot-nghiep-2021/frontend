import { SetUser, TokenAccount } from "../../../../hooks/useAccount"
import { getorderdate, allorder } from "../../../../Api/order";
import { useEffect, useState } from "react";
import { exportexcel } from "../../../../Api/excel";
import { formatNumber } from "../../../../Helpers/utils";
import { alluser } from "../../../../Api/user"
import DashListSuccessData from "./dashListSuccess";
import DashListCancelData from "./dashListCancel";

const DashboardScreen = () => {

    const [date, setDate] = useState(1);
    const [order, setOrder] = useState([]);
    const [orders, setOrders] = useState([]);
    const [ordersW, setOrdersW] = useState([]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        const getOrders = async () => {
            const newData = {
                token: TokenAccount.getToken(),
                user: SetUser.getUser(),
                keyword: "",
                status: 4,
                date: date
            }
            try {
                const { data } = await allorder(newData)
                setOrders(data)

            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    }, [date]);

    useEffect(() => {
        const getOrdersWar = async () => {
            const newData = {
                token: TokenAccount.getToken(),
                user: SetUser.getUser(),
                keyword: "",
                status: 1,
                date: date
            }
            try {
                const { data } = await allorder(newData)
                setOrdersW(data)

            } catch (error) {
                console.log(error);
            }
        }
        getOrdersWar();
    }, [date]);

    useEffect(() => {
        const newData = {
            token: TokenAccount.getToken(),
            user: SetUser.getUser(),
            date: date
        }
        const getOrders = async () => {
            try {
                const { data } = await getorderdate(newData);
                setOrder(data);

            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    }, [date]);

    useEffect(() => {
        const getUsers = async () => {
            const newData = {
                token: TokenAccount.getToken(),
                user: SetUser.getUser(),
                role: 1
            }
            try {
                const { data } = await alluser(newData)
                setUsers(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, []);

    return (
        <>
            <div>
                <div className="m-subheader ">
                    <div className="d-flex align-items-center">
                        <div className="mr-auto">
                            <h3 className="m-subheader__title ">Dashboard</h3>
                        </div>
                    </div>
                </div>
                <div className="m-content">
                    <div className="m-portlet">
                        <div className="m-portlet__body  m-portlet__body--no-padding">
                            <div className="row">
                                <div className="col-xl-12">
                                    {/*begin:: Widgets/Best Sellers*/}
                                    <div className="m-portlet m-portlet--full-height ">
                                        <div className="m-portlet__head">
                                            <div className="m-portlet__head-caption">
                                                <div className="m-portlet__head-title">
                                                   
                                                </div>
                                            </div>
                                            <div className="m-portlet__head-tools">
                                                <ul className="nav nav-pills nav-pills--brand m-nav-pills--align-right m-nav-pills--btn-pill m-nav-pills--btn-sm" role="tablist">
                                                    <li className="nav-item m-tabs__item">
                                                        <a className={`nav-link m-tabs__link ${date == 1 ? "active" : ''}`} data-toggle="tab" onClick={() => setDate(1)} >
                                                            Hôm Nay
                                                        </a>
                                                    </li>
                                                    <li className="nav-item m-tabs__item">
                                                        <a className={`nav-link m-tabs__link ${date == 7 ? "active" : ''}`} onClick={() => setDate(7)}>
                                                            7 Ngày Qua
                                                        </a>
                                                    </li>
                                                    <li className="nav-item m-tabs__item">
                                                        <a className={`nav-link m-tabs__link ${date == 30 ? "active" : ''}`} data-toggle="tab" onClick={() => setDate(30)}>
                                                            30 Ngày qua
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="m-portlet__body">
                                            {/*begin::Content*/}
                                            <div className="tab-content">
                                                <div className="tab-pane active" >
                                                    <div className="row m-row--no-padding m-row--col-separator-xl">
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Stats2-1 */}
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Doanh thu</h3>
                                                                            <span className="m-widget1__desc">Từ các đơn đặt hàng</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-brand">{orders.length > 0 ? formatNumber(orders.reduce((n, { price_total }) => n + price_total, 0)) : "0"}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            {/*end:: Widgets/Stats2-1 */}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Đơn đặt hàng</h3>
                                                                            <span className="m-widget1__desc">Tổng số đơn đặt hàng</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-danger">+{order.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4">
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Tài khoản mới</h3>
                                                                            <span className="m-widget1__desc">số người đăng ký mới</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-success">{users.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/*end::Content*/}
                                        </div>
                                    </div>
                                    {/*end:: Widgets/Best Sellers*/}
                                </div>
                            </div>
                            <div className="m-portlet m-portlet--full-height ">
                                <DashListSuccessData data={orders} />
                                <DashListCancelData data={ordersW} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashboardScreen
