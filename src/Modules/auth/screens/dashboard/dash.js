import { SetUser, TokenAccount } from "../../../../hooks/useAccount"
import { getorderdate } from "../../../../Api/order";
import { useEffect, useState } from "react";
const DashboardScreen = () => {

    const [date, setDate] = useState(1);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const newData = {
            token : TokenAccount.getToken(),
            user : SetUser.getUser(),
            date : date
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
    
    console.log(order.length)

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
                                                    <h3 className="m-portlet__head-text">
                                                        Best Sellers
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="m-portlet__head-tools">
                                                <ul className="nav nav-pills nav-pills--brand m-nav-pills--align-right m-nav-pills--btn-pill m-nav-pills--btn-sm" role="tablist">
                                                    <li className="nav-item m-tabs__item">
                                                        <a className="nav-link m-tabs__link active" data-toggle="tab" href="#m_widget5_tab1_content" role="tab" onClick={() => setDate(1)} >
                                                            Hôm Nay
                                                        </a>
                                                    </li>
                                                    <li className="nav-item m-tabs__item">
                                                        <a className="nav-link m-tabs__link" data-toggle="tab" href="#m_widget5_tab2_content" role="tab" onClick={() => setDate(7)}>
                                                            7 Ngày Qua
                                                        </a>
                                                    </li>
                                                    <li className="nav-item m-tabs__item">
                                                        <a className="nav-link m-tabs__link" data-toggle="tab" href="#m_widget5_tab3_content" role="tab" onClick={() => setDate(30)}>
                                                            30 Ngày qua
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="m-portlet__body">
                                            {/*begin::Content*/}
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="m_widget5_tab1_content" aria-expanded="true">
                                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Stats2-1 */}
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Member Profit</h3>
                                                                            <span className="m-widget1__desc">Awerage Weekly Profit</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-brand">+$17,800</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Orders</h3>
                                                                            <span className="m-widget1__desc">Weekly Customer Orders</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-danger">+{order.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Issue Reports</h3>
                                                                            <span className="m-widget1__desc">System bugs and issues</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-success">-27,49%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Stats2-1 */}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Daily Sales*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header m--margin-bottom-30">
                                                                    <h3 className="m-widget14__title">
                                                                        Daily Sales
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Check out each collumn for more details
                                                                    </span>
                                                                </div>
                                                                <div className="m-widget14__chart" style={{ height: '120px' }}>
                                                                    <canvas id="m_chart_daily_sales" />
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Daily Sales*/}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Profit Share*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header">
                                                                    <h3 className="m-widget14__title">
                                                                        Profit Share
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Profit Share between customers
                                                                    </span>
                                                                </div>
                                                                <div className="row  align-items-center">
                                                                    <div className="col">
                                                                        <div id="m_chart_profit_share" className="m-widget14__chart" style={{ height: '160px' }}>
                                                                            <div className="m-widget14__stat">45</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="m-widget14__legends">
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-accent" />
                                                                                <span className="m-widget14__legend-text">37% Sport Tickets</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-warning" />
                                                                                <span className="m-widget14__legend-text">47% Business Events</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-brand" />
                                                                                <span className="m-widget14__legend-text">19% Others</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Profit Share*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="m_widget5_tab2_content" aria-expanded="false">
                                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Stats2-1 */}
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Member Profit</h3>
                                                                            <span className="m-widget1__desc">Awerage Weekly Profit</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-brand">+$17,800</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Orders</h3>
                                                                            <span className="m-widget1__desc">Weekly Customer Orders</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-danger">+{order.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Issue Reports</h3>
                                                                            <span className="m-widget1__desc">System bugs and issues</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-success">-27,49%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Stats2-1 */}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Daily Sales*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header m--margin-bottom-30">
                                                                    <h3 className="m-widget14__title">
                                                                        Daily Sales
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Check out each collumn for more details
                                                                    </span>
                                                                </div>
                                                                <div className="m-widget14__chart" style={{ height: '120px' }}>
                                                                    <canvas id="m_chart_daily_sales" />
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Daily Sales*/}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Profit Share*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header">
                                                                    <h3 className="m-widget14__title">
                                                                        Profit Share
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Profit Share between customers
                                                                    </span>
                                                                </div>
                                                                <div className="row  align-items-center">
                                                                    <div className="col">
                                                                        <div id="m_chart_profit_share" className="m-widget14__chart" style={{ height: '160px' }}>
                                                                            <div className="m-widget14__stat">45</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="m-widget14__legends">
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-accent" />
                                                                                <span className="m-widget14__legend-text">37% Sport Tickets</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-warning" />
                                                                                <span className="m-widget14__legend-text">47% Business Events</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-brand" />
                                                                                <span className="m-widget14__legend-text">19% Others</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Profit Share*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="m_widget5_tab3_content" aria-expanded="false">
                                                    <div className="row m-row--no-padding m-row--col-separator-xl">
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Stats2-1 */}
                                                            <div className="m-widget1">
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Member Profit</h3>
                                                                            <span className="m-widget1__desc">Awerage Weekly Profit</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-brand">+$17,800</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Orders</h3>
                                                                            <span className="m-widget1__desc">Weekly Customer Orders</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-danger">+{order.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="m-widget1__item">
                                                                    <div className="row m-row--no-padding align-items-center">
                                                                        <div className="col">
                                                                            <h3 className="m-widget1__title">Issue Reports</h3>
                                                                            <span className="m-widget1__desc">System bugs and issues</span>
                                                                        </div>
                                                                        <div className="col m--align-right">
                                                                            <span className="m-widget1__number m--font-success">-27,49%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Stats2-1 */}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Daily Sales*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header m--margin-bottom-30">
                                                                    <h3 className="m-widget14__title">
                                                                        Daily Sales
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Check out each collumn for more details
                                                                    </span>
                                                                </div>
                                                                <div className="m-widget14__chart" style={{ height: '120px' }}>
                                                                    <canvas id="m_chart_daily_sales" />
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Daily Sales*/}
                                                        </div>
                                                        <div className="col-xl-4">
                                                            {/*begin:: Widgets/Profit Share*/}
                                                            <div className="m-widget14">
                                                                <div className="m-widget14__header">
                                                                    <h3 className="m-widget14__title">
                                                                        Profit Share
                                                                    </h3>
                                                                    <span className="m-widget14__desc">
                                                                        Profit Share between customers
                                                                    </span>
                                                                </div>
                                                                <div className="row  align-items-center">
                                                                    <div className="col">
                                                                        <div id="m_chart_profit_share" className="m-widget14__chart" style={{ height: '160px' }}>
                                                                            <div className="m-widget14__stat">45</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="m-widget14__legends">
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-accent" />
                                                                                <span className="m-widget14__legend-text">37% Sport Tickets</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-warning" />
                                                                                <span className="m-widget14__legend-text">47% Business Events</span>
                                                                            </div>
                                                                            <div className="m-widget14__legend">
                                                                                <span className="m-widget14__legend-bullet m--bg-brand" />
                                                                                <span className="m-widget14__legend-text">19% Others</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/*end:: Widgets/Profit Share*/}
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

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default DashboardScreen
