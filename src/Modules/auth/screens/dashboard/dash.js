import { SetUser } from "../../../../hooks/useAccount"
const DashboardScreen = () => {
    const user = SetUser.getUser();
    return (
        <>
            <div>
                <div className="m-subheader ">
                    <div className="d-flex align-items-center">
                        <div className="mr-auto">
                            <h3 className="m-subheader__title ">Dashboard</h3>
                        </div>
                        <div>
                            <span className="m-subheader__daterange" id="m_dashboard_daterangepicker">
                                <span className="m-subheader__daterange-label">
                                    <span className="m-subheader__daterange-title" />
                                    <span className="m-subheader__daterange-date m--font-brand" />
                                </span>
                                <a href="#" className="btn btn-sm btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill">
                                    <i className="la la-angle-down" />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="m-content">
                    <div className="m-portlet">
                        <div className="m-portlet__body  m-portlet__body--no-padding">
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
                                                    <span className="m-widget1__number m--font-danger">+1,800</span>
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

                </div>
            </div>

        </>
    )
}

export default DashboardScreen
