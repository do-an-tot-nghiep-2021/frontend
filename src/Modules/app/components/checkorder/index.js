import React, { useState, useEffect, useCallback } from 'react';
import { getorder, cancelorder } from '../../../../Api/order';
import { SetUserGoogle } from '../../../../hooks/useAccount';
import CheckOrderScreenApp from '../../screens/checkorder';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NavProfile from '../../../../Layouts/app/component/nav-profile';
import ReactPaginate from 'react-paginate';
import BeatLoader from "react-spinners/BeatLoader";

const CheckOrderComponents = () => {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        if (SetUserGoogle.getUserGoogle()) {
            const newData = {
                google_id: SetUserGoogle.getUserGoogle().google_id,
                id: SetUserGoogle.getUserGoogle().id,
                status: status
            }
            const { data } = await getorder(newData);
            setLoading(false)
            setPages(Math.ceil(data.length / perPage))
            const items = data.slice(page * perPage, (page + 1) * perPage);
            setOrders(items)

        }
    }, [status, page]);

    const handlePageClick = (event) => {
        let page = event.selected;
        setPage(page)
    }

    const refresh = useCallback(() => {
        const getOrders = async () => {
            try {
                const newData = {
                    google_id: SetUserGoogle.getUserGoogle().google_id,
                    id: SetUserGoogle.getUserGoogle().id,
                    status: status
                }
                const { data } = await getorder(newData);
                setPages(Math.ceil(data.length / perPage))
                const items = data.slice(page * perPage, (page + 1) * perPage);
                setOrders(items)

            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    }, [status, page])

    const renderPreview = () => {
        if (loading) {
            return (
                <div style={{ "position": "relative", "left": "350px", "top": "20px" }}>
                    <BeatLoader color="#f4516c" size={12} />
                </div>
            );
        }
    };

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
                            Swal.fire('Thành công!', '', 'success')
                            refresh()
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
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><a>Tài khoản</a></li>
                            <li className="active"><a >Đơn mua</a></li>
                        </ul>
                        <label className="now">ĐƠN MUA</label>
                    </div>
                </div>
            </section>
            {SetUserGoogle.getUserGoogle() ?
                <section class="default-section shop-checkout bg-grey">
                    <div class="container">
                        <div className="row">
                            <NavProfile />
                            <div class="col-md-9 col-sm-9 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                                <div class="shop-checkout-right">
                                    <div className="checkout-wrap checkout-wrap-more wow fadeInDown">
                                        <ul className="checkout-bar">
                                            <li className={status == 0 ? "active" : ""} onClick={() => setStatus(0)}>
                                                Tất cả
                                            </li>
                                            <li className={status == 1 ? "active" : ""} onClick={() => setStatus(1)}>
                                                Chờ xử lí
                                            </li>
                                            <li className={status == 2 ? "active" : ""} onClick={() => setStatus(2)}>
                                                Chờ giao hàng
                                            </li>
                                            <li className={status == 3 ? "active" : ""} onClick={() => setStatus(3)}>
                                                Đang vận chuyển
                                            </li>
                                            <li className={status == 4 ? "active" : ""} onClick={() => setStatus(4)}>
                                                Thành công
                                            </li>
                                            <li className={status == 5 ? "active" : ""} onClick={() => setStatus(5)}>
                                                Đã hủy
                                            </li>
                                        </ul>
                                    </div>
                                    {orders.length > 0 ?
                                        <>
                                            <table className="table" style={{ fontSize: "12px", fontWeight: 600, fontFamily: "Quicksand" }}>
                                                <thead >
                                                    <tr>
                                                        <th scope="col">Mã đơn hàng</th>
                                                        <th scope="col">Địa chỉ</th>
                                                        <th scope="col" className="text-center">Thông tin đơn hàng</th>
                                                        <th scope="col">Tổng tiền</th>
                                                        <th scope="col" className='text-center' width="170" >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderPreview()}
                                                    {!loading ?
                                                        <CheckOrderScreenApp orders={orders} onCancel={onHandleCancel} />
                                                        : ""}
                                                </tbody>
                                            </table>
                                            <div className="gallery-pagination text-left">
                                                <ReactPaginate
                                                    previousLabel={'PREV'}
                                                    nextLabel={'NEXT'}
                                                    pageCount={pages}
                                                    onPageChange={handlePageClick}
                                                    containerClassName={'gallery-pagination-inner'}
                                                    pageClassName={'page-item-layout'}
                                                    previousClassName={'pagination-prev'}
                                                    nextClassName={'pagination-next'}
                                                    pageLinkClassName={''}
                                                    activeClassName={'active'}
                                                />
                                            </div>
                                        </>
                                        : <div className='text-center'><img src='https://shop4bd.com/assets/images/no-product.png' width="200" height={115} /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                : <section className="default-section shop-cart bg-grey">
                    <div className="container">
                        <div className="order-complete-box wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                            <img src="https://cdn.tecotecshop.com/assets/img/no-cart.png" style={{ width: "400px", height: "300px" }} alt="" />
                            <p>Bạn chưa đăng nhập! <br /> Bây giờ, hãy đăng nhập tài khoản google của bạn để mua đồ uống tại BeeCoffee nhé.</p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CheckOrderComponents
