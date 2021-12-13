import { NavLink } from "react-router-dom"
import { SetUserGoogle } from "../../../hooks/useAccount"
const NavProfile = () => {
    return (
        <div class="col-md-3 col-sm-3 col-xs-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <div class="shop-checkout-left">
                <div className="row pb-2" style={{ borderBottom: '1px solid #80808021', fontFamily : 'Quicksand' }}>
                    <div className="col-4">
                        <img src={SetUserGoogle.getUserGoogle().image} style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                    </div>
                    <div className="col-8">
                        <span style={{fontSize : '18px', fontWeight : 700}}>{SetUserGoogle.getUserGoogle().name}</span><br />
                        <NavLink style={{ textDecoration: 'none', fontWeight : 500 }} to="/account/profile"><i class="fas fa-user-edit"></i> Sửa tài khoản</NavLink>
                    </div>
                </div>
                <div className="menu-profile mt-3">
                    <div className="blog-left-categories nav-account" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <ul className="list">
                            <li>
                                <NavLink to="/account/profile" activeClassName="active">
                                    <i class="fas fa-user mr-2"></i> Tài khoản
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/account/checkorder" activeClassName="active">
                                    <i class="fas fa-file-alt mr-2"></i> Đơn mua
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/account/voucher" activeClassName="active">
                                    <i class="fas fa-tags mr-2"></i> Thẻ giảm giá
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default NavProfile
