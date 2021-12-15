import { Link } from "react-router-dom";
import { formatNumber } from "../../../Helpers/utils";
import { useCart } from '../../../hooks/useCart';
import { SetUserGoogle } from "../../../hooks/useAccount";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { postdatagoogle } from "../../../Api/account";


const NavApp = ({ user }) => {
  const { itemCount, total } = useCart();
  const onLoginSuccess = async (res) => {
    await postdatagoogle(res.profileObj).then(response => {
      SetUserGoogle.saveUserGoogle(response.data)
      window.location.reload(false);
    })
  };
  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    console.clear();
    SetUserGoogle.removeUserGoogle()
    window.location.reload(false);
  };

  return (
    <>
      <header>
        <div className="header-part header-reduce sticky">
          <div className="header-nav">
            <div className="container">
              <div className="header-nav-inside">
                <div className="row">


                  <div className="col-12 col-md-6 col-sm-12 col-lg-7 col-xl-6">
                    <div className="logo">
                      <Link to="/">
                        <img src={process.env.PUBLIC_URL + '/logo-site.png'} style={{ width : "150px"}} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12 col-lg-5 col-xl-6">
                    <div className="menu-top-part" style={{float : "left"}}>
                      <div className="menu-nav-main1">
                        <ul>
                          <li className="has-child1">
                          <Link to="">{user ? user.name :
                              <GoogleLogin
                                clientId="753490656345-0j9c0r7sqr7bjk0ro3t31ub5n3i1bm3h.apps.googleusercontent.com"
                                buttonText="Đăng nhập"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                                className="button-google-account"
                              />}
                            </Link>

                            {user ?
                              <ul className="drop-nav1">
                                <li>
                                  <Link to="/account/profile">Cá nhân</Link>
                                </li>
                                <li>
                                  <Link to="/account/checkorder">Đơn đặt hàng</Link>
                                </li>
                                <li>
                                  <Link to="/account/voucher">Mã giảm giá</Link>
                                </li>
                                <li>
                                  <GoogleLogout
                                    clientId="753490656345-0j9c0r7sqr7bjk0ro3t31ub5n3i1bm3h.apps.googleusercontent.com"
                                    buttonText="Đăng xuất"
                                    onLogoutSuccess={onSignoutSuccess}
                                    className="button-google-account-logout"
                                  >
                                  </GoogleLogout>
                                </li>
                              </ul>
                              :
                              ""
                            }
                            
                          </li>
                        </ul>
                      </div>
                      <div className="cart animated">
                        <Link to="/cart" className="color-cart-item">
                          <span className="icon-basket fontello" />
                          <span>{itemCount} Sản phẩm - {formatNumber(total)}</span>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavApp;
