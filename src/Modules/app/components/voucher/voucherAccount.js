import { SetUserGoogle } from "../../../../hooks/useAccount"
import { getvoucherid } from "../../../../Api/voucher"
import { useEffect, useState } from "react";
import ListVoucherAccountScreenApp from "../../screens/voucher/listVoucherAccount";
import NavProfile from "../../../../Layouts/app/component/nav-profile";
import { Link } from "react-router-dom";
const VoucherAccountComponentApp = () => {
    const [Vouchers, setVouchers] = useState([]);
    const [status, setStatus] = useState(1);
    useEffect(() => {
        const getVoucher = async () => {
            if (SetUserGoogle.getUserGoogle()) {
                const newData = {
                    google_id: SetUserGoogle.getUserGoogle().google_id,
                    user_id: SetUserGoogle.getUserGoogle().id,
                    status: status
                }
                try {
                    const { data } = await getvoucherid(newData);
                    setVouchers(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getVoucher();
    }, [status]);
    return (
        <>
            <section className="breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-nav-inner">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><a>Tài khoản</a></li>
                            <li className="active"><a>Thẻ giảm giá</a></li>
                        </ul>
                        <label className="now">THẺ GIẢM GIÁ</label>
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
                                    <ul className="nav nav-pills bg-white nav-fill mt-3 font-weight-bold">
                                        <li className="nav-item">
                                            <a style={{ cursor: 'pointer' }} className={`nav-link ${status == 1 ? "active" : ""}`} onClick={() => setStatus(1)}>Voucher đang có</a>
                                        </li>
                                        <li className="nav-item">
                                            <a style={{ cursor: 'pointer' }} className={`nav-link ${status == 2 ? "active" : ""}`} onClick={() => setStatus(2)}>Voucher đã sử dụng</a>
                                        </li>

                                    </ul>
                                    {Vouchers.length > 0 ?
                                        <ListVoucherAccountScreenApp data={Vouchers} />
                                        :
                                        <div className="text-center mt-5">
                                            <i class="fas fa-tags text-danger" style={{ fontSize: '30px' }}></i>
                                            <p className="text-dark">Voucher đang trống, thêm nhiều voucher tại
                                                <Link to="/voucher" style={{ fontSize: '16px', textDecoration: 'none' }}><span className="text-danger"> đây!</span></Link>
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                : <p className="text-danger text-center">Bạn chưa đăng nhập hãy đăng nhập</p>}
        </>
    )
}

export default VoucherAccountComponentApp
