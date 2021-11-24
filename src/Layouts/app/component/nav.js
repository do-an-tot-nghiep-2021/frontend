import { Link } from "react-router-dom";
import { formatNumber } from "../../../Helpers/utils";
import { useCart } from '../../../hooks/useCart';
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
import { logout } from "../../../Api/account";
import { useHistory } from "react-router";
import { allcategory } from "../../../Api/category";
import { useState, useEffect } from "react";


const NavApp = ({user, token}) => {
  const [category, setSetCategory] = useState([]);
  const { itemCount, total } = useCart();
  const history = useHistory();

  useEffect(() => {
    const getCategory = async () => {
    try {
        const { data } = await allcategory();
        console.log(data);
        setSetCategory(data);
    } catch (error) {
        console.log(error);
      }
    };
    getCategory();
}, []);

  const logoutToken = async () => {
    try {
        const tokenLogout = {
            token: token
        }
        TokenAccount.removeToken()
        SetUser.removeUser()
        await logout(tokenLogout)
        history.push("/login/account")
    } catch (error) {
        console.log(error)
    }
        
}
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
                              { category && category.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/product/${item.id}/category`}>{item.name}</Link>
                                </li>
                              ))}
                          </ul>
                      </li>
                      <li>
                          <Link to="">{user ? user.name : "Chào, Khách!"}</Link>
                          
                            {user ?
                              <ul>
                                <li>
                                  <Link onClick={logoutToken}>Profile</Link>
                                </li>
                                <li>
                                  <Link to="/checkorder">Check order</Link>
                                </li>
                                <li>
                                  <Link onClick={logoutToken}>Đăng xuất</Link>
                                </li>
                              </ul>
                             :
                              <ul>
                                <li>
                                  <Link to="/login/account">Đăng nhập</Link>
                                </li>
                                <li>
                                  <Link to="/register/account">Đăng ký</Link>
                                </li>
                              </ul>
                            }
                      </li>
                      
                      
                    </ul>
                  </div>
                  <div className="mt-icons">
                    <ul className="mti-list">
                      <li>
                        <Link to="/cart">
                          <span id="cart">
                          {/* <i className="flaticon-shopping-cart" /> */}
                          <i class="fas fa-shopping-cart"></i>
                          <span className="badge">{itemCount}</span>
                          </span>
                          </Link>
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
