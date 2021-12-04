import { Link } from "react-router-dom";
import { formatNumber } from "../../../Helpers/utils";
import { useCart } from '../../../hooks/useCart';
import { SetUserGoogle } from "../../../hooks/useAccount";
import { allcategory } from "../../../Api/category";
import { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { postdatagoogle } from "../../../Api/account";


const NavApp = ({ user }) => {
  const [category, setSetCategory] = useState([]);
  const { itemCount, total } = useCart();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await allcategory();
        setSetCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

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
      <header className="header-area dfoody-header dfdV2">
        <div className="dfoody-header-box">
          <div className="container">
            <div className="row">
              <div className="col-3 col-md-3">
                <div className="logo-wrapper">
                  <a href="/">
                    <img src={process.env.PUBLIC_URL + '/logo-site.png'} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-9 col-md-9">
                <div className="gm-box">
                  <div className="gmb-contact">
                    <p>Call Now: <a href="tel:8883875000">888.387.8888</a></p>
                  </div>
                  <div className="dfoody-menu-wrapper">
                    <input id="dfoodyMenu-state" type="checkbox" />
                    <label className="dfoodyMenu-btn" htmlFor="dfoodyMenu-state">
                      <span className="dfoodyMenu-btn-icon" />
                    </label>
                    <ul id="dfoodyMenu" className="sm sm-simple dfoody-menu">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="">Category</Link>
                        <ul>
                          {category && category.map((item) => (
                            <li key={item.id}>
                              <Link to={`/product/${item.id}/category`}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        
                        <Link to="">{user ? user.name :
                          <GoogleLogin
                            clientId="753490656345-0j9c0r7sqr7bjk0ro3t31ub5n3i1bm3h.apps.googleusercontent.com"
                            buttonText="Sign In"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            className="button-google-account"
                          />}
                        </Link>
                        

                        {user ?
                          <ul>
                            <li>
                              <Link to="/account/profile">Profile</Link>
                            </li>
                            <li>
                              <Link to="/account/checkorder">Check order</Link>
                            </li>
                            <li>
                              <GoogleLogout
                                clientId="753490656345-0j9c0r7sqr7bjk0ro3t31ub5n3i1bm3h.apps.googleusercontent.com"
                                buttonText="Sign Out"
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
                  <div className="mt-icons">
                    <ul className="mti-list">
                      <li>
                        <Link to="/cart">
                          <span id="cart">
                            <i class="fas fa-shopping-cart"></i>
                            <span className="badge">{itemCount}</span>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <span style={{ fontSize : "11px", fontWeight : "500", marginLeft : "2px" }}>Total : {formatNumber(total)}</span>
                      </li>
                    </ul>
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
