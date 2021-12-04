import { Link } from "react-router-dom"
import { SetUserGoogle } from "../../../hooks/useAccount"
const NavProfile = () => {
    return (
        <div className="col-2">
            <div className="row pb-2" style={{ borderBottom: '1px solid #80808021' }}>
                <div className="col-4">
                    <img src={SetUserGoogle.getUserGoogle().image} style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                </div>
                <div className="col-8">
                    <span>{SetUserGoogle.getUserGoogle().name}</span><br />
                    <Link style={{ textDecoration: 'none' }} to="/account/profile"><i class="fas fa-user-edit"></i> Edit profile</Link>
                </div>
            </div>
            <div className="menu-profile mt-3">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li><Link to="/account/profile"><i class="fas fa-user"></i> Tài khoản</Link></li>
                    <li><Link to="/account/checkorder"><i class="fas fa-file-alt"></i> Đơn mua</Link></li>
                    <li><Link to="/account/voucher"><i class="fas fa-tags"></i> Voucher</Link></li>
                    <li><Link to="/account/point"><i class="fas fa-coins"></i> Bee Point</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavProfile
